import React from "react";
import { useEditProject } from "pages/Project/EditProject/useEditProject";
import ProjectForm from "pages/Project/ProjectForm";

import { StyledFromSection } from "styles/globalStyle.css";

const EditProject = () => {
  return (
	<StyledFromSection>
	  <ProjectForm useHook={useEditProject}/>
	</StyledFromSection>
  )
}

export default EditProject