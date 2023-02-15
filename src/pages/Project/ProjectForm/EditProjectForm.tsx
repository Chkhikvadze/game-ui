import { AvatarIcon, ImageIcon } from '@radix-ui/react-icons'
import TextFieldCustom from 'components/TextFieldFormik/TextFieldFormik'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import {
  StyledMiniSection,
  StyledImgSection,
  StyledSection,
  StyledUploadImg,
} from 'pages/Collection/CollectionForm/CollectionForm'

type EditProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
}

const EditProjectForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
}: EditProjectFormType) => {
  const { banner_image, logo_image, background_image } = formik?.values

  return (
    <>
      <StyledSection>
        <StyledMiniSection>
          <h2>Description</h2>
          <TextFieldCustom field_name="project_description" />
          {/* <CustomTextField
            name="project_description"
            placeholder="Project description"
            // label="Project description"
            // mandatory
          /> */}
        </StyledMiniSection>
        <StyledMiniSection>
          <h2>Appearance</h2>
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
          </StyledImgSection>
        </StyledMiniSection>
        <StyledMiniSection>
          <h2>Custom URL</h2>
          <CustomTextField
            name="project_url"
            placeholder="URL"
            label="URL"
            description={
              'Customize your URL on L3vels. Must only contain lowercase letters, numbers, and hyphens.'
            }
            // mandatory
          />
          <CustomTextField
            name="project_web_link"
            placeholder="Web link"
            label="Web link"
            // mandatory
          />
          <CustomTextField
            name="project_twitter_link"
            placeholder="Twitter"
            label="Twitter"
            // mandatory
          />
          <CustomTextField
            name="project_instagram_link"
            placeholder="Instagram"
            label="Instagram"
            // mandatory
          />
          <CustomTextField
            name="project_discord_link"
            placeholder="Discord"
            label="Discord"
            // mandatory
          />
        </StyledMiniSection>
      </StyledSection>
    </>
  )
}

export default EditProjectForm
