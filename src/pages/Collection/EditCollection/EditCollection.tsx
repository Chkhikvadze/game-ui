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
  const {banner_image} = formik?.values
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<CustomTextField
			  name="project_name"
			  placeholder="Collection Name"
			  label="Collection Name"
			  mandatory
			/>
			<CustomSelectField
			  options={collection_category_options}
			  name="project_category"
			  placeholder="Collection category"
			  label="Collection category"
			  mandatory
			/>
			<CustomTextField
			  name="project_description"
			  placeholder="Collection category"
			  label="Collection category"
			  mandatory
			/>
			<img src={banner_image} alt={"N/A"}/>
			<button onClick={() => formik.handleSubmit()}>Update</button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditCollection