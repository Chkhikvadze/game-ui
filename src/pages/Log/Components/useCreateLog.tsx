import { useState } from 'react'
import { useFormik } from 'formik'
import { useCreateApiKeyService, useApiKeysService } from 'services/useApiKeyService'
import { useProjectsService } from 'services/useProjectService'

import { apiKeyValidation } from 'utils/validationsSchema'

import useSnackbarAlert from 'hooks/useSnackbar'
import { useModal } from 'hooks'

import { useTranslation } from 'react-i18next'

const initialValues = {
  name: '',
  note: '',
  expiration: null,
  projects: '',
}

const useCreateLog = () => {
  const { t } = useTranslation()
  const [page] = useState(1)
  const { closeModal, openModal } = useModal()

  const { refetch: apiKeyRefetch } = useApiKeysService({ page, limit: 30, search_text: '' })
  const [createApiKeyService] = useCreateApiKeyService()
  const { setSnackbar } = useSnackbarAlert()
}
