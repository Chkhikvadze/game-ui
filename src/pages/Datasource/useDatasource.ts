import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import { useModal } from 'hooks'
import { useContext, useState } from 'react'
import { useCreateDatasourceService } from 'services/datasource/useCreateDatasourceService'
import { useDatasourcesService } from 'services/datasource/useDatasourcesService'

export const useDatasource = () => {
  const { setToast } = useContext(ToastContext)

  const [createDatasource] = useCreateDatasourceService()
  const { data: datasources, refetch: refetchDatasources } = useDatasourcesService()

  const [isLoading, setIsLoading] = useState(false)

  const { openModal, closeModal } = useModal()

  const openDatasourceModal = () => {
    openModal({ name: 'create-datasource-modal' })
  }

  const closeDatasourceModal = () => {
    closeModal('create-datasource-modal')
  }

  const initialValues = {
    datasource_name: '',
    datasource_description: '',
    datasource_source_type: '',
  }

  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const agentInput = {
        name: values.datasource_name,
        description: values.datasource_description,
        source_type: values.datasource_source_type,
      }
      await createDatasource(agentInput)
      await refetchDatasources()
      setToast({
        message: 'New Agent was Created!',
        type: 'positive',
        open: true,
      })
      closeDatasourceModal()
    } catch (e) {
      console.log('rrorr', e)
      closeDatasourceModal()

      setToast({
        message: 'Failed to create Agent!',
        type: 'negative',
        open: true,
      })
    }
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async values => handleSubmit(values),
    // validationSchema: gameValidationSchema,
    // enableReinitialize: true,
  })

  return {
    datasources,
    openDatasourceModal,
    closeDatasourceModal,
    handleSubmit,
    formik,
    isLoading,
  }
}
