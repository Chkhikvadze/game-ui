import React from 'react'
import { FormikProvider } from 'formik'

import { useEditNft } from './useEditNft'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'
import NftForm from 'pages/Nft/NftForm'

import Modal from 'oldComponents/molecules/Modal'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Button from 'oldComponents/atoms/Button'
import { StyledActionsContainer, StyledForm, StyledModalButtonLink } from 'modals/CreateNftModal'
import withRenderModal from 'hocs/withRenderModal'

type EditNftModalProps = {
  data: {
    closeModal: () => void
    nftId: any
  }
}

const EditNftModal = ({ data }: EditNftModalProps) => {
  const { nftId, closeModal } = data
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, propertiesOptions, nftOption } =
    useEditNft(nftId)
  // console.log('formik', formik)
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Edit Nft'}
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
              <NftForm
                formik={formik}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
                fileUploadType={fileUploadType}
                propertiesOptions={propertiesOptions}
                nftOption={nftOption}
                isEdit={true}
              />
            </StyledForm>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('edit-nft-modal')(EditNftModal)
