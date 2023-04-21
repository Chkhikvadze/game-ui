import { FormikProvider } from 'formik'
import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import PlayerForm from 'pages/Player/PlayerForm'
import usePlayers from 'pages/Player/Players/usePlayers'

import FullScreenModal from 'components/FullScreenModal'
import Button from '@l3-lib/ui-core/dist/Button'
import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'

import { starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

const CreatePlayerModal = () => {
  const {
    formik,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    generateRandomCryptoString,
    awaitCreatePlayer,
    closeModal,
  } = usePlayers()

  const createPlayer = () => {
    formik.handleSubmit()
  }

  return (
    <FullScreenModal>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledHeaderGroup>
            <img src={starsIcon} alt='start' />
            <StyledTypography>Add AI Test Players</StyledTypography>
          </StyledHeaderGroup>
          <StyledCloseBtn onClick={() => closeModal('create-player-modal')}>
            <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
          </StyledCloseBtn>
        </StyledHeader>
        <StyledModalBody>
          <FormikProvider value={formik}>
            <PlayerForm
              formik={formik}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
              fileUploadType={fileUploadType}
              generateRandomCryptoString={generateRandomCryptoString}
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <Button onClick={createPlayer} disabled={awaitCreatePlayer} leftIcon={PersonaOutline}>
            Create 1 player
          </Button>
          <StyledTypography onClick={createPlayer} disabled={awaitCreatePlayer}>
            Add another player
          </StyledTypography>
        </StyledModalFooter>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('create-player-modal')(CreatePlayerModal)

const StyledModalWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const StyledCloseBtn = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`

const StyledTypography = styled.p<{ disabled?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  pointer-events: ${p => p.disabled && 'none'};
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
`

const StyledModalFooter = styled.div`
  padding: 94px 58px 64px;

  display: flex;
  align-items: center;
  gap: 20px;
`
