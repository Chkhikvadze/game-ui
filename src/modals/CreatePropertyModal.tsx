import { useRef } from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import {
  StyledCloseBtn,
  StyledHeader,
  StyledModalBody,
  StyledModalFooter,
  StyledModalWrapper,
} from './modalStyle'

import AddCustomFields from 'components/AddCustomFields'
import ButtonLink from 'oldComponents/atoms/ButtonLink'
// import Button from 'oldComponents/atoms/Button'
import Button from '@l3-lib/ui-core/dist/Button'

import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'
import { useProperties } from 'pages/Property/Properties/useProperties'

import { useTranslation } from 'react-i18next'
import FullScreenModal from 'components/FullScreenModal'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import { StyledBodyContainer, StyledContainer } from 'styles/modalFormStyle.css'
import FormikTextField from 'components/TextFieldFormik'
import DropDownFormik from 'components/DropDownFormik'

type CreateGameModalProps = {
  closeModal: () => void
}

const CreatePropertyModal = ({ closeModal }: CreateGameModalProps) => {
  // const [customFieldsNumber, setCustomFieldsNumber] = useState([1])

  const { formik, handleUploadImages, loadingMediaUpload } = useProperties()
  const { custom_props } = formik?.values

  const { t } = useTranslation()

  const uploadRef = useRef<HTMLInputElement>(null)

  const onButtonClick = async () => {
    uploadRef?.current?.click()
  }

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
                  <FormikTextField name='property_name' placeholder='Name' label='Name' />

                  <DropDownFormik
                    options={PROPERTY_TYPE_OPTIONS}
                    name='property_type'
                    placeholder='Type'
                    title='Type'
                    kind='primary'
                  />

                  <FormikTextField
                    name='property_description'
                    placeholder='Description'
                    label='Description'
                  />

                  <div>
                    <Button onClick={onButtonClick} disabled={loadingMediaUpload}>
                      {loadingMediaUpload ? 'Uploading' : 'Add Medias'}
                    </Button>
                    <input
                      type='file'
                      multiple
                      ref={uploadRef}
                      style={{ display: 'none' }}
                      onChange={e => handleUploadImages(e, 'medias')}
                    />
                  </div>

                  <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
                </StyledBodyContainer>
              </StyledContainer>
            </StyledModalBody>

            <StyledModalFooter>
              <Button onClick={formik.handleSubmit}>Create Property</Button>
            </StyledModalFooter>
          </FormikProvider>
        </StyledModalWrapper>
      </FullScreenModal>
    </>
  )
}

export default withRenderModal('create-property-modal')(CreatePropertyModal)

// const StyledForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 24px;
//   grid-row-gap: 16px;
//   width: 600px;
// `

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
