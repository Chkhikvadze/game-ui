import { useFormik } from 'formik'
import useSnackbarAlert from 'hooks/useSnackbar'

import { useApiKeyByIdService, useUpdateApiKeyService } from 'services/useApiKeyService'

import { apiKeyValidation } from 'utils/validationsSchema'

import { useEffect } from 'react'

import { useModal } from 'hooks'

const useEditApiKey = (props: { id: string; refetchApiList: any }) => {
  // const { id }: { id: string } = useParams()
  const { closeModal } = useModal()

  const { id, refetchApiList } = props

  const { data: apiKey, refetch: apiKeyRefetch } = useApiKeyByIdService({ id })

  const [updateApiKey] = useUpdateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()

  const { __typename, ...apiKeyValue } = apiKey

  const handleSubmit = async (values: any) => {
    const newValues = {
      ...values,
      name: values.name,
      note: values.note,
      expiration: values.expiration,
    }

    await updateApiKey({
      variables: {
        id,
        input: { ...newValues },
      },
    })

    setSnackbar({ message: 'API Key updated', variant: 'success' })

    refetchApiList()

    closeModal('edit-api-keys-modal')
  }

  const formik = useFormik({
    initialValues: apiKeyValue,
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
