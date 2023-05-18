import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { useUpdateMetadataService } from 'services/contract/useUpdateMetadataService'

type UseUpdateMetadataProps = {
  collectionId: string
}

const useUpdateMetadata = ({ collectionId }: UseUpdateMetadataProps) => {
  const { updateMetadataService, loading } = useUpdateMetadataService()
  const { setToast } = useContext(ToastContext)

  const updateMetadata = async () => {
    try {
      await updateMetadataService(collectionId)

      setToast({
        type: 'warning',
        message: `Metadata will be updated in few minutes`,
        open: true,
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
