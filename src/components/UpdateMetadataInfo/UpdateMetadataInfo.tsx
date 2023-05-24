import ToastBanner from '../ToastBanner/ToastBanner'
import useUpdateMetadata from './useUpdateMetadata'

type UpdateMetadataInfoProps = {
  collectionId: string
  isMetadataUpdating: boolean
}

const UpdateMetadataInfo = ({ collectionId, isMetadataUpdating }: UpdateMetadataInfoProps) => {
  const { updateMetadata, isUpdating } = useUpdateMetadata({ collectionId })

  const loading = isMetadataUpdating || isUpdating

  return (
    <ToastBanner
      type='normal'
      title='Metadata Update'
      menuType='insideContent'
      description='Update metadata after updating the assets to see the changes on contract.'
      buttonOption={{
        button_title: loading ? 'Updating' : 'Update',
        button_func: updateMetadata,
        loading,
      }}
    />
  )
}

export default UpdateMetadataInfo
