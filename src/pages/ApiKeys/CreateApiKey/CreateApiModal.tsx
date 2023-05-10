import React from 'react'
import withRenderModal from 'hocs/withRenderModal'
import { FormikProvider } from 'formik'

import useCreateApiKey from './useCreateApiKey'

import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import ModalContent from '@l3-lib/ui-core/dist/ModalContent'
import DropDown from '@l3-lib/ui-core/dist/Dropdown'
import Heading from '@l3-lib/ui-core/dist/Heading'
import info from '../../../assets/images/info.png'
import TextFiled from '@l3-lib/ui-core/dist/TextField'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import CreateForm from 'components/CreateForm'
import CreateApiKeysForm from './CreateApikeysForm'

type CreateApiModalProps = {
  closeModal: () => void
}

const CreateApiModal = ({ closeModal }: CreateApiModalProps) => {
  const { t } = useTranslation()
  const { formik, formHook, handleSubmit } = useCreateApiKey()

  const apiKeysName = formHook.watch('name')

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledCreateModal
            onClose={closeModal}
            show
            title={
              <StyledModalHeading
                type={Heading.types.h1}
                size={Heading.sizes.md}
                value='Create a new secret key'
              />
            }
            backgroundColor='dark'
          >
            {/* <CreateForm
              closeModal={closeModal}
              formHook={formHook}
              handleSubmit={handleSubmit}
              nameValue={apiKeysName}
              // categoryValue={collectionCategory}
              // backgroundImg={backgroundImg}
              finishText={'Collection unlocked'}
              form={<CreateApiKeysForm closeModal={closeModal} formHook={formHook} />}
              categoryValue={undefined}
            /> */}
            <CreateApiKeysForm closeModal={closeModal} formik={formik} />
            <StyledModalFooter>
              <StyledActionsContainer>
                <Button onClick={closeModal} kind={Button.kinds.TERTIARY} size={Button.sizes.LARGE}>
                  <Typography
                    value='Cancel'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                  />
                </Button>

                <Button
                  onClick={formik?.handleSubmit}
                  kind={Button.kinds.PRIMARY}
                  size={Button.sizes.LARGE}
                >
                  <StyledLabelTypography
                    value='Create'
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                  />
                </Button>
              </StyledActionsContainer>
            </StyledModalFooter>
          </StyledCreateModal>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default withRenderModal('add-api-keys-modal')(CreateApiModal)

// const StyledForm = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-column-gap: 24px;
//   grid-row-gap: 16px;
//   width: 600px;
// `

export const StyledActionsContainer = styled.div`
  display: flex;
  position: relative;
  justify-items: flex-end;
  gap: 42px;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
export const StyledCreateModal = styled(Modal)`
  width: 512px;
  height: 668px;
`

export const StyledCreateModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextFieldDate = styled.div`
  width: 199px;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-top: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledImgWrapper = styled.div`
  margin-top: -20px;
  margin-left: 130px;
`

export const StyledNameTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`
export const StyledExpirationTextWrapper = styled.div`
  width: 296px;
  height: 24px;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
`

export const StyledTextAreaWrapper = styled.div`
  height: 130px;
`

export const StyledModalFooter = styled(ModalFooter)`
  display: grid;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  top: 20px;
`
export const StyledModalHeading = styled(Heading)`
  font-size: 24px !important;
  line-height: 32px !important;
  font-weight: 500 !important;
`

export const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
