import CreateProjectForm from './CreateProjectForm'
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
  isEdit,
  updateToggle,
  closeModal,
  formHook,
  handleSubmit,
}: ProjectFormType) => (
  <>
    {isEdit ? (
      <EditProjectForm
        formik={formik}
        handleChangeFile={handleChangeFile}
        onDeleteImg={onDeleteImg}
        fileUploadType={fileUploadType}
        updateToggle={updateToggle}
      />
    ) : (
      <CreateProjectForm closeModal={closeModal} formHook={formHook} handleSubmit={handleSubmit} />
    )}
  </>
)

export default ProjectForm
