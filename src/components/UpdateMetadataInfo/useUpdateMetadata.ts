import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { useUpdateMetadataService } from 'services/contract/useUpdateMetadataService'
import { getTransactionUrl } from 'utils/blockchain'

type UseUpdateMetadataProps = {
  collectionId: string
}

const useUpdateMetadata = ({ collectionId }: UseUpdateMetadataProps) => {
  const { updateMetadataService, loading } = useUpdateMetadataService()
  const { setToast } = useContext(ToastContext)

  const updateMetadata = async () => {
    try {
      setToast({
        type: 'warning',
        message: `Metadata will be updated in a few minutes`,
        open: true,
      })

      const { transaction_hash, contract } = await updateMetadataService(collectionId)

      setToast({
        type: 'positive',
        message: `Metadata updated`,
        open: true,
        url: getTransactionUrl(contract.chain_id, transaction_hash),
      })
    } catch (error) {
      if (error instanceof Error) {
        setToast({
          type: 'negative',
          message: error.message,
          open: true,
        })
      }
    }
  }

  return {
    updateMetadata,
    isUpdating: loading,
  }
}

export default useUpdateMetadata
