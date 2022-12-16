import React from 'react'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'


import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Modal from 'oldComponents/molecules/Modal'

import FileUploadField from 'atoms/FileUploadField'

import { useNft } from 'pages/Nft/Nfts/useNft'
import NftForm from 'pages/Nft/NftForm'
import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'


type CreateProjectModalProps = {
  closeModal: () => void
}

const CreateNftModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, propertiesOptions, nftOption } =
    useNft()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create Nft'}
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
              />
            </StyledForm>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-nft-modal')(CreateNftModal)

const StyledForm = styled.div`
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

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`