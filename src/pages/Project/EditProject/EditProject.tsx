import React from "react"
import { useEditProject } from "pages/Project/EditProject/useEditProject"
import ProjectForm from "pages/Project/ProjectForm"

import { StyledFromSection } from "styles/globalStyle.css"
import { FormikProvider } from "formik"
import Button from "oldComponents/atoms/Button"

const EditProject = () => {
  const {formik} = useEditProject()
  
  return (
    <FormikProvider value={formik}>
	  <StyledFromSection>
        <ProjectForm useHook={useEditProject}/>
        <Button color="primary" onClick={formik.handleSubmit}>
		  Save
        </Button>
	  </StyledFromSection>
    </FormikProvider>
  )
}

export default EditProject