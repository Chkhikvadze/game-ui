import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFromSection } from './modalStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import CustomTextField from "oldComponents/molecules/CustomTextField/CustomTextField";
import CustomSelectField from "oldComponents/atoms/CustomSelect";
import { collection_category_options } from "utils/constants";
import { useCollection } from "pages/Collection/Collections/useCollection";
import { AvatarIcon, ImageIcon } from "@radix-ui/react-icons";
import { StyledUploadImg, StyledUploadLogo } from "modals/CreateProjectModal";

type CreateProjectModalProps = {
  closeModal: () => void
}


const CreateCollectionModal = ({closeModal}: CreateProjectModalProps) => {
  const {
	formik,
	fileUploadType,
	handleChangeFile,
	onDeleteImg
  } = useCollection()
  
  const {banner_image, logo_image, cover_image, featured_image} = formik?.values
  
  
  return (
	<>
	  <StyledRoot>
		<FormikProvider value={formik}>
		  <Modal
			close={closeModal}
			header={"Create Collection"}
			footer={
			  <StyledActionsContainer>
				<StyledModalButtonLink style={{}} onClick={closeModal}>
				  Cancel
				</StyledModalButtonLink>
				
				<Button color="primary" onClick={formik.handleSubmit}>
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
				placeholder={'Upload Background image'}
				fileUploadType={fileUploadType}
				img={featured_image}
				label={'Background image'}
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
		  </Modal>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('create-collection-modal')(CreateCollectionModal)

// const StyledForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 24px;
//   grid-row-gap: 16px;
//   width: 600px;
// `

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
