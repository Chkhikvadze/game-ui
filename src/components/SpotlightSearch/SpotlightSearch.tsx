import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import Search from '@l3-lib/ui-core/dist/Search'

const routes_data = (path_id?: any) => {
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

const ItemCard = ({ filterItems, onHandleClickGetGames, games_data, path_id }: any) => {
  const { openModal, closeModal } = useModal()
  const navigate = useNavigate()

  const [modal_options, set_modal_options] = useState({ modal_name: '', modal_title: '' })

  const onCreateCollection = (game_id: any, modal_name: any) => {
    openModal({ name: modal_name, data: { game_id } })
  }

  const onHandleClickShowGames = async (modal_name: string, modal_title: string) => {
    set_modal_options({ modal_name, modal_title })
    await onHandleClickGetGames()
  }

  const onHandleClickLink = async (url: string) => {
    await navigate(url)
    closeModal('spotlight-modal')
  }

  return (
    // <StyledItemCardContainer className='item_card_container'>
    //   {games_data ? (
    //     <>
    //       <StyledTypographyP style={{ fontSize: 22 }}>
    //         {modal_options.modal_title}
    //       </StyledTypographyP>
    //       {games_data?.length > 0 &&
    //         games_data.map((game_item: any) => (
    //           <StyledTypographyP
    //             onClick={() => onCreateCollection(game_item.id, modal_options.modal_name)}
    //             key={game_item.id}
    //           >
    //             {`${game_item.name}`}
    //           </StyledTypographyP>
    //         ))}
    //     </>
    //   ) : (
    //     <>
    //       {filterItems?.map((item: any) => {
    //         return item.option === 'open-modal' ? (
    //           <StyledTypographyP
    //             key={item.id}
    //             onClick={() => openModal({ name: item.modal_name, data: { game_id: path_id } })}
    //           >
    //             {item.name}
    //           </StyledTypographyP>
    //         ) : item.option === 'show-games' ? (
    //           <>
    //             <StyledTypographyP
    //               key={item.id}
    //               onClick={() => onHandleClickShowGames(item.modal_name, item.modal_title)}
    //             >
    //               {item.name}
    //             </StyledTypographyP>
    //           </>
    //         ) : item.option === 'separate-link' ? (
    //           <>
    //             <StyledTypographyP key={item.id} onClick={() => window.open(item.url)}>
    //               Go to {item.name}
    //             </StyledTypographyP>
    //           </>
    //         ) : (
    //           <StyledTypographyP key={item.id} onClick={() => onHandleClickLink(item.url)}>
    //             Go to {item.name}
    //           </StyledTypographyP>
    //         )
    //       })}
    //     </>
    //   )}
    // </StyledItemCardContainer>
    <>
      {games_data ? (
        <>
          <StyledTypographyP>{modal_options.modal_title}</StyledTypographyP>
          <Menu>
            {games_data?.length > 0 &&
              games_data.map((game_item: any) => (
                <MenuItem
                  onClick={() => onCreateCollection(game_item.id, modal_options.modal_name)}
                  key={game_item.id}
                  title={game_item.name}
                />
              ))}
          </Menu>
        </>
      ) : (
        <Menu>
          {filterItems?.map((item: any) => {
            return item.option === 'open-modal' ? (
              <MenuItem
                key={item.id}
                onClick={() => openModal({ name: item.modal_name, data: { game_id: path_id } })}
                title={item.name}
              />
            ) : item.option === 'show-games' ? (
              <MenuItem
                key={item.id}
                onClick={() => onHandleClickShowGames(item.modal_name, item.modal_title)}
                title={item.name}
              />
            ) : item.option === 'separate-link' ? (
              <MenuItem key={item.id} onClick={() => window.open(item.url)} title={item.name} />
            ) : (
              <MenuItem
                key={item.id}
                onClick={() => onHandleClickLink(item.url)}
                title={item.name}
              />
            )
          })}
        </Menu>
      )}
    </>
  )
}

const SpotlightSearch = ({ onHandleClickGetGames, games_data }: any) => {
  const [search_value, set_search_value] = useState('')
  const [data, set_data] = useState(routes_data)

  const [game_list, set_game_list] = useState([])

  useEffect(() => {
    set_game_list(games_data)
  }, [games_data])

  const location = useLocation()

  const path_id = location.pathname.split('/')[2]

  useEffect(() => {
    const data = routes_data(path_id)
    set_data(data)
  }, [])

  const onHandleChange = (e: any) => {
    const inputValue = e.target.value
    set_search_value(inputValue)
  }

  const filterItems = data.filter((item: any) => {
    return (
      item.name.toLowerCase().includes(search_value.toLowerCase()) ||
      item.url.toLowerCase().includes(search_value.toLowerCase()) ||
      item.search_index.includes(search_value.toLowerCase())
    )
  })
  const filteredGameList = game_list?.filter((item: any) => {
    return item.name.toLowerCase().includes(search_value.toLowerCase())
  })

  return (
    <div>
      <Search defaultIsOpen type='text' placeholder='Spotlight' onChange={onHandleChange} />

      <ItemCard
        filterItems={filterItems}
        onHandleClickGetGames={onHandleClickGetGames}
        games_data={filteredGameList}
        path_id={path_id}
      />
    </div>
  )
}

export default SpotlightSearch

const StyledTypography = styled(Link)`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  text-decoration: none;
`
const StyledTypographyP = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  text-decoration: none;
`

const StyledItemCardContainer = styled.div`
  margin-top: 49px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const StyledGameWrapper = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  all: unset;
  padding: 5px;
  cursor: pointer;
  :hover {
    color: #fff;
  }
`
