import { FormikProvider } from 'formik'

import PlayerForm from 'pages/Player/PlayerForm'
import withRenderModal from 'hocs/withRenderModal'
import useEditPlayer from './useEditPlayer'

import { starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

import PersonaOutline from '@l3-lib/ui-core/dist/icons/PersonaOutline'
import Button from '@l3-lib/ui-core/dist/Button'

import {
  StyledModalWrapper,
  StyledModalFooter,
  StyledModalBody,
  StyledCloseBtn,
  StyledHeaderGroup,
  StyledHeader,
  StyledTypography,
} from 'modals/modalStyle'
import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from 'modals/components/BgWrapper'

const EditPlayerModal = () => {
  const { formik, closeModal, handleChangeFile, onDeleteImg, fileUploadType } = useEditPlayer()
  return (
    <Modal fullscreen show isClean>
      <BgWrapper>
        <StyledModalWrapper>
          <StyledHeader>
            <StyledHeaderGroup>
              <img src={starsIcon} alt='start' />
              <StyledTypography>Edit player</StyledTypography>
            </StyledHeaderGroup>
            <StyledCloseBtn onClick={() => closeModal('edit-player-modal')}>
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
                editMode
              />
            </FormikProvider>
          </StyledModalBody>
          <StyledModalFooter>
            <Button onClick={() => formik.handleSubmit()} leftIcon={PersonaOutline}>
              Update player
            </Button>
          </StyledModalFooter>
        </StyledModalWrapper>
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('edit-player-modal')(EditPlayerModal)
