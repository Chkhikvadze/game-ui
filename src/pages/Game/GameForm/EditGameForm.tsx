import { useRef } from 'react'
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
import Button from '@l3-lib/ui-core/dist/Button'

import TextareaFormik from 'components/TextareaFormik'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import DropDownFormik from 'components/DropDownFormik'
import { GAME_CATEGORY_OPTIONS } from 'utils/constants'
import { useEditGame } from '../EditGame/useEditGame'
import styled from 'styled-components'

type EditGameFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  updateToggle?: (toggle: boolean, fieldName: string) => void
}

const EditGameForm = ({
  formik,
  handleChangeFile,
  updateToggle,
}: // onDeleteImg,
// fileUploadType,
EditGameFormType) => {
  const { banner_image, background_image, game_is_url, game_is_social, game_is_contact } =
    formik?.values

  const { handleDeleteGame } = useEditGame()

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
            options={GAME_CATEGORY_OPTIONS}
            name='game_category'
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
            <Heading type={Heading.types.h1} size='medium' customColor={'#FFF'} value='URL' />
            <Typography
              value='Add URLs and any other relevant links related to the game'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              as={'p'}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper>

          <StyledToggleWrapper>
            <Toggle
              isSelected={game_is_url}
              onChange={() => {
                if (updateToggle) {
                  updateToggle(!game_is_url, 'is_url')
                }
              }}
            />
          </StyledToggleWrapper>

          <StyledUrlWrapper hidden={!game_is_url}>
            <FormikTextField field_name='game_url' placeholder='URL' title='URL' />
            <FormikTextField field_name='game_web_link' placeholder='Web link' title='Web link' />

            {/* <CustomTextField
              name='game_url'
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
            <Typography
              value='Add Social Links to the game'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              as={'p'}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper>

          <StyledToggleWrapper>
            <Toggle
              isSelected={game_is_social}
              onChange={() => {
                if (updateToggle) {
                  updateToggle(!game_is_social, 'is_social')
                }
              }}
            />
          </StyledToggleWrapper>

          <StyledUrlWrapper hidden={!game_is_social}>
            <FormikTextField field_name='game_twitter_link' placeholder='Twitter' title='Twitter' />
            <FormikTextField
              field_name='game_instagram_link'
              placeholder='Instagram'
              title='Instagram'
            />
            <FormikTextField field_name='game_discord_link' placeholder='Discord' title='Discord' />
          </StyledUrlWrapper>
        </StyledMiniSection>

        <StyledMiniSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              size='medium'
              customColor={'#FFF'}
              value='Contact Info'
            />
            <Typography
              value='Add contact information'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              as={'p'}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledTextWrapper>
          <StyledToggleWrapper>
            <Toggle
              isSelected={game_is_contact}
              onChange={() => {
                if (updateToggle) {
                  updateToggle(!game_is_contact, 'is_contact')
                }
              }}
            />
          </StyledToggleWrapper>
          <StyledUrlWrapper hidden={!game_is_contact}>
            <FormikTextField
              field_name='game_contact_phone'
              placeholder='Contact Phone'
              title='Phone'
            />
            <FormikTextField
              field_name='game_contact_email'
              placeholder='Contact Email'
              title='Email'
            />
          </StyledUrlWrapper>
        </StyledMiniSection>

        <StyledDescriptionWrapper>
          <Heading type={Heading.types.h1} size='medium' customColor={'#FFF'} value='Description' />
          <TextareaFormik
            field_name='game_description'
            placeholder='Description'
            title='Description'
          />
        </StyledDescriptionWrapper>

        {/* <div>
          <Button onClick={handleDeleteGame} kind={Button.kinds.SECONDARY}>
            Delete Game
          </Button>
        </div> */}
      </StyledSection>
    </>
  )
}

export default EditGameForm

export const StyledDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
