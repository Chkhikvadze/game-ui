import EditProjectForm from './EditProjectForm'

type ProjectFormType = {
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

const ProjectForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  updateToggle,
}: ProjectFormType) => {
  return (
    <>
      <EditProjectForm
        formik={formik}
        handleChangeFile={handleChangeFile}
        onDeleteImg={onDeleteImg}
        fileUploadType={fileUploadType}
        updateToggle={updateToggle}
      />
    </>
  )
}

export default ProjectForm
