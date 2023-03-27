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
import info from '../../../assets/images/info.png'
import FormikTextField from 'components/TextFieldFormik/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'

type CreateApiModalProps = {
  closeModal: () => void
  data: {
    token: string
  }
}

const CreateApiModal = ({ closeModal, data }: CreateApiModalProps) => {
  const { t } = useTranslation()
  const { formik, projectsOptions } = useCreateApiKey()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledCreateModal
            onClose={closeModal}
            show
            title={
              <StyledModalHeading
                value='Create a new secret key'
                type={Typography.types.T}
                size={Typography.sizes.lg}
              />
            }
            backgroundColor='dark'
            alertDialog='true'
          >
            <ModalContent>
              <StyledCreateModalForm>
                <StyledNameTextWrapper>
                  <Typography value='Name' type={Typography.types.P} size={Typography.sizes.md} />
                </StyledNameTextWrapper>
                <FormikTextField field_name='name' />
                <StyledTextFieldDate>
                  <StyledExpirationTextWrapper>
                    <Typography
                      value='Expiration'
                      type={Typography.types.P}
                      size={Typography.sizes.md}
                    />
                  </StyledExpirationTextWrapper>
                  <FormikTextField type='date' field_name='expiration' />
                </StyledTextFieldDate>

                <StyledTextWrapper>
                  <Typography
                    value='Choose games'
                    type={Typography.types.P}
                    size={Typography.sizes.md}
                  />
                  <StyledImgWrapper>
                    <img src={info} alt='info' />
                  </StyledImgWrapper>
                </StyledTextWrapper>
                <DropDown placeholder='Select' options={projectsOptions || []} multi multiLine />
                <StyledTextWrapper>
                  <Typography value='Note' type={Typography.types.P} size={Typography.sizes.md} />
                </StyledTextWrapper>
                <TextareaFormik
                  rows={8}
                  cols={56}
                  color='#FFFFFF'
                  field_name='note'
                  placeholder='An optional description of what this webhook endpoint is used for.'
                />
              </StyledCreateModalForm>
            </ModalContent>
            <StyledModalFooter>
              <StyledActionsContainer>
                <Button
                  onClick={closeModal}
                  kind={Button.kinds.TERTIARY}
                  size={Button.sizes.MEDIUM}
                >
                  <StyledLabelTypography value='Cancel' type={Typography.types.P} />
                </Button>

                <Button
                  onClick={formik?.handleSubmit}
                  kind={Button.kinds.PRIMARY}
                  size={Button.sizes.MEDIUM}
                >
                  <StyledLabelTypography value='Create' type={Typography.types.P} />
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
  justify-items: flex-end;
  gap: 42px;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`
export const StyledCreateModal = styled(Modal)`
  width: 480px;
  height: 664px;
`

export const StyledCreateModalForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  width: 100%;
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
  margin-left: 120px;
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

export const StyledTextAreaWrapper = styled(TextareaFormik)`
  width: 448px ! !important;
`

export const StyledModalFooter = styled(ModalFooter)`
  display: flex;
  position: absolute;
  right: 16px;
  bottom: 24px;
`
export const StyledModalHeading = styled(Typography)`
  font-size: 24px;
  line-height: 32px;
  font-weight: 500;
`

export const StyledLabelTypography = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`
