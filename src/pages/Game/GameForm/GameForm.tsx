import EditGameForm from './EditGameForm'

type GameFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  isEdit?: boolean
  updateToggle?: (toggle: boolean, fieldName: string) => void
  closeModal?: any
  formHook?: any
  handleSubmit?: any
}

const GameForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  updateToggle,
}: GameFormType) => {
  return (
    <>
      <EditGameForm
        formik={formik}
        handleChangeFile={handleChangeFile}
        onDeleteImg={onDeleteImg}
        fileUploadType={fileUploadType}
        updateToggle={updateToggle}
      />
    </>
  )
}

export default GameForm
