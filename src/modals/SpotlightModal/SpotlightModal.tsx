import withRenderModal from 'hocs/withRenderModal'

import FullScreenModal from 'components/FullScreenModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import Search from '@l3-lib/ui-core/dist/Search'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import styled from 'styled-components'
import { useModal } from 'hooks'

import useSpotlight from './useSpotlight'

import './spotlightStyle.css'

import { useState } from 'react'

const SpotlightModal = () => {
  const { closeModal, openModal } = useModal()
  const { onHandleClickGetGames, data } = useSpotlight()
  const { items } = data

  const [show_games, set_show_games] = useState({
    create_collection: false,
    create_player: false,
    create_contract: false,
  })

  const onHandleClickOption = (modal_name: string) => {
    openModal({ name: modal_name })
  }

  const onCreateOption = async (
    field_name: 'create_collection' | 'create_player' | 'create_contract',
  ) => {
    await onHandleClickGetGames()
    set_show_games(prevState => ({ ...prevState, [field_name]: !prevState[field_name] }))
  }

  const onCreateCollection = (game_id: string) => {
    openModal({ name: 'create-collection-modal', data: { game_id } })
  }

  const onCreatePlayer = (game_id: string) => {
    openModal({ name: 'create-player-modal', data: { game_id } })
  }

  return (
    <FullScreenModal dark_layer>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledCloseBtn onClick={() => closeModal('spotlight-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody resetPosition>
          <StyledInnerBodyWrapper>
            <Search />

            <StyledSugestContainer>
              <StyledTypography onClick={() => onHandleClickOption('create-game-modal')}>
                Create game
              </StyledTypography>
              <StyledTypography onClick={() => onCreateOption('create_collection')}>
                Create Collection
              </StyledTypography>
              {show_games.create_collection &&
                items?.length > 0 &&
                items.map((item: any) => (
                  <StyledGameWrapper
                    onClick={() => onCreateCollection(item.id)}
                    key={item.id}
                  >{`Game name: ${item.name}`}</StyledGameWrapper>
                ))}
              <StyledTypography onClick={() => onCreateOption('create_player')}>
                Create Player
              </StyledTypography>
              {show_games.create_player &&
                items?.length > 0 &&
                items.map((item: any) => (
                  <StyledGameWrapper
                    onClick={() => onCreatePlayer(item.id)}
                    key={item.id}
                  >{`Game name: ${item.name}`}</StyledGameWrapper>
                ))}
              {/*
              <StyledTypography onClick={() => onCreateOption('create_contract')}>
                Create Contract
              </StyledTypography>
              {show_games.create_contract &&
                items?.length > 0 &&
                items.map((item: any) => <div key={item.id}>{item.name}</div>)} */}
            </StyledSugestContainer>
          </StyledInnerBodyWrapper>
        </StyledModalBody>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('spotlight-modal')(SpotlightModal)

const StyledSugestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
`

const StyledInnerBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
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
