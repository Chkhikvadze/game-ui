import React, { useEffect, useState } from 'react'
import { FormikProvider } from 'formik'
import styled from 'styled-components'

import withRenderModal from 'hocs/withRenderModal'

import ProjectForm from 'pages/Project/ProjectForm'
import { useProjects } from 'pages/Project/Projects/useProjects'

import FileUploadField from 'atoms/FileUploadField'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Modal from 'oldComponents/molecules/Modal'

import { useTranslation } from 'react-i18next'
import CreateForm from 'components/CreateForm'
import CreateProjectForm from 'components/CreateForm/CreateProjectForm'

import actionImg from '../pages/Project/ProjectForm/assets/action.png'
import racingImg from '../pages/Project/ProjectForm/assets/racing.svg'
import adventureImg from '../pages/Project/ProjectForm/assets/adventure.png'

interface CreateProjectModalProps {
  closeModal: () => any
}

const CreateProjectModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formHook, handleSubmit } = useProjects()
  const { t } = useTranslation()

  const [backgroundImg, setBackgroundImg] = useState('')

  const projectName = formHook?.watch('project_name')
  const projectCategory = formHook?.watch('project_category')

  useEffect(() => {
    if (projectCategory === 'Action') {
      setBackgroundImg(actionImg)
    } else if (projectCategory === 'Adventure') {
      setBackgroundImg(adventureImg)
    } else if (projectCategory === 'Racing') {
      setBackgroundImg(racingImg)
    } else {
      setBackgroundImg('')
    }
  }, [projectCategory])

  return (
    <StyledRoot>
      <Modal
        fullscreen={true}
        modalWidth={'100%'}
        close={closeModal}
        backgroundColor={'radial-gradient(107.39% 52.7% at 50% 50%, #3E4EA9 0%, #111B52 100%)'}
      >
        <CreateForm
          closeModal={closeModal}
          formHook={formHook}
          handleSubmit={handleSubmit}
          nameValue={projectName}
          categoryValue={projectCategory}
          backgroundImg={backgroundImg}
          finishText={'Game unlocked'}
          form={<CreateProjectForm closeModal={closeModal} formHook={formHook} />}
        />
      </Modal>
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
