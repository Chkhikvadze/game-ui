import { useFormik } from 'formik'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useApiKeyByIdService, useUpdateApiKeyService } from 'services/useApiKeyService'

import { apiKeyValidation } from 'utils/validationsSchema'

import { useEffect } from 'react'

import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'

const useEditApiKey = (props: { id: string; refetchApiList: any }) => {
  const { t } = useTranslation()
  // const { id }: { id: string } = useParams()
  const { closeModal } = useModal()

  const { id, refetchApiList } = props

  const { data: apiKey, refetch: apiKeyRefetch } = useApiKeyByIdService({ id })

  const [updateApiKeyById] = useUpdateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()

  // const { __typename, ...apiKeyValue } = apiKey
  // console.log('apiKey', apiKey.projects)

  const defaultValues = {
    name: apiKey.name,
    note: apiKey.note,
    expiration: apiKey.expiration,
    projects: apiKey.projects,
  }

  const handleSubmit = async (values: any) => {
    const newValues = {
      name: values.name,
      note: values.note,
      expiration: values.expiration,
      projects: values.projects,
    }

    await updateApiKeyById(id, { ...newValues })

    setSnackbar({ message: t('api-key-updated'), variant: 'success' })

    refetchApiList()

    closeModal('edit-api-keys-modal')
  }

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: apiKeyValidation,
    onSubmit: async (values) => handleSubmit(values),
  })

  useEffect(() => {
    apiKeyRefetch()
  }, []) //eslint-disable-line

  return {
    formik,
  }
}

export default useEditApiKey
