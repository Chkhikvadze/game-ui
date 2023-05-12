import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { useUpdateMetadataService } from 'services/contract/useUpdateMetadataService'

type UseUpdateMetadataProps = {
  collectionId: string
}

const useUpdateMetadata = ({ collectionId }: UseUpdateMetadataProps) => {
  const { updateMetadataService } = useUpdateMetadataService()
  const { setToast } = useContext(ToastContext)

  const updateMetadata = async () => {
    try {
      await updateMetadataService(collectionId)

      setToast({
        type: 'positive',
        message: `Metadata was updated`,
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
  }
}

export default useUpdateMetadata
