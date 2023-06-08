import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import PlayerForm from 'pages/Player/PlayerForm'
import usePlayers from 'pages/Player/Players/usePlayers'

import Button from '@l3-lib/ui-core/dist/Button'
import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'

import { starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import {
  StyledModalWrapper,
  StyledModalFooter,
  StyledModalBody,
  StyledCloseBtn,
  StyledHeaderGroup,
  StyledHeader,
  StyledTypography,
} from './modalStyle'
import Modal from './Modal'

type CreatePlayerModalProps = {
  data?: any
}

const CreatePlayerModal = ({ data }: CreatePlayerModalProps) => {
  const {
    formik,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    generateRandomCryptoString,
    awaitCreatePlayer,
    closeModal,
  } = usePlayers(data)

  const createPlayer = () => {
    formik.handleSubmit()
  }

  return (
    <Modal>
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
    </Modal>
  )
}

export default withRenderModal('create-player-modal')(CreatePlayerModal)
