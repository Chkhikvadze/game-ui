import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFromSection } from './modalStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import { collection_category_options } from "utils/constants";
import { useCollection } from "pages/Collection/Collections/useCollection";

type CreateProjectModalProps = {
  closeModal: () => void
}


const CreateCollectionModal = ({closeModal}: CreateProjectModalProps) => {
  const {formik, handleChangeFile} = useCollection()
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <Modal
			close={closeModal}
			header={"Create Collection"}
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
			  <CustomTextField
				name="collection_name"
				placeholder="Name"
				label="Name"
				mandatory
			  />
			  <CustomSelectField
				options={collection_category_options}
				name="collection_category"
				placeholder="Category"
				label="Category"
				mandatory
			  />
			  <CustomTextField
				name="collection_description"
				placeholder="Description"
				label="Description"
				mandatory
			  />
			  <input type={'file'} placeholder={'Upload banner image'} onChange={handleChangeFile}/>
			</StyledFromSection>
		  </Modal>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('create-collection-modal')(CreateCollectionModal)

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
