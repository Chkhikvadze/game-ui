import { useState, useEffect } from 'react'
import { Command } from 'cmdk'

import { CommandInput, CommandItem, CommandList } from './CommandMenuStyles'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import useSpotlight from 'modals/SpotlightModal/useSpotlight'

const defaultData = (path_id?: any) => {
  return [
    {
      id: uuidv4(),
      name: 'Home',
      url: '/',
      option: 'link',
      search_index: ['home'],
    },
    {
      id: uuidv4(),
      name: 'Games list',
      url: '/game',
      option: 'link',
      search_index: ['Game', 'games', 'go', 'to'],
    },
    {
      id: uuidv4(),
      name: 'Teams list',
      url: '/teams',
      option: 'link',
      search_index: ['Game', 'games', 'go', 'to'],
    },
    {
      id: uuidv4(),
      name: 'Developers',
      url: '/developers',
      option: 'link',
      search_index: ['developers'],
    },
    {
      id: uuidv4(),
      name: 'API Keys',
      url: '/developers/api-keys',
      option: 'link',
      search_index: ['developers', 'api', 'keys'],
    },
    {
      id: uuidv4(),
      name: 'Logs',
      url: '/developers/logs',
      option: 'link',
      search_index: ['developers', 'logs'],
    },
    {
      id: uuidv4(),
      name: 'Webhook',
      url: '/developers/webhook',
      option: 'link',
      search_index: ['developers', 'logs'],
    },
    {
      id: uuidv4(),
      name: 'Docs',
      url: 'https://docs.l3vels.xyz/docs',
      option: 'separate-link',
      search_index: ['developers', 'logs'],
    },
    {
      id: uuidv4(),
      name: 'Create game',
      modal_name: 'create-game-modal',
      modal_title: 'Create game',
      url: '',
      option: 'open-modal',
      search_index: ['create', 'game'],
    },
    {
      id: uuidv4(),
      name: 'Create game AI',
      modal_name: 'chatgpt-modal',
      modal_title: 'Create game AI',
      url: '',
      option: 'open-modal',
      search_index: ['create', 'game', 'ai'],
    },
    {
      id: uuidv4(),
      name: 'Create collection',
      url: '',
      modal_name: 'create-collection-modal',
      modal_title: 'Create collection',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'collection'],
    },
    {
      id: uuidv4(),
      name: 'Create contract',
      url: '',
      modal_name: 'create-contract-modal',
      modal_title: 'Create contract',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'contract'],
    },
    // tested
    {
      id: uuidv4(),
      name: 'Create asset',
      url: '',
      modal_name: 'create-asset-modal',
      modal_title: 'Create asset',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'asset'],
    },
    {
      id: uuidv4(),
      name: 'Create property',
      url: '',
      modal_name: 'create-property-modal',
      modal_title: 'Create asset',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'asset'],
    },
    {
      id: uuidv4(),
      name: 'Asset list',
      url: '/game',
      option: 'link',
      search_index: ['Game', 'games', 'go', 'to'],
    },
    {
      id: uuidv4(),
      name: 'Players list',
      url: '/game',
      option: 'link',
      search_index: ['Game', 'games', 'go', 'to'],
    },

    {
      id: uuidv4(),
      name: 'Contract list',
      url: 'create',
      option: 'link',
      search_index: ['contract'],
    },

    { id: uuidv4(), name: 'API doc', url: 'create', option: 'link', search_index: ['API doc'] },
    {
      id: uuidv4(),
      name: 'Change Password',
      url: '/change-password',
      option: 'modal',
      search_index: ['API doc'],
    },
    {
      id: uuidv4(),
      name: 'Profile',
      url: '/account',
      option: 'modal',
      search_index: ['API doc'],
    },
    {
      id: uuidv4(),
      name: 'Logout',
      url: 'create',
      option: 'modal',
      search_index: ['API doc'],
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

  return (
    <Command
      onKeyDown={e => {
        // Escape goes to previous page
        // Backspace goes to previous page when search is empty
        if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
          e.preventDefault()
          setPages((pages: any) => pages.slice(0, -1))
        }
      }}
    >
      {/* <TextField /> */}
      <CommandInput
        value={search}
        onValueChange={setSearch}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <CommandList>
        {!page && (
          <>
            {defaultData(path_id).map(item => (
              <CommandItem key={item.id} onSelect={() => onHandleSelect(item)}>
                {item.name}
              </CommandItem>
            ))}
            {/* <CommandItem onSelect={() => setPages([...pages, 'teams'])}>Join a team…</CommandItem>
            <CommandItem onSelect={() => setPages([...pages, 'projects'])}>
              Join a projects
            </CommandItem> */}
          </>
        )}

        {page === 'games' && (
          <>
            {game_data?.map((game: any) => (
              <CommandItem key={game.id} onSelect={() => onCreateOptionBasedOnGame(game.id)}>
                {game.name}
              </CommandItem>
            ))}
          </>
        )}

        {/* {page === 'games' &&
          (console.log('test'),
          (
            <>
              {game_data?.map((game: any) => {
                console.log(game, 'game')
                return (
                  <CommandItem key={game.id} onSelect={() => console.log(page, 'page')}>
                    {game.name}
                  </CommandItem>
                )
              })}
            </>
          ))} */}
      </CommandList>
    </Command>
  )
}

export default CommandMenu
