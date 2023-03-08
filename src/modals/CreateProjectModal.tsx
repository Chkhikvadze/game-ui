import React from 'react'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import ProjectForm from 'pages/Project/ProjectForm'
import { useProjects } from 'pages/Project/Projects/useProjects'

import FileUploadField from 'atoms/FileUploadField'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import Modal from 'oldComponents/molecules/Modal'
// import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

// import { StyledFormSection } from './modalStyle'

import { useTranslation } from 'react-i18next'

interface CreateProjectModalProps {
  closeModal: () => any
}

const CreateProjectModal = ({ closeModal }: CreateProjectModalProps) => {
  const {
    formik,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    setToast,
    toast,
    formHook,
    handleSubmit,
  } = useProjects()
  const { t } = useTranslation()
  return (
    <StyledRoot>
      <FormikProvider value={formik}>
        <Modal
          fullscreen={true}
          modalWidth={'100%'}
          close={closeModal}
          // header={'Create Game'}
          backgroundColor={'radial-gradient(107.39% 52.7% at 50% 50%, #3E4EA9 0%, #111B52 100%)'}
          // footer={
          //   <StyledActionsContainer>
          //     <StyledModalButtonLink style={{}} onClick={closeModal}>
          //       {t('cancel')}
          //     </StyledModalButtonLink>
          //     <Button color='primary' onClick={formik.handleSubmit}>
          //       {t('save')}
          //     </Button>
          //   </StyledActionsContainer>
          // }
        >
          <ProjectForm
            formik={formik}
            handleChangeFile={handleChangeFile}
            onDeleteImg={onDeleteImg}
            fileUploadType={fileUploadType}
            closeModal={closeModal}
            toast={toast}
            setToast={setToast}
            formHook={formHook}
            handleSubmit={handleSubmit}
          />
        </Modal>
      </FormikProvider>
    </StyledRoot>
  )
}

export default withRenderModal('create-project-modal')(CreateProjectModal)

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

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
