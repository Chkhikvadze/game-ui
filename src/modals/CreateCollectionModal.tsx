import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import styled from 'styled-components'
import { StyledFormSection } from './modalStyle'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from 'oldComponents/atoms/Button'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from 'oldComponents/molecules/Modal'

import { useCollection } from 'pages/Collection/Collections/useCollection'

import CollectionForm from 'pages/Collection/CollectionForm'

import { useTranslation } from 'react-i18next'

type CreateProjectModalProps = {
  closeModal: () => void
}

const CreateCollectionModal = ({ closeModal }: CreateProjectModalProps) => {
  const { formik, fileUploadType, handleChangeFile, onDeleteImg } = useCollection()
  const { t } = useTranslation()
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <Modal
            close={closeModal}
            header={'Create Collection'}
            footer={
              <StyledActionsContainer>
                <StyledModalButtonLink style={{}} onClick={closeModal}>
                  {t('cancel')}
                </StyledModalButtonLink>

                <Button color='primary' onClick={formik.handleSubmit}>
                  {t('save')}
                </Button>
              </StyledActionsContainer>
            }
          >
            <StyledFormSection>
              <CollectionForm
                formik={formik}
                fileUploadType={fileUploadType}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
              />
            </StyledFormSection>
          </Modal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('create-collection-modal')(CreateCollectionModal)

// const StyledForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 24px;
//   grid-row-gap: 16px;
//   width: 600px;
// `

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
