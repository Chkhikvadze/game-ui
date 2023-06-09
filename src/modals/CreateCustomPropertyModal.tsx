import { FormikProvider } from 'formik'
import styled from 'styled-components'

// import { useProperties } from 'pages/Property/Properties/useProperties'

import Button from '@l3-lib/ui-core/dist/Button'

import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

import TextField from '@l3-lib/ui-core/dist/TextField'

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
          <Modal>
            <StyledWrapper>
              <StyledFormSection>
                <Dropdown
                  name={'custom_props[0].prop_type'}
                  placeholder='Type'
                  options={PROPERTY_TYPE_OPTIONS}
                />
                <TextField name={'custom_props[0].prop_name'} placeholder={'Name'} />
                <StyledActionsContainer>
                  <Button onClick={closeModal} kind={Button.kinds.TERTIARY}>
                    {t(' cancel')}
                  </Button>

                  <Button onClick={formik.handleSubmit}>{t('save')}</Button>
                </StyledActionsContainer>
              </StyledFormSection>
            </StyledWrapper>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-custom-property-modal')(CreateCustomPropertyModal)

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
