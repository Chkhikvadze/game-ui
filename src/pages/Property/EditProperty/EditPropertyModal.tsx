import { FormikProvider } from 'formik'

import { useEditProperty } from './useEditProperty'

import withRenderModal from 'hocs/withRenderModal'

import Button from '@l3-lib/ui-core/dist/Button'

import PropertyForm from '../PropertyForm'
import FullScreenModal from 'components/FullScreenModal'
import {
  StyledCloseBtn,
  StyledHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledModalWrapper,
} from 'modals/modalStyle'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import { StyledBodyContainer, StyledContainer } from 'styles/modalFormStyle.css'
// import AddCustomFields from 'components/AddCustomFields'

type EditPropertyModalProps = {
  data: {
    closeModal: () => void
    propertyId: string
  }
}

const EditPropertyModal = ({ data }: EditPropertyModalProps) => {
  const { propertyId, closeModal } = data

  const { formik } = useEditProperty(propertyId)

  return (
    <>
      <FullScreenModal>
        <StyledModalWrapper className='modal_wrapper'>
          <FormikProvider value={formik}>
            <StyledHeader>
              <StyledCloseBtn onClick={() => closeModal()}>
                <CloseIconSvg color='rgba(255, 255, 255, 0.8);' />
              </StyledCloseBtn>
            </StyledHeader>
            <StyledModalBody>
              <StyledContainer>
                <StyledBodyContainer>
                  <PropertyForm formik={formik} />
                </StyledBodyContainer>
              </StyledContainer>
            </StyledModalBody>

            <StyledModalFooter>
              <Button onClick={formik.handleSubmit}>Save</Button>
            </StyledModalFooter>
          </FormikProvider>
        </StyledModalWrapper>
      </FullScreenModal>
    </>
  )
}

export default withRenderModal('edit-property-modal')(EditPropertyModal)
