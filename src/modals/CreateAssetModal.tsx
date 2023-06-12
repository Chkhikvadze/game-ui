import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import { useAsset } from 'pages/Asset/Assets/useAsset'
import AssetForm from 'pages/Asset/AssetForm'
import { useTranslation } from 'react-i18next'

import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from './components/BgWrapper'

const CreateAssetModal = ({ data }: any) => {
  const { formik, closeModal } = useAsset({ collection_id: data.collection_id })

  const closeCreateAssetModal = () => {
    closeModal('create-asset-modal')
  }

  return (
    <Modal fullscreen show isClean>
      <FormikProvider value={formik}>
        <BgWrapper>
          <AssetForm
            formik={formik}
            closeModal={closeCreateAssetModal}
            collectionId={data.collection_id}
            // handleUploadImages={handleUploadImages}
            // loadingMediaUpload={uploading}
          />
        </BgWrapper>
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('create-asset-modal')(CreateAssetModal)
