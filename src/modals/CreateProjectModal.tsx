import React from 'react'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import ProjectForm from "pages/Project/ProjectForm"

import { useProjects } from "pages/Project/Projects/useProjects"
import FileUploadField from "atoms/FileUploadField"

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import Modal from 'oldComponents/molecules/Modal'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import { StyledFromSection } from './modalStyle'

interface CreateProjectModalProps {
  closeModal: () => any;
}


const CreateProjectModal = ({closeModal}: CreateProjectModalProps) => {
  const {formik} = useProjects()
  
  return (
    <StyledRoot>
      <FormikProvider value={formik}>
        <Modal
          close={closeModal}
          header={'Create Game'}
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
            <ProjectForm useHook={useProjects} />
          </StyledFromSection>
        </Modal>
      </FormikProvider>
    </StyledRoot>
  )
}

export default withRenderModal('create-project-modal')(CreateProjectModal)


export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`


export const StyledUploadLogo = styled(FileUploadField)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`


export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`