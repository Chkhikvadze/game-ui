import React from 'react'
import { FormikProvider } from 'formik'

import { useEditAsset } from './useEditAsset'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'
import AssetForm from 'pages/Asset/AssetForm'

import Modal from 'oldComponents/molecules/Modal'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Button from 'oldComponents/atoms/Button'
import { StyledActionsContainer, StyledForm, StyledModalButtonLink } from 'modals/CreateAssetModal'
import withRenderModal from 'hocs/withRenderModal'

type EditAssetModalProps = {
  data: {
    closeModal: () => void
    assetId: any
  }
}

const EditAssetModal = ({ data }: EditAssetModalProps) => {
  const { assetId, closeModal } = data
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, propertiesOptions, assetOption } =
    useEditAsset(assetId)
  // console.log('formik', formik)
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Edit Asset'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  Cancel
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  Save
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledForm>
              <AssetForm
                formik={formik}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
                fileUploadType={fileUploadType}
                propertiesOptions={propertiesOptions}
                assetOption={assetOption}
                isEdit={true}
              />
            </StyledForm>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('edit-asset-modal')(EditAssetModal)
