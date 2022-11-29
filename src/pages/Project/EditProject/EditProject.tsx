import React from "react";
import { useEditProject } from "pages/Project/EditProject/useEditProject";
import ProjectForm from "pages/Project/ProjectForm";

import { StyledFromSection } from "styles/globalStyle.css";
import { FormikProvider } from "formik";

const EditProject = () => {
  const {formik} = useEditProject()
  
  return (
	<FormikProvider value={formik}>
	  <StyledFromSection>
		<ProjectForm useHook={useEditProject}/>
	  </StyledFromSection>
	</FormikProvider>
  )
}

export default EditProject