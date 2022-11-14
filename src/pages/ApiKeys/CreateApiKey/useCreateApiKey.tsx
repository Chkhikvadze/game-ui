import { useState } from 'react'
import { useFormik } from 'formik'
import { useCreateApiKeyService } from 'services/useApiKeyService'

import { apiKeyValidation } from 'utils/validationsSchema'

import { useApiKeysService } from 'services/useApiKeyService'

import useSnackbarAlert from 'hooks/useSnackbar'

// import { useHistory } from 'react-router-dom'

import { useModal } from 'hooks'

const initialValues = {
  name: '',
  note: '',
  exiration: '',
}

const useCreateApiKey = () => {
  const [page] = useState(0)
  const { closeModal, openModal } = useModal()

  const { refetch: apiKeyRefetch } = useApiKeysService({ page, limit: 30, search_text: '' })
  const [createApiKeyService] = useCreateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()
  // const { push } = useHistory()

  const handleSubmit = async (values: any) => {
    const newValues = {
      name: values.name,
      note: values.note,
      expiration: values.expiration,
    }
    const res = await createApiKeyService(newValues, () => {})
    apiKeyRefetch()

    if (!res) {
      setSnackbar({ message: 'Failed to Add new API Key', variant: 'error' })
      closeModal('add-api-keys-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: 'New API key was created',
        variant: 'success',
      })

      const tokenValue = res.apiKey.token
      openModal({ name: 'add-api-keys-modal', data: { token: tokenValue } })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: apiKeyValidation,
    onSubmit: async (values) => handleSubmit(values),
  })

  return {
    formik,
  }
}

export default useCreateApiKey
