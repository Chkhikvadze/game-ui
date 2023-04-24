import FullScreenModal from 'components/FullScreenModal'
import withRenderModal from 'hocs/withRenderModal'
import { starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import PlayerForm from 'pages/Player/PlayerForm'
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
import useEditPlayer from './useEditPlayer'
import { FormikProvider } from 'formik'

const EditPlayerModal = () => {
  const { formik, closeModal, handleChangeFile, onDeleteImg, fileUploadType } = useEditPlayer()
  return (
    <FullScreenModal>
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
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <Button onClick={() => formik.handleSubmit()} leftIcon={PersonaOutline}>
            Update player
          </Button>
        </StyledModalFooter>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('edit-player-modal')(EditPlayerModal)
