import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";

import { collection_category_options } from "utils/constants";
import { useEditCollection } from "./useEditCollection";


const EditCollection = () => {
  const {formik} = useEditCollection()
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<CustomTextField
			  name="project_name"
			  placeholder="Collection Name"
			  label="Project name"
			  mandatory
			/>
			<CustomSelectField
			  options={collection_category_options}
			  name="project_category"
			  placeholder="Collection category"
			  label="Project category"
			  mandatory
			/>
			<CustomTextField
			  name="project_description"
			  placeholder="Collection description"
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


export default EditCollection