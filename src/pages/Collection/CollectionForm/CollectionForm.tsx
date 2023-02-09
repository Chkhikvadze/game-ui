import React from 'react'

import { AvatarIcon, ImageIcon } from '@radix-ui/react-icons'

import { collection_category_options } from 'utils/constants'

// import { StyledUploadLogo } from 'modals/CreateProjectModal'

import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import styled from 'styled-components'
import FileUploadField from 'atoms/FileUploadField'

import Heading from '@l3-lib/ui-core/dist/Heading'

type CollectionFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  isEdit?: any
}

const CollectionForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  isEdit,
}: CollectionFormType) => {
  const { banner_image, logo_image, cover_image, featured_image } = formik?.values

  return (
    <>
      {!isEdit && (
        <>
          <CustomTextField name="collection_name" placeholder="Name" label="Name" mandatory />
          <CustomSelectField
            options={collection_category_options}
            name="collection_category"
            placeholder="Category"
            label="Category"
            mandatory
          />
        </>
      )}

      {isEdit && (
        <StyledSection>
          <StyledDiv>
            {/* <h2>Description</h2> */}
            <Heading type={Heading.types.h2} value="Description" />
            <CustomTextField
              name="collection_description"
              placeholder="Description"
              // label="Description"
              // mandatory
            />
          </StyledDiv>
          <StyledDiv>
            {/* <h2>Appearance</h2> */}
            <Heading type={Heading.types.h2} value="Appearance" />
            <StyledImgSection>
              <StyledUploadImg
                name={'logo_image'}
                onChange={(e: any) => handleChangeFile(e, 'logo_image')}
                placeholder={'Upload logo image'}
                fileUploadType={fileUploadType}
                img={logo_image}
                label={'Logo image'}
                description={'This image will also be used for navigation. 350 x 350 recommended.'}
                uploadIcon={<AvatarIcon style={{ width: 50, height: 50, color: '#fff' }} />}
                onDeleteImg={() => onDeleteImg('logo_image')}
              />

              <StyledUploadImg
                name={'cover_image'}
                onChange={(e: any) => handleChangeFile(e, 'cover_image')}
                placeholder={'Upload cover image'}
                fileUploadType={fileUploadType}
                img={cover_image}
                label={'Cover image'}
                description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
                uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
                onDeleteImg={() => onDeleteImg('cover_image')}
              />
              <StyledUploadImg
                name={'featured_image'}
                onChange={(e: any) => handleChangeFile(e, 'featured_image')}
                placeholder={'Upload featured image'}
                fileUploadType={fileUploadType}
                img={featured_image}
                label={'Featured image'}
                description={`This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.`}
                uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
                onDeleteImg={() => onDeleteImg('featured_image')}
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
                uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
                onDeleteImg={() => onDeleteImg('banner_image')}
              />
            </StyledImgSection>
          </StyledDiv>
          <StyledDiv>
            {/* <h2>Custom URL</h2> */}
            <Heading type={Heading.types.h2} value="Custom URL" />
            <CustomTextField
              name="collection_url"
              placeholder="URL"
              label="URL"
              description={
                'Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens.'
              }
              // mandatory
            />

            <CustomTextField
              name="collection_web_link"
              placeholder="Web link"
              label="Web link"
              // mandatory
            />
          </StyledDiv>
        </StyledSection>
      )}
    </>
  )
}

export default CollectionForm

export const StyledUploadImg = styled(FileUploadField)`
  width: 200px;
  height: 70px;
  border-radius: 5px;
`
export const StyledImgSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  align-items: flex-start;
`
export const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`
export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
