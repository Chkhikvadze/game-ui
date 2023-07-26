import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import Modal from '@l3-lib/ui-core/dist/Modal'
import BgWrapper from './components/BgWrapper'
import CreateAssetForm from 'pages/Asset/AssetForm/CreateAssetForm'
import EditAssetForm from 'pages/Asset/AssetForm/EditAssetForm'
import { useAsset } from 'pages/Asset/Assets/useAsset'

const CreateAssetModal = ({ data }: any) => {
  const { asset, collection_id } = data

  const { formik, closeModal } = useAsset()

  const closeCreateAssetModal = () => {
    closeModal('create-asset-modal')
  }

  return (
    <Modal fullscreen show isClean backgroundColor='dark' onClose={closeCreateAssetModal}>
      <BgWrapper>
        {!asset ? (
          <CreateAssetForm collectionId={collection_id} />
        ) : (
          <EditAssetForm asset={asset} />
        )}
      </BgWrapper>
    </Modal>
  )
}

export default withRenderModal('create-asset-modal')(CreateAssetModal)
