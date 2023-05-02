import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useModal } from 'hooks'

const routes_data = (route_location?: any) => {
  return [
    { id: uuidv4(), name: 'Create Game', url_name: 'create-game-modal', option: 'modal' },
    { id: uuidv4(), name: 'Create Collection', url_name: 'create', option: 'show-games' },
    { id: uuidv4(), name: 'Create Contract', url_name: 'create', option: 'modal' },
    { id: uuidv4(), name: 'Create Asset', url_name: 'create', option: 'modal' },
    { id: uuidv4(), name: 'Games', url_name: '/game', option: 'link' },
    { id: uuidv4(), name: 'Contract', url_name: 'create', option: 'modal' },
    { id: uuidv4(), name: 'Developers', url_name: 'developers', option: 'modal' },
    { id: uuidv4(), name: 'API doc', url_name: 'create', option: 'modal' },
  ]
}

const ItemCard = ({ item_array, onHandleClickGetGames, games_data }: any) => {
  const { openModal } = useModal()

  const onCreateCollection = (game_id: string) => {
    openModal({ name: 'create-collection-modal', data: { game_id } })
  }

  return (
    <StyledItemCardContainer className='item_card_container'>
      {item_array?.map((item: any) => {
        return item.option === 'modal' ? (
          <StyledTypographyP key={item.id} onClick={() => openModal({ name: item.url_name })}>
            {item.name}
          </StyledTypographyP>
        ) : item.option === 'show-games' ? (
          <>
            <StyledTypographyP key={item.id} onClick={() => onHandleClickGetGames()}>
              {item.name}
            </StyledTypographyP>
            {games_data?.length > 0 &&
              games_data.map((item: any) => (
                <StyledGameWrapper
                  onClick={() => onCreateCollection(item.id)}
                  key={item.id}
                >{`Game name: ${item.name}`}</StyledGameWrapper>
              ))}
          </>
        ) : (
          <StyledTypography key={item.id} to={item.url_name}>
            {item.name}
          </StyledTypography>
        )
      })}
    </StyledItemCardContainer>
  )
}

const SpotlightSearch = ({ onHandleClickGetGames, games_data }: any) => {
  const [search_value, set_search_value] = useState('')

  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    routes_data(pathname)
  }, [location, pathname])

  const [data, set_data] = useState(routes_data)

  const onHandleChange = (e: any) => {
    const inputValue = e.target.value
    set_search_value(inputValue)
  }

  const filterItems = data.filter((item: any) => {
    return (
      item.name.toLowerCase().includes(search_value.toLowerCase()) ||
      item.url_name.toLowerCase().includes(search_value.toLowerCase())
    )
  })

  return (
    <div>
      <input type='text' placeholder='Spotlight' onChange={onHandleChange} />
      <ItemCard
        item_array={filterItems}
        onHandleClickGetGames={onHandleClickGetGames}
        games_data={games_data}
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
