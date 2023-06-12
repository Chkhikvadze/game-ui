import { FormikProvider } from 'formik'
import { useEditAsset } from '../EditAsset/useEditAsset'
import AssetForm from './AssetForm'

type EditAssetFormProps = {
  asset: any
}

const EditAssetForm = ({ asset }: EditAssetFormProps) => {
  const { formik, closeModal, handleUpdateMedia, uploading } = useEditAsset(asset.id)

  const closeEditAssetModal = () => {
    closeModal('create-asset-modal')
  }

  const handleUploadImages = (event: any) => {
    handleUpdateMedia(event, asset)
  }

  return (
    <FormikProvider value={formik}>
      <AssetForm
        formik={formik}
        closeModal={closeEditAssetModal}
        handleUploadImages={handleUploadImages}
        loadingMediaUpload={uploading}
        isEdit
        collectionId={asset.collection_id}
      />
    </FormikProvider>
  )
}

export default EditAssetForm
