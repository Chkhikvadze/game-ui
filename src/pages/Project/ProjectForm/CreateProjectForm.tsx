import { AvatarIcon } from '@radix-ui/react-icons'
import { StyledUploadLogo } from 'modals/CreateProjectModal'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
// import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import { game_category_options } from 'utils/constants'

import TextFieldFormik from 'components/TextFieldFormik'

type CreateProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
}

const CreateProjectForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
}: CreateProjectFormType) => {
  const { logo_image } = formik?.values

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
        uploadIcon={<AvatarIcon style={{ width: 50, height: 50, color: '#fff' }} />}
        onDeleteImg={() => onDeleteImg('logo_image')}
      />

      {/* <TextField
        name="project_name"
        placeholder="Project Name"
        label="Project name"
        size="large"
        useField={useField}
      /> */}
      <TextFieldFormik
        field_name="project_name"
        placeholder="Enter project name"
        title="Create project"
      />
      <CustomSelectField
        options={game_category_options}
        name="project_category"
        placeholder="Project category"
        label="Project category"
        mandatory
      />
    </>
  )
}

export default CreateProjectForm
