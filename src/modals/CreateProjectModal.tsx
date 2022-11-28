import React, { useEffect, useState } from 'react'
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
import LoaderProgress from "atoms/Loaders/LoaderProgress";

type CreateProjectModalProps = {
  closeModal: () => void
}


const CreateProjectModal = ({closeModal}: CreateProjectModalProps) => {
  const {formik, handleChangeFile, fileUploadType, uploadProgress, generateLinkLoading} = useProjects()
  const isProgress = uploadProgress > 0 && uploadProgress <= 99.99
  
  const {banner_image, logo_image, background_image} = formik?.values
  console.log(fileUploadType, 'fileUploadType');
  
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
			  <CustomTextField
				name="project_name"
				placeholder="Name"
				label="Name"
				mandatory
			  />
			  <CustomSelectField
				options={game_category_options}
				name="project_category"
				placeholder="Category"
				label="Category"
				mandatory
			  />
			  <CustomTextField
				name="project_description"
				placeholder="Description "
				label="Description"
				mandatory
			  />
			  
			  <div>
				<p>Banner image</p>
				<input
				  type={'file'}
				  name={'banner_image'}
				  placeholder={'Upload banner image'}
				  onChange={(e: any) => handleChangeFile(e, 'banner_image')}
				/>
				
				<div>
				  {banner_image ? <img style={{width:200, height:150}} src={banner_image}
									   alt={''}/>: fileUploadType === 'banner_image' ? <LoaderProgress/>: null}
				</div>
			  
			  </div>
			  
			  <div>
				<p>Logo image</p>
				<input
				  type={'file'}
				  name={'logo_image'}
				  placeholder={'Upload logo image'}
				  onChange={(e: any) => handleChangeFile(e, 'logo_image')}
				/>
				<div>
				  {logo_image ? <img style={{width:200, height:150}} src={logo_image}
									 alt={''}/>: fileUploadType === 'logo_image' ? <LoaderProgress/>: null}
				</div>
			  </div>
			  
			  <div>
				<p>Background image</p>
				<input
				  type={'file'}
				  name={'background_image'}
				  placeholder={'Upload background image'}
				  onChange={(e: any) => handleChangeFile(e, 'background_image')}
				/>
				
				<div>
				  {background_image ? <img style={{width:200, height:150}} src={background_image}
										   alt={''}/>: fileUploadType === 'background_image' ? <LoaderProgress/>: null}
				</div>
			  </div>
			
			</StyledFromSection>
		  </Modal>
		</FormikProvider>
	  </StyledRoot>
	</>
  )
}

export default withRenderModal('create-project-modal')(CreateProjectModal)

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
