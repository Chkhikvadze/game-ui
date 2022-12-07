import useEditPlayer from './useEditPlayer'
import PlayerForm from '../PlayerForm'
import { StyledFromSection } from 'styles/globalStyle.css'
import { FormikProvider } from 'formik'
import Button from 'oldComponents/atoms/Button'

const EditPlayer = () => {
  const { formik } = useEditPlayer()

  return (
    <FormikProvider value={formik}>
      <StyledFromSection>
        <PlayerForm useHook={useEditPlayer} />
        <Button color="primary" onClick={formik.handleSubmit}>
          Save
        </Button>
      </StyledFromSection>
    </FormikProvider>
  )
}
export default EditPlayer
