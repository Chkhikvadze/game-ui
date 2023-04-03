import { useState } from 'react'
import { useFormik } from 'formik'
import { useCreateApiKeyService, useApiKeysService } from 'services/useApiKeyService'
import { useProjectsService } from 'services/useProjectService'

import { apiKeyValidation } from 'utils/validationsSchema'

import useSnackbarAlert from 'hooks/useSnackbar'

// import { useHistory } from 'react-router-dom'

import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'

const initialValues = {
  name: '',
  note: '',
  expiration: null,
  projects: '',
}

const useCreateApiKey = () => {
  const { t } = useTranslation()
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
    console.log('newValue', newValues)
    const res = await createApiKeyService(newValues, () => {})

    if (!res) {
      setSnackbar({ message: t('failed-to-add-new-api-key'), variant: 'error' })
      closeModal('add-api-keys-modal')
      return
    }

    if (res) {
      setSnackbar({
        message: t('new-api-key-was-created'),
        variant: 'success',
      })
      apiKeyRefetch()
      closeModal('add-api-keys-modal')
      const tokenValue = res.apiKey.token
      openModal({ name: 'show-api-key-modal', data: { token: tokenValue } })
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: apiKeyValidation,
    onSubmit: async values => handleSubmit(values),
  })

  return {
    formik,
    projectsOptions,
  }
}

export default useCreateApiKey
