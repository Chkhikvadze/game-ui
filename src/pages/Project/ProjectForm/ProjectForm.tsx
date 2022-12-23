import CreateProjectForm from './CreateProjectForm'
import EditProjectForm from './EditProjectForm'

type ProjectFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  isEdit?: boolean
}

const ProjectForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  isEdit,
}: ProjectFormType) => (
  <>
    {isEdit ? (
      <EditProjectForm
        formik={formik}
        handleChangeFile={handleChangeFile}
        onDeleteImg={onDeleteImg}
        fileUploadType={fileUploadType}
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
