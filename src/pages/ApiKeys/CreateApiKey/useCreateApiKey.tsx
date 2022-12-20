import { useState } from 'react'
import { useFormik } from 'formik'
import { useCreateApiKeyService, useApiKeysService } from 'services/useApiKeyService'
import { useProjectsService } from 'services/useProjectService'

import { apiKeyValidation } from 'utils/validationsSchema'

import useSnackbarAlert from 'hooks/useSnackbar'

// import { useHistory } from 'react-router-dom'

import { useModal } from 'hooks'

const initialValues = {
  name: '',
  note: '',
  exiration: '',
  projects: '',
}

const useCreateApiKey = () => {
  const [page] = useState(1)
  const { closeModal, openModal } = useModal()

  const { refetch: apiKeyRefetch } = useApiKeysService({ page, limit: 30, search_text: '' })
  const [createApiKeyService] = useCreateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()
  // const { push } = useHistory()

  const { data: projectsData } = useProjectsService({
    page: 1,
    limit: 100,
    search_text: '',
  })

  // console.log('projectsData', projectsData)

  const projectsOptions = projectsData?.items?.map((item: any) => ({
    value: item.id,
    label: item.name,
  }))

  const handleSubmit = async (values: any) => {
    const newValues = {
      name: values.name,
      note: values.note,
      expiration: values.expiration,
      projects: values.projects,
    }
    const res = await createApiKeyService(newValues, () => {})

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
      apiKeyRefetch()
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
    projectsOptions,
  }
}

export default useCreateApiKey
