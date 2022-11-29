import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFromSection } from './modalStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import { useProjects } from "pages/Project/Projects/useProjects";
import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import { game_category_options } from "utils/constants";
import FileUploadField from "atoms/FileUploadField";

import { AvatarIcon, ImageIcon } from '@radix-ui/react-icons'


type CreateProjectModalProps = {
  closeModal: () => void
}


const CreateProjectModal = ({closeModal}: CreateProjectModalProps) => {
  const {formik, handleChangeFile, fileUploadType, uploadProgress, generateLinkLoading, onDeleteImg} = useProjects()
  const isProgress = uploadProgress > 0 && uploadProgress <= 99.99
  
  const {banner_image, logo_image, background_image} = formik?.values
  console.log(formik?.values, 'formik?.values');
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <Modal
			close={closeModal}
			header={"Create Game"}
			footer={
			  <StyledActionsContainer>
				<StyledModalButtonLink style={{}} onClick={closeModal}>
				  Cancel
				</StyledModalButtonLink>
				
				<Button color="primary" onClick={formik.handleSubmit} disabled={isProgress && generateLinkLoading}>
				  Save
				</Button>
			  </StyledActionsContainer>
			}
		  >
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
				name="project_name"
				placeholder="Name"
				label="Name"
				mandatory
			  />
			  <CustomTextField
				name="project_description"
				placeholder="Description "
				label="Description"
				mandatory
			  />
			  
			  <CustomSelectField
				options={game_category_options}
				name="project_category"
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
			
			</StyledFromSection>
		  </Modal>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('create-project-modal')(CreateProjectModal)


export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`


export const StyledUploadLogo = styled(FileUploadField)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`


export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`