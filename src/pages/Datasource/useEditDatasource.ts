import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useUpdateDatasourceService } from 'services/datasource/useUpdateDatasourceService'

export const useEditDatasource = (datasource: any) => {
  //   const { refetchAgents } = useAgents()

  const { closeModal } = useModal()
  const { setToast, toast } = useContext(ToastContext)

  const [isLoading, setIsLoading] = useState(false)

  const [updateDatasource] = useUpdateDatasourceService()

  const { id, name, description, source_type } = datasource

  const defaultValues = {
    datasource_name: name,
    datasource_description: description,
    datasource_source_type: source_type,
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)

    const updatedValues = {
      name: values.datasource_name,
      description: values.datasource_description,
      source_type: values.datasource_source_type,
    }
    console.log('updatedValues', updatedValues)

    await updateDatasource(id, {
      ...updatedValues,
    })
    // await refetchAgents()

    closeModal('edit-datasource-modal')

    setToast({
      message: 'Datasource was updated!',
      type: 'positive',
      open: true,
    })

    setIsLoading(false)
  }

  const closeEditDatasourceModal = () => {
    closeModal('edit-datasource-modal')
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    closeEditDatasourceModal,
    handleSubmit,
    toast,
    setToast,
    isLoading,
  }
}
