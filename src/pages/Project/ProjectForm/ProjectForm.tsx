import React from "react"

import { game_category_options } from "utils/constants"

import { StyledUploadImg, StyledUploadLogo } from "modals/CreateProjectModal"

import { AvatarIcon, ImageIcon } from "@radix-ui/react-icons"

import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField"
import CustomSelectField from "oldComponents/atoms/CustomSelect"


type ProjectFormType = {
  useHook: any
}

const ProjectForm = ({useHook}: ProjectFormType) => {
  const {formik, handleChangeFile, onDeleteImg, fileUploadType} = useHook()
  const {banner_image, logo_image, background_image} = formik?.values
  
  return (
    <>
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
        name="project_name"
        placeholder="Project Name"
        label="Project name"
        mandatory
	  />
	  
	  <CustomTextField
        name="project_description"
        placeholder="Project description"
        label="Project description"
        mandatory
	  
	  />
	  <CustomSelectField
        options={game_category_options}
        name="project_category"
        placeholder="Project category"
        label="Project category"
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
        name={'background_image'}
        onChange={(e: any) => handleChangeFile(e, 'background_image')}
        placeholder={'Upload Background image'}
        fileUploadType={fileUploadType}
        img={background_image}
        label={'Background image'}
        description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
        uploadIcon={<ImageIcon style={{width:50, height:50, color:"#fff"}}/>}
        onDeleteImg={() => onDeleteImg("background_image")}
	  
	  
	  />
	  
	  <CustomTextField
        name="project_url"
        placeholder="URL"
        label="URL"
        description={"Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens."}
        mandatory
	  
	  
	  />
	  <CustomTextField
        name="project_web_link"
        placeholder="Web link"
        label="Web link"
        mandatory
	  
	  
	  />
	  <CustomTextField
        name="project_twitter_link"
        placeholder="Twitter"
        label="Twitter"
        mandatory
	  
	  
	  />
	  <CustomTextField
        name="project_instagram_link"
        placeholder="Instagram"
        label="Instagram"
        mandatory
	  
	  
	  />
	  <CustomTextField
        name="project_discord_link"
        placeholder="Discord"
        label="Discord"
        mandatory
	  
	  />
	
    </>
  )
}


export default ProjectForm