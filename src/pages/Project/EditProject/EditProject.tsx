import React from "react"
import { useEditProject } from "pages/Project/EditProject/useEditProject"
import ProjectForm from "pages/Project/ProjectForm"

import { StyledFromSection } from "styles/globalStyle.css"
import { FormikProvider } from "formik"
import Button from "oldComponents/atoms/Button"

const EditProject = () => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = useEditProject()
  
  return (
    <FormikProvider value={formik}>
      <StyledFromSection>
        <ProjectForm
          formik={formik}
          handleChangeFile={handleChangeFile}
          onDeleteImg={onDeleteImg}
          fileUploadType={fileUploadType}
        />
        <Button color="primary" onClick={formik.handleSubmit}>
          Save
        </Button>
      </StyledFromSection>
    </FormikProvider>
  )
}

export default EditProject