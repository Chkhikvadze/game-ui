import CreateProjectForm from './CreateProjectForm'
import EditProjectForm from './EditProjectForm'

type ProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  isEdit?: boolean
  updateToggle?: (toggle: boolean, fieldName: string) => void
}

const ProjectForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  isEdit,
  updateToggle,
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
      <CreateProjectForm
        formik={formik}
        handleChangeFile={handleChangeFile}
        onDeleteImg={onDeleteImg}
        fileUploadType={fileUploadType}
      />
    )}
  </>
)

export default ProjectForm
