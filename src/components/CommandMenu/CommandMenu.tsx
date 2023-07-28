import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

import { Command } from 'cmdk'
import { get, groupBy, has, slice } from 'lodash'

import useSpotlight from 'modals/SpotlightModal/useSpotlight'

import StarVector from 'assets/svgComponents/StarVector'
import StarsVector from 'assets/svgComponents/StartsVector'
import { enterIcon } from 'assets/icons'

import Typography from '@l3-lib/ui-core/dist/Typography'

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
  StyledCommandInput,
  StyledCommandItem,
  StyledCommandList,
  StyledCommandWrapper,
  StyledCommandDialog,
  StyledCommandItemHeader,
  StyledSvgContainer,
  StyleEnterGroup,
} from './CommandMenuStyles'
import { ApiVersionEnum } from 'modals/AIChatModal/types'
import useAssetHook from 'hooks/useAssetHook'
import useCollectionsHook from 'hooks/useCollectionsHook'
import { defaultData } from './defaultData'
import { useGamesService } from 'services'
import CommandItemName from './components/ItemName'
import styled from 'styled-components'
import CommandItem from './components/CommandItem'

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

  const { onHandleClickGetGames, data, gamesForChat, collectionsForChat } = useSpotlight()

  const { items }: any = data

  const [game_data, set_game_data] = useState(items)

  useEffect(() => {
    set_game_data(items)
  }, [items])

  const filter_routes = 'developers'

  const path_id = location.pathname.includes(filter_routes) ? '' : location.pathname.split('/')[2]

  const onHandleSelect = async (item: any) => {
    if (item.option === 'open-chat') {
      await navigate(item.url)
      // closeModal('spotlight-modal')
      setCmdkOpen(false)
    }
    if (item.option === 'open-modal') {
      openModal({ name: item.modal_name, data: { game_id: path_id, ...item.modalData } })
      setCmdkOpen(false)
    }

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
      // closeModal('spotlight-modal')
      setCmdkOpen(false)
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
      <StyledCommandWrapper
        className='cmdk_wrapper'
        onKeyDown={e => {
          // Escape goes to previous page
          // Backspace goes to previous page when search is empty
          if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
            e.preventDefault()
            setPages((pages: any) => pages.slice(0, -1))
          }
          if (pages.length === 0 && e.key === 'Escape') {
            setCmdkOpen(false)
          }
        }}
        filter={(value, search) => {
          if (value.includes(search)) return 1
          return 0
        }}
      >
        {/* <TextField /> */}
        <StyledCommandInput
          value={search}
          onValueChange={setSearch}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          placeholder='Search, create or ask anything'
        />
        <StyledCommandList>
          {!page && (
            <>
              {has(groupedItems, 'go_to') && (
                <Command.Group>
                  {/* <StyledCommandItemHeader>
                    <StyledSvgContainer type='go_to'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Go To</h2>
                  </StyledCommandItemHeader> */}
                  {search ? (
                    <>
                      {groupedItems?.go_to.map((item, index) => (
                        <div key={item.id}>
                          <CommandItem
                            key={item.id}
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Go To'}
                            itemIcon={item.icon}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.go_to, 1, 6)?.map((item, index) => (
                        <div key={item.id}>
                          <CommandItem
                            key={item.id}
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Go To'}
                            itemIcon={item.icon}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'create') && (
                <Command.Group>
                  {/* <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='create'>
                      <StarVector />
                    </StyledSvgContainer>
                    <h2>Create</h2>
                  </StyledCommandItemHeader> */}
                  {search ? (
                    <>
                      {groupedItems?.create.map((item, index) => (
                        <div key={item.id}>
                          <CommandItem
                            key={item.id}
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Create'}
                            itemIcon={item.icon}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems.create, 1, 6)?.map((item, index) => (
                        <div key={item.id}>
                          <CommandItem
                            key={item.id}
                            index={index}
                            name={item.name}
                            handleSelect={() => onHandleSelect(item)}
                            groupName={'Create'}
                            itemIcon={item.icon}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </Command.Group>
              )}

              {has(groupedItems, 'copilot') && (
                <Command.Group>
                  {/* <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='ai'>
                      <StarsVector />
                    </StyledSvgContainer>
                    <h2>Copilot</h2>
                  </StyledCommandItemHeader> */}

                  <>
                    {groupedItems?.['copilot'].map((item, index) => (
                      <div key={item.id}>
                        <CommandItem
                          key={index}
                          index={index}
                          name={item.name}
                          handleSelect={() => onHandleSelect(item)}
                          groupName={'Copilot'}
                          itemIcon={item.icon}
                        />
                      </div>
                    ))}
                    {gamesForChat?.map((game: any, index: number) => (
                      <div key={game.id}>
                        <CommandItem
                          key={game.id}
                          index={index}
                          name={game.name}
                          subTitle={'Game'}
                          handleSelect={() => {
                            setCmdkOpen(false)
                            navigate(`/copilot?game=${game.id}`)
                          }}
                          groupName={'Copilot'}
                          itemIcon={<Games />}
                        />
                      </div>
                    ))}
                    {collectionsForChat?.map((collection: any, index: number) => (
                      <div key={collection.id}>
                        <CommandItem
                          key={collection.id}
                          index={index}
                          name={collection.name}
                          subTitle={'Collection'}
                          handleSelect={() => {
                            setCmdkOpen(false)
                            navigate(
                              `/copilot?game=${collection.game_id}&collection=${collection.id}`,
                            )
                          }}
                          groupName={'Copilot'}
                          itemIcon={<Collection />}
                        />
                      </div>
                    ))}
                  </>
                </Command.Group>
              )}

              {/* {has(groupedItems, 'go_to,ai') && (
                <Command.Group>
                  <StyledCommandItemHeader marginTop={32}>
                    <StyledSvgContainer type='ai'>
                      <StarsVector />
                    </StyledSvgContainer>
                    <h2>AI Generate</h2>
                  </StyledCommandItemHeader>
                  {search ? (
                    <>
                      {groupedItems?.['go_to,ai'].map((item, index) => (
                        <>
                          <StyledCommandItem
                            key={item.id + item.modal_name}
                            onSelect={() => onHandleSelect(item)}
                            value={`ai ${item.name}`}
                          >
                            <CommandItemName index={index}>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </StyledCommandItem>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      {slice(groupedItems?.['go_to,ai'], 1, 6)?.map((item, index) => (
                        <>
                          <StyledCommandItem
                            key={`'ai' + ${item.id}`}
                            onSelect={() => onHandleSelect(item)}
                          >
                            <CommandItemName index={index}>
                              {item.icon ? item.icon : <API />}
                              {item.name}
                            </CommandItemName>
                            <StyleEnterGroup>
                              <span>Enter</span>
                              <img src={enterIcon} alt='click enter' />
                            </StyleEnterGroup>
                          </StyledCommandItem>
                        </>
                      ))}
                    </>
                  )}
                </Command.Group>
              )} */}
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

              {game_data?.map((game: any, index: number) => (
                <CommandItem
                  key={game.id}
                  index={index}
                  name={game.name}
                  itemIcon={<Players />}
                  handleSelect={() => navigate(`/game/${game.id}`)}
                  groupName={'Go To'}
                />
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
              {collections?.map((collection: any, index: number) => (
                <StyledCommandItem
                  key={collection.id}
                  onSelect={() => {
                    navigate(`/game/${collection.game_id}/collection/${collection.id}`)
                    // onCreateOptionBasedOnCollection(collection)
                    // closeModal('spotlight-modal')
                  }}
                >
                  <CommandItemName index={index}>
                    <Players />
                    {collection.name}
                  </CommandItemName>
                  <StyleEnterGroup>
                    <span>Enter</span>
                    <img src={enterIcon} alt='click enter' />
                  </StyleEnterGroup>
                </StyledCommandItem>
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
              {assets?.map((asset: any, index: number) => (
                <StyledCommandItem
                  key={asset.id}
                  onSelect={() => {
                    navigate(`collection/${asset.collection_id}/assets`)
                    setCmdkOpen(false)
                  }}
                  value={asset.id}
                >
                  <CommandItemName index={index}>
                    <Players />
                    {asset.name}
                  </CommandItemName>
                  <StyleEnterGroup>
                    <span>Enter</span>
                    <img src={enterIcon} alt='click enter' />
                  </StyleEnterGroup>
                </StyledCommandItem>
              ))}
              <button onClick={() => setLimit(prevValue => prevValue + 10)}>Show more</button>
            </Command.Group>
          )}
        </StyledCommandList>
      </StyledCommandWrapper>
    </StyledCommandDialog>
  )
}

export default CommandMenu
