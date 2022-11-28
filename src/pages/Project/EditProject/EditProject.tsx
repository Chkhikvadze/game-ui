import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";
import { useEditProject } from "pages/Project/EditProject/useEditProject";

import { game_category_options } from "utils/constants";


const EditProject = () => {
  const {formik} = useEditProject()
  const {banner_image, logo_image, background_image} = formik?.values
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
			  options={game_category_options}
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
			<img src={banner_image} alt={"N/A"}/>
			<img src={logo_image} alt={"N/A"}/>
			<img src={background_image} alt={"N/A"}/>
			<button onClick={() => formik.handleSubmit()}>Update</button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditProject