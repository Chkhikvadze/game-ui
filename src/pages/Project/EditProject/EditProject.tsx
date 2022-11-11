import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";
import { useEditProject } from "pages/Project/EditProject/useEditProject";

import { category_options } from "utils/constants";


const EditProject = () => {
  const {formik} = useEditProject()
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<CustomTextField
			  name="project_name"
			  placeholder="Project Name"
			  label="Project name"
			  mandatory
			/>
			<CustomSelectField
			  options={category_options}
			  name="project_category"
			  placeholder="Project category"
			  label="Project category"
			  mandatory
			/>
			<CustomTextField
			  name="project_description"
			  placeholder="Project description"
			  label="Project description"
			  mandatory
			/>
			<button onClick={() => formik.handleSubmit()}>Update</button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditProject