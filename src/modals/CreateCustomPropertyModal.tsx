import { FormikProvider } from 'formik'
import styled from 'styled-components'

// import { useProperties } from 'pages/Property/Properties/useProperties'

import Button from 'oldComponents/atoms/Button'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import withRenderModal from 'hocs/withRenderModal'

import { StyledFormSection } from './modalStyle'
import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import Modal from 'modals/Modal'

import { useTranslation } from 'react-i18next'
import { StyledRoot } from './CreateCollectionModal'

type CreateCustomPropertyModalProps = {
  closeModal: () => void
  formik: any
}

const CreateCustomPropertyModal = ({ closeModal, formik }: CreateCustomPropertyModalProps) => {
  // const { formik } = useProperties()
  const { t } = useTranslation()
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal close={closeModal}>
            <StyledFormSection>
              <CustomSelectField
                name={'custom_props[0].prop_type'}
                placeholder='Type'
                // label="Type"
                options={PROPERTY_TYPE_OPTIONS}
              />
              <CustomTextField name={'custom_props[0].prop_name'} placeholder={'Name'} />
            </StyledFormSection>{' '}
            <StyledActionsContainer>
              <Button color='secondary' onClick={closeModal}>
                {t(' cancel')}
              </Button>

              <Button color='primary' onClick={formik.handleSubmit}>
                {t('save')}
              </Button>
            </StyledActionsContainer>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-custom-property-modal')(CreateCustomPropertyModal)

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`
