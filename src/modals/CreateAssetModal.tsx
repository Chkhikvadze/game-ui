import { FormikProvider } from 'formik'

import withRenderModal from 'hocs/withRenderModal'

import { useAsset } from 'pages/Asset/Assets/useAsset'
import AssetForm from 'pages/Asset/AssetForm'
import { useTranslation } from 'react-i18next'

import Modal from './Modal'

const CreateAssetModal = () => {
  const { formik, closeModal } = useAsset()

  const { t } = useTranslation()

  const closeCreateAssetModal = () => {
    closeModal('create-asset-modal')
  }

  return (
    <Modal>
      <FormikProvider value={formik}>
        <AssetForm formik={formik} closeModal={closeCreateAssetModal} />
      </FormikProvider>
    </Modal>
  )
}

export default withRenderModal('create-asset-modal')(CreateAssetModal)
