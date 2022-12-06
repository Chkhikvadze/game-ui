import React from 'react'

import withRenderModal from 'hocs/withRenderModal'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'

import { FormikProvider } from 'formik'
import useEditApiKey from './useEditApiKey'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import TextField from 'oldComponents/molecules/TextField'
import TextAreaField from 'oldComponents/molecules/TeaxtAreaField'
import DatePickerField from 'oldComponents/atoms/DatePickerField'

import styled from 'styled-components'
import { StyledFromSection } from '../ApiKeysStyle'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

type EditApiModalProps = {
  closeModal: () => void
  data: {id: string; refetchApiList: any}
}

const EditApiModal = ({closeModal, data}: EditApiModalProps) => {
  const {t} = useTranslation()
  const {formik} = useEditApiKey(data)
  
  return (
    <>
	  <StyledRoot>
        <FormikProvider value={formik}>
		  <Modal
            close={closeModal}
            header={t('edit-api-key')}
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
            <StyledFromSection>
			  <TextField name="name" label="Name" labelColor="#000"/>
			  <TextAreaField name="note" label="Note" labelColor="#000"/>
			  <DatePickerField reverse name="expiration" label="Expiration" labelColor="#000"/>
            </StyledFromSection>
		  </Modal>
        </FormikProvider>
	  </StyledRoot>
    </>
  )
}

export default withRenderModal('edit-api-keys-modal')(EditApiModal)

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
