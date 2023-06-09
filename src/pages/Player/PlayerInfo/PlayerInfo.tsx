import styled from 'styled-components'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import Persona from '@l3-lib/ui-core/dist/icons/Persona'

import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

import usePlayerInfo from './usePlayerInfo'
import EditPlayerModal from '../EditPlayerModal/EditPlayerModal'
import PlayerWallets from './components/PlayerWallets'
import PlayerInfoWidgets from './components/PlayerInfoWidgets'
// import PlayerForm from '../PlayerForm'

// import { StyledFormSection } from 'modals/modalStyle'

// import Button from 'oldComponents/atoms/Button'
// import Typography from 'oldComponents/atoms/Typography'
// import { CustomTable } from 'oldComponents/atoms/CustomTable'
// import columnConfig from './columnConfig'

// const config = columnConfig()

const PlayerInfo = () => {
  const { playerById, walletByPlayer, openModal, totalAssets } = usePlayerInfo()
  const { unique_id } = playerById

  return (
    <>
      <StyleHeaderGroup>
        <Heading
          value={'Player Info'}
          type={Heading.types.h1}
          customColor='#FFFFFF'
          size='medium'
        />
        <StyledButtonWrapper>
          <Button
            onClick={() => {
              // Used for testing Sentry error handling
              throw new Error('Test error')
            }}
          >
            Reward Player
          </Button>
          <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <button onClick={() => openModal({ name: 'edit-player-modal' })}>
                <Typography
                  value={'Edit player'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </button>
            </StyledButtonsWrapper>
          </MenuButton>
        </StyledButtonWrapper>
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        <StyledMainWrapper>
          <StyledIconText>
            <Persona />
            <Typography
              value={`User ID ${unique_id}`}
              type={Heading.types.p}
              size={Typography.sizes.md}
              customColor='#FFF'
            />
          </StyledIconText>

          <PlayerWallets wallet={walletByPlayer} />

          <PlayerInfoWidgets player={playerById} totalAssets={totalAssets} />
        </StyledMainWrapper>
      </StyledInnerWrapper>
      <EditPlayerModal />
    </>
  )
}
export default PlayerInfo

const StyledButtonWrapper = styled.div`
  display: flex;
  gap: 5px;

  align-items: center;
`

const StyledIconText = styled.div`
  display: flex;
  align-items: center;
`

const StyledMainWrapper = styled.div`
  display: grid;
  gap: 16px;
`

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;

  background: rgba(0, 0, 0, 0.2);

  padding: 16px;

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;
`
