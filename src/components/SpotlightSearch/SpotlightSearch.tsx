import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

const routes_data = (path_id?: any) => {
  return [
    {
      id: uuidv4(),
      name: 'Create Game',
      modal_name: 'create-game-modal',
      url: '',
      option: 'open-modal',
      search_index: ['create', 'game'],
    },
    {
      id: uuidv4(),
      name: 'Create Collection',
      url: '',
      modal_name: 'create-collection-modal',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'collection'],
    },
    {
      id: uuidv4(),
      name: 'Create Contract',
      url: '',
      modal_name: 'create-contract-modal',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'contract'],
    },
    {
      id: uuidv4(),
      name: 'Create Asset',
      url: '',
      modal_name: 'create-asset-modal',
      option: !path_id ? 'show-games' : 'open-modal',
      search_index: ['create', 'asset'],
    },
    {
      id: uuidv4(),
      name: 'Games',
      url: '/game',
      option: 'link',
      search_index: ['Game', 'games'],
    },
    {
      id: uuidv4(),
      name: 'Contract',
      url: 'create',
      option: 'link',
      search_index: ['contract'],
    },
    {
      id: uuidv4(),
      name: 'Developers',
      url: 'developers',
      option: 'link',
      search_index: ['developers'],
    },
    { id: uuidv4(), name: 'API doc', url: 'create', option: 'modal', search_index: ['API doc'] },
  ]
}

const ItemCard = ({ filterItems, onHandleClickGetGames, games_data, path_id }: any) => {
  const { openModal, closeModal } = useModal()

  const [modal_name, set_modal_name] = useState('')

  const onCreateCollection = (game_id: any, modal_name: any) => {
    openModal({ name: modal_name, data: { game_id } })
  }

  const onHandleClickShowGames = async (modal_name: any) => {
    set_modal_name(modal_name)
    await onHandleClickGetGames()
  }

  return (
    <StyledItemCardContainer className='item_card_container'>
      {games_data ? (
        <>
          {games_data?.length > 0 &&
            games_data.map((game_item: any) => (
              <StyledGameWrapper
                onClick={() => onCreateCollection(game_item.id, modal_name)}
                key={game_item.id}
              >{`Game name: ${game_item.name}`}</StyledGameWrapper>
            ))}
        </>
      ) : (
        <>
          {filterItems?.map((item: any) => {
            return item.option === 'open-modal' ? (
              <StyledTypographyP
                key={item.id}
                onClick={() => openModal({ name: item.modal_name, data: { game_id: path_id } })}
              >
                {item.name}
              </StyledTypographyP>
            ) : item.option === 'show-games' ? (
              <>
                <StyledTypographyP
                  key={item.id}
                  onClick={() => onHandleClickShowGames(item.modal_name)}
                >
                  {item.name}
                </StyledTypographyP>
              </>
            ) : (
              <StyledTypography key={item.id} to={item.url}>
                {item.name}
              </StyledTypography>
            )
          })}
        </>
      )}
    </StyledItemCardContainer>
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
      <input type='text' placeholder='Spotlight' onChange={onHandleChange} />

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
