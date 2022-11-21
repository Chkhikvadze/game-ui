import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFromSection } from './modalStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import { useProjects } from "pages/Project/Projects/useProjects";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import { game_category_options } from "utils/constants";

type CreateProjectModalProps = {
  closeModal: () => void
}


const CreateProjectModal = ({closeModal}: CreateProjectModalProps) => {
  const {formik} = useProjects()
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <Modal
			close={closeModal}
			header={"Create Game"}
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
				name="project_name"
				placeholder="Name"
				label="Name"
				mandatory
			  />
			  <CustomSelectField
				options={game_category_options}
				name="project_category"
				placeholder="Category"
				label="Category"
				mandatory
			  />
			  <CustomTextField
				name="project_description"
				placeholder="Description "
				label="Description"
				mandatory
			  />
			</StyledFromSection>
		  </Modal>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('create-project-modal')(CreateProjectModal)

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
