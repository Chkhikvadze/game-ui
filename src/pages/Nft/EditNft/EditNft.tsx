import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";

import { nft_type_options } from "utils/constants";
import { useEditNft } from "./useEditNft";


const EditNft = () => {
  const {formik} = useEditNft()
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<CustomTextField
			  name="nft_name"
			  placeholder="Nft name"
			  label="Nft name"
			  mandatory
			/>
			<CustomTextField
			  name="nft_price"
			  placeholder="Nft price"
			  label="Nft type"
			  numeric
			  mandatory
			/>
			<CustomTextField
			  name="nft_supply"
			  placeholder="Nft supply"
			  label="Nft supply"
			  numeric
			  mandatory
			/>
			<CustomSelectField
			  name="nft_type"
			  placeholder="Nft Type"
			  label="Nft type"
			  options={nft_type_options}
			  mandatory
			/>
			
			<button onClick={() => formik.handleSubmit()}>Update</button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditNft