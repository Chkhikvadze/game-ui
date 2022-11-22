import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";

import { property_type_options } from "utils/constants";
import { useEditProperty } from "./useEditProperty";


const EditProperty = () => {
  const {formik} = useEditProperty()
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<CustomTextField
			  name="property_name"
			  placeholder="Name"
			  label="Name"
			  mandatory
			/>
			
			<CustomSelectField
			  name="property_type"
			  placeholder="Type"
			  label="Type"
			  options={property_type_options}
			  mandatory
			/>
			
			<CustomTextField
			  name="property_description"
			  placeholder="Description"
			  label="Description"
			  mandatory
			/>
			<button onClick={() => formik.handleSubmit()}>Update</button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default EditProperty