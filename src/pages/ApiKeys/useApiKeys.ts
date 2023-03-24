import { useState } from 'react'

// import useSnackbar from 'hooks/useSnackbar'
import { useApiKeysService } from 'services/useApiKeyService'

import { useModal } from 'hooks'

const useApiKeys = () => {
  const [page] = useState(1)

  const { openModal } = useModal()
  // const { setSnackbar } = useSnackbar()

  const { data: apiKeys, refetch: apiKeyRefetch } = useApiKeysService({
    page,
    limit: 30,
    search_text: '',
  })

  console.log('apiKeys', apiKeys)

  const handleEditApiKey = (apiKey: any) => {
    // push(`/api-keys/edit/${apiKey.id}`)
    openModal({
      name: 'edit-api-keys-modal',
      data: { id: apiKey.id, refetchApiList: apiKeyRefetch },
    })
  }

  return { apiKeys, handleEditApiKey }
}

export default useApiKeys
