import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import useCreateApiKey from './useCreateApiKey'

import { useTranslation } from 'react-i18next'

import styled from 'styled-components'
import { StyledFromSection } from '../ApiKeysStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import Typography from 'oldComponents/atoms/Typography'
import DatePickerField from 'oldComponents/atoms/DatePickerField'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'
import TextField from 'oldComponents/molecules/TextField'
import TextAreaField from 'oldComponents/molecules/TeaxtAreaField'

type CreateApiModalProps = {
  closeModal: () => void
  data: {
	token: any
  }
}

const CreateApiModal = ({closeModal, data}: CreateApiModalProps) => {
  const {t} = useTranslation()
  const {formik} = useCreateApiKey()
  
  return (
	<>
	  <StyledRoot>
		{data.token ? (
		  <Modal
			close={closeModal}
			header={'Your Token'}
			footer={
			  <Button color="primary" onClick={closeModal}>
				Close
			  </Button>
			}
		  >
			<Typography color="grey" mb={48} variant="h2">
			  {data.token}
			</Typography>
		  </Modal>
		): (
		  <FormikProvider value={formik}>
			<Modal
			  close={closeModal}
			  header={t('create-api-key')}
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
		)}
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('add-api-keys-modal')(CreateApiModal)

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
