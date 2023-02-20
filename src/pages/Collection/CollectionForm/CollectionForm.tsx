import React, { useRef, useState } from 'react'

// import { AvatarIcon, ImageIcon } from '@radix-ui/react-icons'

import { collection_category_options } from 'utils/constants'

// import { StyledUploadLogo } from 'modals/CreateProjectModal'

import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import styled from 'styled-components'
import FileUploadField from 'atoms/FileUploadField'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'

// import Button from '@l3-lib/ui-core/dist/Button'

import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import Card from './Card'
import DropDownFormik from 'components/DropDownFormik'

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
  // onDeleteImg,
  // fileUploadType,
  isEdit,
}: CollectionFormType) => {
  const { banner_image, cover_image, featured_image } = formik?.values

  const [isHidden, setIsHidden] = useState(true)

  const coverImageRef = useRef(null as any)
  const featureImageRef = useRef(null as any)
  const bannerImageRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  return (
    <>
      {!isEdit && (
        <>
          <CustomTextField name='collection_name' placeholder='Name' label='Name' mandatory />
          <CustomSelectField
            options={collection_category_options}
            name='collection_category'
            placeholder='Category'
            label='Category'
            mandatory
          />
        </>
      )}

      {isEdit && (
        <StyledSection>
          <StyledMiniSection>
            <StyledTextWrapper>
              <Heading type={Heading.types.h2} value='Category' />
            </StyledTextWrapper>
            <DropDownFormik
              options={collection_category_options}
              name='collection_category'
              placeholder='Category'
              title='Category'
              kind='primary'
            />
          </StyledMiniSection>

          <StyledMiniSection>
            <StyledTextWrapper>
              <Heading type={Heading.types.h2} value='Contract' />
              <Typography
                value='select the contract'
                type={Typography.types.P}
                size={Typography.sizes.lg}
                as={'p'}
                customColor={'rgba(255, 255, 255, 0.6)'}
              />
            </StyledTextWrapper>
            <Dropdown
              placeholder='LABEL'
              size={Dropdown.size.MEDIUM}
              // className="dropdown-stories-styles_spacing"
            />
          </StyledMiniSection>

          <StyledMiniSection>
            <StyledTextWrapper>
              <Heading type={Heading.types.h2} value='Appearance' />
              <Typography
                value='Customize the look and feel of your collection with any sort of media, we support
              video, images and gif.'
                type={Typography.types.P}
                size={Typography.sizes.lg}
                as={'p'}
                customColor={'rgba(255, 255, 255, 0.6)'}
              />
            </StyledTextWrapper>

            <StyledCardSection>
              <StyledCardWrapper>
                <Card
                  title='Cover Image'
                  description='Customize the look and feel of your collection with any sort of media, we support video, images and gif.'
                  onButtonClick={() => onButtonClick(coverImageRef)}
                  image={cover_image}
                  defaultImage={'https://cdn.wallpapersafari.com/1/23/pQAUd0.jpg'}
                />
                <input
                  type='file'
                  ref={coverImageRef}
                  style={{ display: 'none' }}
                  onChange={(e: unknown) => handleChangeFile(e, 'cover_image')}
                />
              </StyledCardWrapper>

              <StyledCardColumn>
                <StyledCardWrapper small>
                  <Card
                    title='Feature Image'
                    description='Use for external marketplaces, or similar '
                    onButtonClick={() => onButtonClick(featureImageRef)}
                    image={featured_image}
                    defaultImage={
                      'https://assets-prd.ignimgs.com/2022/07/15/elden-ring-1656078106921-1657891943578.jpg'
                    }
                  />
                  <input
                    type='file'
                    ref={featureImageRef}
                    style={{ display: 'none' }}
                    onChange={(e: unknown) => handleChangeFile(e, 'featured_image')}
                  />
                </StyledCardWrapper>

                <StyledCardWrapper small>
                  <Card
                    title='Banner Image'
                    // description="Use for external marketplaces, or similar "
                    onButtonClick={() => onButtonClick(bannerImageRef)}
                    image={banner_image}
                    defaultImage={
                      'https://www.trueachievements.com/imgs/110229/monster-hunter-world-fatalis.jpg'
                    }
                  />
                  <input
                    type='file'
                    ref={bannerImageRef}
                    style={{ display: 'none' }}
                    onChange={(e: unknown) => handleChangeFile(e, 'banner_image')}
                  />
                </StyledCardWrapper>
              </StyledCardColumn>
            </StyledCardSection>
            {/* <StyledImgSection>
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
            </StyledImgSection> */}
          </StyledMiniSection>

          <StyledMiniSection>
            <StyledDiv>
              <StyledTextWrapper>
                <Heading type={Heading.types.h2} value='Custom social links' />
                <Typography
                  value='Add custom social URLs to let your players find and discover specific communities, content and more. '
                  type={Typography.types.P}
                  size={Typography.sizes.lg}
                  as={'p'}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </StyledTextWrapper>
              <StyledToggleWrapper>
                <Toggle />
              </StyledToggleWrapper>
            </StyledDiv>
            <StyledDiv>
              <StyledTextWrapper>
                <Heading type={Heading.types.h2} value='Custom URL' />
                <Typography
                  value='Add custom URLs and any other relevant links related to the collection'
                  type={Typography.types.P}
                  size={Typography.sizes.lg}
                  as={'p'}
                  customColor={'rgba(255, 255, 255, 0.6)'}
                />
              </StyledTextWrapper>
              <StyledToggleWrapper>
                <Toggle
                  isDefaultSelected={false}
                  onChange={() => {
                    setIsHidden(!isHidden)
                  }}
                />
              </StyledToggleWrapper>
              <StyledUrlWrapper hidden={isHidden}>
                <FormikTextField field_name='collection_url' placeholder='URL' title='URL' />
                <FormikTextField
                  field_name='collection_web_link'
                  placeholder='Web link'
                  title='Web link'
                />
              </StyledUrlWrapper>
            </StyledDiv>
          </StyledMiniSection>

          <StyledMiniSection>
            <Heading type={Heading.types.h2} value='Description' />
            <TextareaFormik
              field_name='collection_description'
              placeholder='Description'
              title='Description'
            />
          </StyledMiniSection>
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
  gap: 80px;
`
export const StyledMiniSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`

const StyledUrlWrapper = styled.div<{ hidden?: boolean }>`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  gap: 10px;
`
const StyledToggleWrapper = styled.div`
  width: fit-content;
`

const StyledCardSection = styled.div`
  display: flex;
  gap: 30px;
`
const StyledCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledCardWrapper = styled.div<{ small?: boolean }>`
  width: ${p => (p.small ? '300px' : '650px')};
  height: ${p => (p.small ? '200px' : '450px')};
`
