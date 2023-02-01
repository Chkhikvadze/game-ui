import React from 'react'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import withRenderModal from 'hocs/withRenderModal'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Modal from 'oldComponents/molecules/Modal'

import FileUploadField from 'atoms/FileUploadField'

import { useAsset } from 'pages/Asset/Assets/useAsset'
import AssetForm from 'pages/Asset/AssetForm'
import { useTranslation } from 'react-i18next'
// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

type CreateProjectModalProps = {
  closeModal: () => void
}

const CreateAssetModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, propertiesOptions, assetOption } =
    useAsset()

  const { t } = useTranslation()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create Asset'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  {t('cancel')}
                </StyledModalButtonLink>

                <Button color="primary" onClick={formik.handleSubmit}>
                  {t('save')}
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
              />
            </StyledForm>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-asset-modal')(CreateAssetModal)

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

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`
