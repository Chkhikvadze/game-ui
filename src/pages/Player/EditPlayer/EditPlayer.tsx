import useEditPlayer from './useEditPlayer'
import PlayerForm from '../PlayerForm'

import { FormikProvider } from 'formik'
import Button from 'oldComponents/atoms/Button'
import { StyledFormSection } from 'modals/modalStyle'

const EditPlayer = () => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType } = useEditPlayer()

  return (
    <FormikProvider value={formik}>
      <StyledFormSection>
        <PlayerForm
          formik={formik}
          handleChangeFile={handleChangeFile}
          onDeleteImg={onDeleteImg}
          fileUploadType={fileUploadType}
        />
        <Button color="primary" onClick={formik.handleSubmit}>
          Save
        </Button>
      </StyledFormSection>
    </FormikProvider>
  )
}
export default EditPlayer
