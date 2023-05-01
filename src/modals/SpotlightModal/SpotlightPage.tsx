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
import SpotlightSearch from 'components/SpotlightSearch/SpotlightSearch'
import { StyledModalHeader } from 'pages/Addons'

const SpotlightPage = () => {
  const { openModal } = useModal()
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
    <>
      <StyledModalWrapper>
        <StyledHeader></StyledHeader>
        <StyledModalBody resetPosition>
          <StyledInnerBodyWrapper>
            <SpotlightSearch />
          </StyledInnerBodyWrapper>
        </StyledModalBody>
      </StyledModalWrapper>
    </>
  )
}

export default SpotlightPage

const StyledInnerBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`
