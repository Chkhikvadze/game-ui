import React from "react";
import { FormikProvider } from "formik";

import { StyledRoot } from "oldComponents/atoms/Heading/HeadingStyle";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle";
import { useEditProject } from "pages/Project/EditProject/useEditProject";

import { game_category_options } from "utils/constants";
import { AvatarIcon, ImageIcon } from "@radix-ui/react-icons";
import { StyledUploadImg, StyledUploadLogo } from "modals/CreateProjectModal";
import Button from "oldComponents/atoms/Button";


const EditProject = () => {
  const {formik, handleChangeFile, onDeleteImg, fileUploadType} = useEditProject()
  const {banner_image, logo_image, background_image} = formik?.values
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
			  labelColor={'#fff'}
			/>
			
			<CustomTextField
			  name="project_name"
			  placeholder="Project Name"
			  label="Project name"
			  mandatory
			  labelColor={'#fff'}
			/>
			
			<CustomTextField
			  name="project_description"
			  placeholder="Project description"
			  label="Project description"
			  mandatory
			  labelColor={'#fff'}
			/>
			<CustomSelectField
			  options={game_category_options}
			  name="project_category"
			  placeholder="Project category"
			  label="Project category"
			  mandatory
			  labelColor={'#fff'}
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
			  labelColor={'#fff'}
			
			/>
			
			<StyledUploadImg
			  name={'background_image'}
			  onChange={(e: any) => handleChangeFile(e, 'background_image')}
			  placeholder={'Upload Background image'}
			  fileUploadType={fileUploadType}
			  img={background_image}
			  label={'Background image'}
			  description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
			  uploadIcon={<ImageIcon style={{width:50, height:50, color:"#fff"}}/>}
			  onDeleteImg={() => onDeleteImg("background_image")}
			  labelColor={'#fff'}
			
			/>
			
			<CustomTextField
			  name="project_url"
			  placeholder="URL"
			  label="URL"
			  description={"Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens."}
			  mandatory
			  labelColor={'#fff'}
			
			/>
			<CustomTextField
			  name="project_web_link"
			  placeholder="Web link"
			  label="Web link"
			  mandatory
			  labelColor={'#fff'}
			
			/>
			<CustomTextField
			  name="project_twitter_link"
			  placeholder="Twitter"
			  label="Twitter"
			  mandatory
			  labelColor={'#fff'}
			
			/>
			<CustomTextField
			  name="project_instagram_link"
			  placeholder="Instagram"
			  label="Instagram"
			  mandatory
			  labelColor={'#fff'}
			
			/>
			<CustomTextField
			  name="project_discord_link"
			  placeholder="Discord"
			  label="Discord"
			  mandatory
			  labelColor={'#fff'}
			
			/>
			
			<Button color={'primary'} onClick={() => formik.handleSubmit()}>Update</Button>
		  </StyledFromSection>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}


export default EditProject