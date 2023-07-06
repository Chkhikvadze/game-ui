import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

import { Command } from 'cmdk'
import { get, groupBy, has, slice } from 'lodash'

import useSpotlight from 'modals/SpotlightModal/useSpotlight'

import StarVector from 'assets/svgComponents/StarVector'
import StarsVector from 'assets/svgComponents/StartsVector'
import { enterIcon } from 'assets/icons'

import About from '@l3-lib/ui-core/dist/icons/About'
import API from '@l3-lib/ui-core/dist/icons/API'
import Doc from '@l3-lib/ui-core/dist/icons/Doc'
import Games from '@l3-lib/ui-core/dist/icons/Games'
import Teams from '@l3-lib/ui-core/dist/icons/Teams'
import Players from '@l3-lib/ui-core/dist/icons/Players'
import Contracts from '@l3-lib/ui-core/dist/icons/Contracts'
import Collection from '@l3-lib/ui-core/dist/icons/Collection'
import Logs from '@l3-lib/ui-core/dist/icons/Logs'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'
import HomeIconSvg from 'assets/svgComponents/HomeIconSvg'

import {
  CommandInput,
  CommandItem,
  CommandItemName,
  CommandList,
  CommandWrapper,
  StyledCommandDialog,
  StyledCommandItemHeader,
  StyledSvgContainer,
  StyleEnterGroup,
} from './CommandMenuStyles'
import { ApiVersionEnum } from 'modals/AIChatModal/types'
import useAssetHook from 'hooks/useAssetHook'
import useCollectionsHook from 'hooks/useCollectionsHook'

const defaultData = (path_id?: any) => {
  return [
    {
      id: uuidv4(),
      name: 'Home',
      url: '/',
      option: 'link',
      group_name: 'go_to',
      icon: <HomeIconSvg />,
    },
    {
      id: uuidv4(),
      name: 'Games',
      url: '/game',
      option: 'link',
      group_name: ['go_to'],
      icon: <Games />,
    },
    {
      id: uuidv4(),
      name: 'Teams',
      url: '/teams',
      option: 'link',
      group_name: ['go_to'],
      icon: <Teams />,
    },
    {
      id: uuidv4(),
      name: 'Developers',
      url: '/developers',
      option: 'link',
      group_name: ['go_to'],
      icon: <Players />,
    },
    {
      id: uuidv4(),
      name: 'API Keys',
      url: '/developers/api-keys',
      option: 'link',
      group_name: 'go_to',
      icon: <API />,
    },
    {
      id: uuidv4(),
      name: 'Logs',
      url: '/developers/logs',
      option: 'link',
      group_name: 'go_to',
      icon: <Logs />,
    },
    {
      id: uuidv4(),
      name: 'Webhook',
      url: '/developers/webhook',
      option: 'link',
      group_name: 'go_to',
      icon: <TagsOutline />,
    },
    {
      id: uuidv4(),
      name: 'Docs',
      url: 'https://docs.l3vels.xyz/docs',
      option: 'separate-link',
      group_name: 'go_to',
      icon: <Doc />,
    },
    {
      id: uuidv4(),
      name: 'Create Game',
      modal_name: 'create-game-modal',
      modal_title: 'Create game',
      url: '',
      option: 'open-modal',
      group_name: 'create',
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Create Game',
      modal_name: 'ai-chat-modal',
      modal_title: 'Create game',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Generate Media',
      modal_name: 'ai-chat-modal',
      modal_title: 'Generate media',
      modalData: {
        apiVersion: ApiVersionEnum.MediaV1,
      },
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Generate Report',
      modal_name: 'ai-chat-modal',
      modal_title: 'Generate report',
      modalData: {
        apiVersion: ApiVersionEnum.ReportV1,
      },
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Generate Collection',
      modal_name: 'ai-chat-modal',
      modal_title: 'Generate collection',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Generate Asset',
      modal_name: 'ai-chat-modal',
      modal_title: 'Generate asset',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Generate Contract',
      modal_name: 'ai-chat-modal',
      modal_title: 'Generate contract',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    // {
    //   id: uuidv4(),
    //   name: 'Create game AI',
    //   modal_name: 'ai-chat-modal',
    //   modal_title: 'Create game AI',
    //   url: '',
    //   option: 'open-modal',
    //   search_index: ['create', 'game', 'ai'],
    // },
    {
      id: uuidv4(),
      name: 'Create collection',
      url: '',
      modal_name: 'create-collection-modal',
      modal_title: 'Create collection',
      option: !path_id ? 'show-games' : 'open-modal',
      group_name: 'create',
      icon: <Collection />,
    },
    {
      id: uuidv4(),
      name: 'Create contract',
      url: '',
      modal_name: 'create-contract-modal',
      modal_title: 'Create contract',
      option: !path_id ? 'show-games' : 'open-modal',
      group_name: 'create',
      icon: <Contracts />,
    },
    // tested
    {
      id: uuidv4(),
      name: 'Create asset',
      url: '',
      modal_name: 'create-asset-modal',
      modal_title: 'Create asset',
      option: 'show-collections',
      group_name: 'create',
      icon: <Collection />,
    },
    {
      id: uuidv4(),
      name: 'Create property',
      url: '',
      modal_name: 'create-property-modal',
      modal_title: 'Create asset',
      option: !path_id ? 'show-games' : 'open-modal',
      group_name: 'create',
      icon: <Contracts />,
    },
    {
      id: uuidv4(),
      name: 'Assets',
      url: '/game',
      option: 'show-assets',
      group_name: 'go_to',
      icon: <Contracts />,
    },
    {
      id: uuidv4(),
      name: 'Collections',
      url: '/collections',
      option: 'show-collections',
      group_name: 'go_to',
      icon: <Contracts />,
    },
    {
      id: uuidv4(),
      name: 'Players list',
      url: '/game',
      option: 'link',
      group_name: 'go_to',
      icon: <Players />,
    },

    {
      id: uuidv4(),
      name: 'Contract list',
      url: 'create',
      option: 'link',
      group_name: 'go_to',
      icon: <Contracts />,
    },

    {
      id: uuidv4(),
      name: 'Change Password',
      url: '/change-password',
      option: 'modal',
      group_name: 'go_to',
      icon: <Players />,
    },
    {
      id: uuidv4(),
      name: 'Profile',
      url: '/account',
      option: 'modal',
      group_name: 'go_to',
      icon: <About />,
    },
    {
      id: uuidv4(),
      name: 'Logout',
      url: 'create',
      option: 'modal',
      group_name: 'go_to',
      icon: <About />,
    },
  ]
}

const CommandMenu = ({ open, setCmdkOpen }: any) => {
  const { openModal, closeModal } = useModal()
  const componentRef = useRef<HTMLDivElement>(null)

  // const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<any>([])
  const [game_id, set_game_id] = useState<string>('')

  const { assets, setLimit } = useAssetHook()
  const { collections } = useCollectionsHook()

  const [modal_options, set_modal_options] = useState({ modal_name: '', modal_title: '' })

  const page = pages[pages.length - 1]
  const location = useLocation()
  const navigate = useNavigate()

  const { onHandleClickGetGames, data } = useSpotlight()

  const { items } = data

  const [game_data, set_game_data] = useState(items)

  useEffect(() => {
    set_game_data(items)
  }, [items])

  const filter_routes = 'developers'

  const path_id = location.pathname.includes(filter_routes) ? '' : location.pathname.split('/')[2]

  const onHandleSelect = async (item: any) => {
    if (item.option === 'open-modal')
      return openModal({ name: item.modal_name, data: { game_id: path_id, ...item.modalData } })
    if (item.option === 'show-games') {
      setSearch('')
      await onHandleClickGetGames()
      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'games'])
      return
    }
    if (item.option === 'show-assets') {
      setSearch('')
      await onHandleClickGetGames()
      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'assets'])
      return
    }
    if (item.option === 'show-collections') {
      setSearch('')
      await onHandleClickGetGames()
      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'collections'])
      return
    }
    if (item.option === 'separate-link') {
      window.open(item.url)
      return
    } else {
      await navigate(item.url)
      closeModal('spotlight-modal')
    }
    // return openModal({ name: item.modal_name, data: { game_id: path_id } })
  }

  const onCreateOptionBasedOnOption = (game_id: any) => {
    openModal({ name: modal_options.modal_name, data: { game_id } })
    set_game_id(game_id)
  }

  const onCreateOptionBasedOnCollection = (collection_data: any) => {
    const { id } = collection_data
    openModal({ name: 'create-asset-modal', data: { collection_id: id } })
    navigate(`/collection/${id}/assets`)
    // closeModal('spotlight-modal')
    setCmdkOpen(false)
  }

  useEffect(() => {
    // Function to handle outside click
    const handleClickOutside = (event: any) => {
      if (componentRef.current) {
        setCmdkOpen(false)
        //       // Clicked outside the component
        console.log('Clicked outside the component')
        //     }
      }
    }

    // Add event listener to document on component mount
    document.addEventListener('click', handleClickOutside)

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
  //       // Clicked outside the component
  //       console.log('Clicked outside the component')
  //     }
  //   }

  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'Escape') {
  //       // Pressed the Escape key
  //       console.log('Pressed the Escape key')
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside)
  //   document.addEventListener('keydown', handleKeyDown)

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside)
  //     document.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])

  const groupedItems = groupBy(defaultData(path_id), data => {
    return get(data, 'group_name', 'other_data')
  })

  return (
    <StyledCommandDialog open={open} className='cmdk_root' ref={componentRef}>
      <CommandWrapper
        className='cmdk_wrapper'
        onKeyDown={e => {
          // Escape goes to previous page
          // Backspace goes to previous page when search is empty
          if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
            e.preventDefault()
            setPages((pages: any) => pages.slice(0, -1))
          }
          if (pages.length === 0 && e.key === 'Escape') {
            // closeModal('spotlight-modal')
            setCmdkOpen(false)
          }
        }}
        filter={(value, search) => {
          if (value.includes(search)) return 1
          return 0
        }}
      >
        {/* <TextField /> */}
        <CommandInput
          value={search}
          onValueChange={setSearch}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder='Search, create or ask anything'
        />
        <CommandList>
          {!page && (
            <>
              {has(groupedItems, 'go_to') && (
                <Command.Group>
                  <StyledCommandItemHeader>
                    <StyledSvgContainer type='go_to'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Go To</h2>
                  </StyledCommandItemHeader>
                  {search ? (
                    <>
                      {groupedItems?.go_to.map(item => (
                        <>
                          <CommandItem
                            key={item.id}
                            onSelect={() => onHandleSelect(item)}
                            value={`go to ${item.name}`}
                          >
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.go_to, 1, 6)?.map(item => (
                        <>
                          <CommandItem key={item.id} onSelect={() => onHandleSelect(item)}>
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'create') && (
                <Command.Group>
                  <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='create'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Create</h2>
                  </StyledCommandItemHeader>
                  {search ? (
                    <>
                      {groupedItems?.create.map(item => (
                        <>
                          <CommandItem
                            key={item.id}
                            onSelect={() => onHandleSelect(item)}
                            value={`create ${item.name}`}
                          >
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.create, 1, 6)?.map(item => (
                        <>
                          <CommandItem key={item.id} onSelect={() => onHandleSelect(item)}>
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'go_to,ai') && (
                <Command.Group>
                  <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='ai'>
                      <StarsVector />
                    </StyledSvgContainer>
                    <h2>AI Generate</h2>
                  </StyledCommandItemHeader>
                  {search ? (
                    <>
                      {groupedItems?.['go_to,ai'].map(item => (
                        <>
                          <CommandItem
                            key={item.id + item.modal_name}
                            onSelect={() => onHandleSelect(item)}
                            value={`ai ${item.name}`}
                          >
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems?.['go_to,ai'], 1, 6)?.map(item => (
                        <>
                          <CommandItem
                            key={`'ai' + ${item.id}`}
                            onSelect={() => onHandleSelect(item)}
                          >
                            <CommandItemName>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </CommandItem>
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}
            </>
          )}
          {page === 'games' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Games</h2>
              </StyledCommandItemHeader>
              {game_data?.map((game: any) => (
                <CommandItem key={game.id} onSelect={() => onCreateOptionBasedOnOption(game.id)}>
                  <CommandItemName>
                    <Players />
                    {game.name}
                  </CommandItemName>
                  <StyleEnterGroup>
                    <span>Enter</span>
                    <img src={enterIcon} alt='click enter' />
                  </StyleEnterGroup>
                </CommandItem>
              ))}
            </Command.Group>
          )}
          {page === 'collections' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Collections</h2>
              </StyledCommandItemHeader>
              {collections?.map((collection: any) => (
                <CommandItem
                  key={collection.id}
                  onSelect={() => {
                    // navigate(`collection/${asset.collection_id}/assets`)
                    onCreateOptionBasedOnCollection(collection)
                    // closeModal('spotlight-modal')
                  }}
                >
                  <CommandItemName>
                    <Players />
                    {collection.name}
                  </CommandItemName>
                  <StyleEnterGroup>
                    <span>Enter</span>
                    <img src={enterIcon} alt='click enter' />
                  </StyleEnterGroup>
                </CommandItem>
              ))}
            </Command.Group>
          )}
          {page === 'assets' && (
            <Command.Group>
              <StyledCommandItemHeader marginTop={32}>
                <StyledSvgContainer type='games'>
                  <Games />
                </StyledSvgContainer>
                <h2>Assets</h2>
              </StyledCommandItemHeader>
              {assets?.map((asset: any) => (
                <CommandItem
                  key={asset.id}
                  onSelect={() => {
                    navigate(`collection/${asset.collection_id}/assets`)
                    closeModal('spotlight-modal')
                  }}
                  value={asset.id}
                >
                  <CommandItemName key={asset.id}>
                    <Players />
                    {asset.name}
                  </CommandItemName>
                  <StyleEnterGroup>
                    <span>Enter</span>
                    <img src={enterIcon} alt='click enter' />
                  </StyleEnterGroup>
                </CommandItem>
              ))}
              <button onClick={() => setLimit(prevValue => prevValue + 10)}>Show more</button>
            </Command.Group>
          )}
        </CommandList>
      </CommandWrapper>
    </StyledCommandDialog>
  )
}

export default CommandMenu
