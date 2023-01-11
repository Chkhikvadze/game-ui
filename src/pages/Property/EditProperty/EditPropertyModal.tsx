import React from 'react'
import { FormikProvider } from 'formik'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

import { property_type_options } from 'utils/constants'
import { useEditProperty } from './useEditProperty'
import withRenderModal from 'hocs/withRenderModal'
import Modal from 'oldComponents/molecules/Modal'
import { StyledActionsContainer, StyledModalButtonLink } from 'modals/CreatePropertyModal'
import Button from 'oldComponents/atoms/Button'
// import AddCustomFields from 'components/AddCustomFields'

type EditPropertyModalProps = {
  data: {
    closeModal: () => void
    propertyId: any
  }
}

const EditPropertyModal = ({ data }: EditPropertyModalProps) => {
  const { propertyId, closeModal } = data
  // console.log(propertyId)
  const { formik } = useEditProperty(propertyId)
  // const { custom_props } = formik?.values
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Edit property'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  Cancel
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  Save
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledFormSection>
              <CustomTextField name="property_name" placeholder="Name" label="Name" mandatory />

              <CustomSelectField
                name="property_type"
                placeholder="Type"
                label="Type"
                options={property_type_options}
                mandatory
              />

              <CustomTextField
                name="property_description"
                placeholder="Description"
                label="Description"
                mandatory
              />

              {/* <AddCustomFields name="custom_props" formik={formik} data={custom_props || []} /> */}

              {/* <button onClick={() => setCustomFieldsNumber((state: any) => [...state, 1])}>
                Add New
              </button> */}
            </StyledFormSection>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('edit-property-modal')(EditPropertyModal)
