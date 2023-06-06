import { FormikProvider } from 'formik'

import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import { useEditAsset } from '../pages/Asset/EditAsset/useEditAsset'

import AssetForm from 'pages/Asset/AssetForm'

import FullScreenModal from 'components/FullScreenModal'
import FileUploadField from 'atoms/FileUploadField'

type EditAssetModalProps = {
  data: {
    asset: any
  }
}

const EditAssetModal = ({ data }: EditAssetModalProps) => {
  const { asset } = data

  const { formik, closeModal, handleUpdateMedia, uploading } = useEditAsset(asset.id)

  const closeEditAssetModal = () => {
    closeModal('edit-asset-modal')
  }

  const handleUploadImages = (event: any) => {
    handleUpdateMedia(event, asset)
  }
  return (
    <FullScreenModal>
      <FormikProvider value={formik}>
        <AssetForm
          formik={formik}
          closeModal={closeEditAssetModal}
          handleUploadImages={handleUploadImages}
          loadingMediaUpload={uploading}
          isEdit
        />
      </FormikProvider>
    </FullScreenModal>
  )
}

export default withRenderModal('edit-asset-modal')(EditAssetModal)

export const StyledForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 16px;
  width: 600px;
`

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`
