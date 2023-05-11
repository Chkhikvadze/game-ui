import { useState, useEffect } from 'react'
import { Command } from 'cmdk'

import {
  CommandInput,
  CommandItem,
  CommandItemName,
  CommandList,
  CommandWrapper,
  StyledCommandItemHeader,
  StyledSvgContainer,
  StyleEnterGroup,
} from './CommandMenuStyles'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import useSpotlight from 'modals/SpotlightModal/useSpotlight'

import _ from 'lodash'
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
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },
    {
      id: uuidv4(),
      name: 'Teams',
      url: '/teams',
      option: 'link',
      group_name: ['go_to', 'ai'],
      icon: <Teams />,
    },
    {
      id: uuidv4(),
      name: 'Developers',
      url: '/developers',
      option: 'link',
      group_name: ['go_to', 'ai'],
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
      name: 'Create game',
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
      modal_name: 'chatgpt-modal',
      modal_title: 'Create game',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Create Collection',
      modal_name: 'chatgpt-modal',
      modal_title: 'Create collection',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Create Asset',
      modal_name: 'chatgpt-modal',
      modal_title: 'Create asset',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    {
      id: uuidv4(),
      name: 'Create Contract',
      modal_name: 'chatgpt-modal',
      modal_title: 'Create contract',
      url: '',
      option: 'open-modal',
      group_name: ['go_to', 'ai'],
      icon: <Games />,
    },

    // {
    //   id: uuidv4(),
    //   name: 'Create game AI',
    //   modal_name: 'chatgpt-modal',
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
      option: !path_id ? 'show-games' : 'open-modal',
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
      name: 'Asset',
      url: '/game',
      option: 'link',
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

const CommandMenu = () => {
  const { openModal, closeModal } = useModal()
  // const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<any>([])

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

  const path_id = location.pathname.split('/')[2]

  const onHandleSelect = async (item: any) => {
    if (item.option === 'open-modal')
      return openModal({ name: item.modal_name, data: { game_id: path_id } })
    if (item.option === 'show-games') {
      setSearch('')
      await onHandleClickGetGames()
      set_modal_options({ modal_name: item.modal_name, modal_title: item.modal_title })
      setPages((prevPage: any) => [...prevPage, 'games'])
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

  const onCreateOptionBasedOnGame = (game_id: any) => {
    openModal({ name: modal_options.modal_name, data: { game_id } })
  }

  const groupedItems = _.groupBy(defaultData(path_id), data => {
    return _.get(data, 'group_name', 'other_data')
  })

  return (
    <CommandWrapper
      onKeyDown={e => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
          e.preventDefault()
          setPages((pages: any) => pages.slice(0, -1))
        }
        if (pages.length === 0 && e.key === 'Escape') {
          closeModal('spotlight-modal')
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
            {_.has(groupedItems, 'go_to') && (
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
                    {_.slice(groupedItems.go_to, 1, 6)?.map(item => (
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

            {_.has(groupedItems, 'create') && (
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
                    {_.slice(groupedItems.create, 1, 6)?.map(item => (
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

            {_.has(groupedItems, 'go_to,ai') && (
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
                    {_.slice(groupedItems?.['go_to,ai'], 1, 6)?.map(item => (
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
              <CommandItem key={game.id} onSelect={() => onCreateOptionBasedOnGame(game.id)}>
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
      </CommandList>
    </CommandWrapper>
  )
}

export default CommandMenu
