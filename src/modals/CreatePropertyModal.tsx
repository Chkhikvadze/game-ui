import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFormSection } from './modalStyle'

import { property_type_options } from 'utils/constants'

import { useProperties } from 'pages/Property/Properties/useProperties'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Modal from 'oldComponents/molecules/Modal'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'

type CreateProjectModalProps = {
  closeModal: () => void
}

const CreatePropertyModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formik } = useProperties()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create property'}
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
            </StyledFormSection>
          </Modal>
        </FormikProvider>
      </StyledRoot>
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
