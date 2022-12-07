import React from 'react'
import { useEditProject } from 'pages/Project/EditProject/useEditProject'
import ProjectForm from 'pages/Project/ProjectForm'

import { StyledFormSection } from 'styles/globalStyle.css'
import { FormikProvider } from "formik"
import Button from "oldComponents/atoms/Button"

const EditProject = () => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = useEditProject()
  
  return (
    <FormikProvider value={formik}>
      <StyledFormSection>
        <ProjectForm
          formik={formik}
          handleChangeFile={handleChangeFile}
          onDeleteImg={onDeleteImg}
          fileUploadType={fileUploadType}
        />
        <Button color="primary" onClick={formik.handleSubmit}>
          Save
        </Button>
      </StyledFormSection>
    </FormikProvider>
  )
}

export default EditProject