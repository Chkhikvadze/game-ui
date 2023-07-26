import { FormikProvider } from 'formik'
import { useAsset } from '../Assets/useAsset'
import AssetForm from './AssetForm'

type CreateAssetFormProps = {
  collectionId: string
}

const CreateAssetForm = ({ collectionId }: CreateAssetFormProps) => {
  const { formik, closeModal } = useAsset({ collection_id: collectionId })

  const closeCreateAssetModal = () => {
    closeModal('create-asset-modal')
  }

  return (
    <FormikProvider value={formik}>
      <AssetForm
        formik={formik}
        closeModal={closeCreateAssetModal}
        collectionId={collectionId}
        // handleUploadImages={handleUploadImages}
        // loadingMediaUpload={uploading}
      />
      {/* <div style={{ background: 'red' }}>ghvjh</div> */}
    </FormikProvider>
  )
}

export default CreateAssetForm
