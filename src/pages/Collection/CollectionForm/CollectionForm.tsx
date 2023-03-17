import { useRef, useState } from 'react'

// import { AvatarIcon, ImageIcon } from '@radix-ui/react-icons'

// import { collection_category_options } from 'utils/constants'

// import { StyledUploadLogo } from 'modals/CreateProjectModal'

// import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
// import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import styled from 'styled-components'
import FileUploadField from 'atoms/FileUploadField'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Dropdown from '@l3-lib/ui-core/dist/Dropdown'
import Card from '@l3-lib/ui-core/dist/Card'

// import Button from '@l3-lib/ui-core/dist/Button'

import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import CollectionCard from './CollectionCard'
import { StyledPseudoTextarea, StyledStoryWrapper } from 'pages/Project/EditProject/Appearance'
// import Card from './Card'
// import DropDownFormik from 'components/DropDownFormik'
// import { StyledDescriptionWrapper } from 'pages/Project/ProjectForm/EditProjectForm'

type CollectionFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
}

const CollectionForm = ({ formik, handleChangeFile }: CollectionFormType) => {
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
      <StyledSection>
        {/* <StyledMiniSection>
          <StyledTextWrapper>
            <Heading type={Heading.types.h1} value='Category' size='medium' customColor={'#fff'} />
          </StyledTextWrapper>
          <DropDownFormik
            options={collection_category_options}
            name='collection_category'
            placeholder='Category'
            title='Category'
            kind='primary'
          />
        </StyledMiniSection> */}

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading type={Heading.types.h1} value='Contract' size='medium' customColor={'#fff'} />
            <Typography
              value='select the contract'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              as={'p'}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper>
          <Dropdown placeholder='Label' size={Dropdown.size.MEDIUM} />
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              value='Appearance'
              size='medium'
              customColor={'#fff'}
            />
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
            <CollectionCard
              title={'Cover Image'}
              onClick={() => onButtonClick(coverImageRef)}
              image={cover_image}
              defaultImage={'https://cdn.wallpapersafari.com/1/23/pQAUd0.jpg'}
              description={`Customize the look and feel of your collection with any sort of media, we support video, images and gif.`}
              inputRef={coverImageRef}
              onChange={(e: unknown) => handleChangeFile(e, 'cover_image')}
            />

            <StyledCardColumn>
              <CollectionCard
                title={'Feature Image'}
                onClick={() => onButtonClick(featureImageRef)}
                image={featured_image}
                defaultImage={
                  'https://assets-prd.ignimgs.com/2022/07/15/elden-ring-1656078106921-1657891943578.jpg'
                }
                description={`Use for external marketplaces, or similar`}
                inputRef={featureImageRef}
                onChange={(e: unknown) => handleChangeFile(e, 'featured_image')}
                small={true}
              />

              <CollectionCard
                title={'Banner Image'}
                onClick={() => onButtonClick(bannerImageRef)}
                image={banner_image}
                defaultImage={
                  'https://www.trueachievements.com/imgs/110229/monster-hunter-world-fatalis.jpg'
                }
                inputRef={bannerImageRef}
                onChange={(e: unknown) => handleChangeFile(e, 'banner_image')}
                small={true}
              />
            </StyledCardColumn>
          </StyledCardSection>
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledDiv>
            <StyledTextWrapper>
              <Heading
                type={Heading.types.h1}
                value='Custom social links'
                size='medium'
                customColor={'#fff'}
              />
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
              <Heading
                type={Heading.types.h1}
                value='Custom URL'
                size='medium'
                customColor={'#fff'}
              />
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

        {/* <StyledDescriptionWrapper>
          <Heading type={Heading.types.h1} value='Description' size='medium' customColor={'#fff'} />
          <TextareaFormik
            field_name='collection_description'
            placeholder='Description'
            title='Description'
          />
        </StyledDescriptionWrapper> */}

        <StyledStoryWrapper>
          <StyledTextWrapper>
            <Heading type={Heading.types.h1} value='Story' size='medium' customColor={'#fff'} />
            <Typography
              value='Time to start brainstorming and bringing your epic stories to life'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper>
          {/* <TextareaFormik
            field_name='collection_description'
            placeholder='Description'
            title='Description'
          /> */}
          <StyledPseudoTextarea>
            <Typography
              value={`Description`}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'rgb(255, 255, 255)'}
            />
          </StyledPseudoTextarea>
        </StyledStoryWrapper>
      </StyledSection>
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
  gap: 40px;
`
export const StyledMiniSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`

export const StyledUrlWrapper = styled.div<{ hidden?: boolean }>`
  display: ${props => (props.hidden ? 'none' : 'flex')};
  flex-direction: column;
  gap: 30px;
`
export const StyledToggleWrapper = styled.div`
  width: fit-content;
`

export const StyledCardSection = styled.div`
  display: flex;
  gap: 30px;
`
export const StyledCardColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const StyledCardWrapper = styled.div<{ small?: boolean }>`
  width: ${p => (p.small ? '300px' : '650px')};
  height: ${p => (p.small ? '200px' : '450px')};
`
