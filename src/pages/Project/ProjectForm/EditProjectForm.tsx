import {
  StyledMiniSection,
  StyledSection,
  StyledTextWrapper,
  StyledToggleWrapper,
  StyledUrlWrapper,
  StyledCardSection,
  StyledCardWrapper,
  StyledCardColumn,
} from 'pages/Collection/CollectionForm/CollectionForm'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Card from '@l3-lib/ui-core/dist/Card'

import TextareaFormik from 'components/TextareaFormik'
import { useRef, useState } from 'react'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import DropDownFormik from 'components/DropDownFormik'
import { game_category_options } from 'utils/constants'

type EditProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
}

const EditProjectForm = ({
  formik,
  handleChangeFile,
}: // onDeleteImg,
// fileUploadType,
EditProjectFormType) => {
  const { banner_image, background_image } = formik?.values

  const [hideCustomUrl, setHideCustomUrl] = useState(true)
  const [hideSocialLink, setHideSocialLink] = useState(true)

  const bannerImageRef = useRef(null as any)
  const backgroundImageRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  return (
    <>
      <StyledSection>
        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading type={Heading.types.h1} size='medium' customColor={'#FFF'} value='Category' />
          </StyledTextWrapper>
          <DropDownFormik
            options={game_category_options}
            name='project_category'
            placeholder='Category'
            title='Category'
            kind='primary'
          />
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              size='medium'
              customColor={'#FFF'}
              value='Appearance'
            />
            {/* <Typography
                value='Customize the look and feel of your collection with any sort of media, we support
              video, images and gif.'
                type={Typography.types.P}
                size={Typography.sizes.lg}
                as={'p'}
                customColor={'rgba(255, 255, 255, 0.6)'}
              /> */}
          </StyledTextWrapper>

          <StyledCardSection>
            <StyledCardWrapper>
              <Card
                title='Background Image'
                // description='Customize the look and feel of your collection with any sort of media, we support video, images and gif.'
                onButtonClick={() => onButtonClick(bannerImageRef)}
                image={background_image}
                defaultImage={'https://cdn.wallpapersafari.com/1/23/pQAUd0.jpg'}
                hasButton={true}
                textColor='rgba(255, 255, 255, 0.6)'
              />
              <input
                type='file'
                ref={backgroundImageRef}
                style={{ display: 'none' }}
                onChange={(e: unknown) => handleChangeFile(e, 'background_image')}
              />
            </StyledCardWrapper>

            <StyledCardColumn>
              <StyledCardWrapper small>
                <Card
                  title='Banner Image'
                  // description='Customize the look and feel of your collection with any sort of media, we support video, images and gif.'
                  onButtonClick={() => onButtonClick(bannerImageRef)}
                  image={banner_image}
                  defaultImage={'https://cdn.wallpapersafari.com/1/23/pQAUd0.jpg'}
                  hasButton={true}
                  textColor='rgba(255, 255, 255, 0.6)'
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

            <StyledUploadImg
              name={'background_image'}
              onChange={(e: any) => handleChangeFile(e, 'background_image')}
              placeholder={'Upload Background image'}
              fileUploadType={fileUploadType}
              img={background_image}
              label={'Background image'}
              description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
              uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
              onDeleteImg={() => onDeleteImg('background_image')}
            />
          </StyledImgSection> */}
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              size='medium'
              customColor={'#FFF'}
              value='Custom URL'
            />
            <Typography
              value='Add custom URLs and any other relevant links related to the game'
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
                setHideCustomUrl(!hideCustomUrl)
              }}
            />
          </StyledToggleWrapper>

          <StyledUrlWrapper hidden={hideCustomUrl}>
            <FormikTextField field_name='project_url' placeholder='URL' title='URL' />
            <FormikTextField
              field_name='project_web_link'
              placeholder='Web link'
              title='Web link'
            />

            {/* <CustomTextField
              name='project_url'
              placeholder='URL'
              label='URL'
              description={
                'Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens.'
              }
              // mandatory
            /> */}
          </StyledUrlWrapper>
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              size='medium'
              customColor={'#FFF'}
              value='Social Link'
            />
          </StyledTextWrapper>

          <StyledToggleWrapper>
            <Toggle
              isDefaultSelected={false}
              onChange={() => {
                setHideSocialLink(!hideSocialLink)
              }}
            />
          </StyledToggleWrapper>

          <StyledUrlWrapper hidden={hideSocialLink}>
            <FormikTextField
              field_name='project_twitter_link'
              placeholder='Twitter'
              title='Twitter'
            />
            <FormikTextField
              field_name='project_instagram_link'
              placeholder='Instagram'
              title='Instagram'
            />
            <FormikTextField
              field_name='project_discord_link'
              placeholder='Discord'
              title='Discord'
            />
          </StyledUrlWrapper>
        </StyledMiniSection>

        <StyledMiniSection>
          <Heading type={Heading.types.h1} size='medium' customColor={'#FFF'} value='Description' />
          <TextareaFormik
            field_name='project_description'
            placeholder='Description'
            title='Description'
          />
        </StyledMiniSection>

        <StyledMiniSection>
          <Heading
            type={Heading.types.h1}
            size='medium'
            customColor={'#FFF'}
            value='Contact Info'
          />
          <FormikTextField
            field_name='project_contact_phone'
            placeholder='Contact Phone'
            title='Phone'
          />
          <FormikTextField
            field_name='project_contact_email'
            placeholder='Contact Email'
            title='Email'
          />
        </StyledMiniSection>
      </StyledSection>
    </>
  )
}

export default EditProjectForm
