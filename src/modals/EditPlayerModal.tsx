import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import PlayerForm from 'pages/Player/PlayerForm'

import FullScreenModal from 'components/FullScreenModal'
import Button from '@l3-lib/ui-core/dist/Button'

// import { starsIcon } from 'assets/icons'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import {
  StyledModalWrapper,
  StyledModalFooter,
  StyledModalBody,
  StyledCloseBtn,
  StyledHeaderGroup,
  StyledHeader,
} from './modalStyle'
import useEditPlayer from 'pages/Player/EditPlayerModal/useEditPlayer'

const EditPlayerModal = () => {
  const { formik, onDeleteImg, handleChangeFile, fileUploadType, closeModal } = useEditPlayer()

  const editPlayer = () => {
    formik.handleSubmit()
  }

  return (
    <FullScreenModal>
      <StyledModalWrapper className='modal_wrapper'>
        <StyledHeader>
          <StyledHeaderGroup>
            {/* <img src={starsIcon} alt='start' /> */}
            {/* <StyledTypography>Add AI Test Players</StyledTypography> */}
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
              //   generateRandomCryptoString={generateRandomCryptoString}
              editMode
            />
          </FormikProvider>
        </StyledModalBody>
        <StyledModalFooter>
          <Button onClick={editPlayer}>Save</Button>
        </StyledModalFooter>
      </StyledModalWrapper>
    </FullScreenModal>
  )
}

export default withRenderModal('edit-player-modal')(EditPlayerModal)
