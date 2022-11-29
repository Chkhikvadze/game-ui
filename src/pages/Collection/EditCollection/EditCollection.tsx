import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";

import { collection_category_options } from "utils/constants";
import { useEditCollection } from "./useEditCollection";
import { StyledUploadImg, StyledUploadLogo } from "modals/CreateProjectModal";
import { AvatarIcon, ImageIcon } from "@radix-ui/react-icons";


const EditCollection = () => {
  const {
	formik,
	fileUploadType,
	handleChangeFile,
	onDeleteImg
  } = useEditCollection()
  
  const {banner_image, logo_image, cover_image, featured_image} = formik?.values
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <StyledFromSection>
			<StyledUploadLogo
			  name={'logo_image'}
			  onChange={(e: any) => handleChangeFile(e, 'logo_image')}
			  placeholder={'Upload logo image'}
			  fileUploadType={fileUploadType}
			  img={logo_image}
			  label={'Logo image'}
			  description={'This image will also be used for navigation. 350 x 350 recommended.'}
			  uploadIcon={<AvatarIcon style={{width:50, height:50, color:"#fff"}}/>}
			  onDeleteImg={() => onDeleteImg("logo_image")}
			/>
			<CustomTextField
			  name="collection_name"
			  placeholder="Name"
			  label="Name"
			  mandatory
			/>
			<CustomTextField
			  name="collection_description"
			  placeholder="Description"
			  label="Description"
			  mandatory
			/>
			
			<CustomSelectField
			  options={collection_category_options}
			  name="collection_category"
			  placeholder="Category"
			  label="Category"
			  mandatory
			/>
			
			<StyledUploadImg
			  name={'banner_image'}
			  onChange={(e: any) => handleChangeFile(e, 'banner_image')}
			  placeholder={'Upload banner image'}
			  fileUploadType={fileUploadType}
			  img={banner_image}
			  label={'Banner image'}
			  description={`This image will appear at the top of your Game page. Avoid including too much text in this banner\n' +
				   image as the dimensions change on different devices. 1400 x 350 recommended.`}
			  uploadIcon={<ImageIcon style={{width:50, height:50, color:"#fff"}}/>}
			  onDeleteImg={() => onDeleteImg("banner_image")}
			/>
			
			<StyledUploadImg
			  name={'cover_image'}
			  onChange={(e: any) => handleChangeFile(e, 'cover_image')}
			  placeholder={'Upload cover image'}
			  fileUploadType={fileUploadType}
			  img={cover_image}
			  label={'Cover image'}
			  description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
			  uploadIcon={<ImageIcon style={{width:50, height:50, color:"#fff"}}/>}
			  onDeleteImg={() => onDeleteImg("cover_image")}
			/>
			
			<StyledUploadImg
			  name={'featured_image'}
			  onChange={(e: any) => handleChangeFile(e, 'featured_image')}
			  placeholder={'Upload featured image'}
			  fileUploadType={fileUploadType}
			  img={featured_image}
			  label={'Featured image'}
			  description={`This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.`}
			  uploadIcon={<ImageIcon style={{width:50, height:50, color:"#fff"}}/>}
			  onDeleteImg={() => onDeleteImg("featured_image")}
			/>
			
			<CustomTextField
			  name="collection_url"
			  placeholder="URL"
			  label="URL"
			  description={"Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens."}
			  mandatory
			/>
			
			<CustomTextField
			  name="collection_web_link"
			  placeholder="Web link"
			  label="Web link"
			  mandatory
			/>
		  
		  </StyledFromSection>
		
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditCollection