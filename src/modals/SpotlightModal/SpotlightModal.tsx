import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import styled from 'styled-components'
import { useModal } from 'hooks'

import withRenderModal from 'hocs/withRenderModal'

import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import useSpotlight from './useSpotlight'

import FullScreenModal from 'components/FullScreenModal'
import SpotlightSearch from 'components/SpotlightSearch/SpotlightSearch'

import './spotlightStyle.css'

import { StyledModalWrapper, StyledModalBody, StyledCloseBtn, StyledHeader } from '../modalStyle'
import CommandMenu from 'components/CommandMenu/CommandMenu'

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
            <CommandMenu />
            {/* <SpotlightSearch onHandleClickGetGames={onHandleClickGetGames} games_data={items} /> */}
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
