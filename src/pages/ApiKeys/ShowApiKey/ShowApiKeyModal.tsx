import React from 'react'
import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import ModalContent from '@l3-lib/ui-core/dist/ModalContent'
import Icon from '@l3-lib/ui-core/dist/Icon'
import Warning from '@l3-lib/ui-core/dist/icons/Warning'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'
import Toast from '@l3-lib/ui-core/dist/Toast'

type ShowApiKeyModalProps = {
  closeModal: () => void
  data: {
    token: string
  }
}

const ShowApiKeyModal = ({ closeModal, data }: ShowApiKeyModalProps) => {
  return (
    <>
      <StyledModal
        show
        title={
          <StyledTextContainer>
            <Typography
              value='Your new API token is displayed below. Treat this token like a password, as it can be'
              type={Typography.types.Paragraph}
              size={Typography.sizes.md}
            />
            <Typography
              value='used to access your account without a username, password, or two-factor'
              type={Typography.types.Paragraph}
              size={Typography.sizes.md}
            />
            <Typography
              value='authentication.'
              type={Typography.types.Paragraph}
              size={Typography.sizes.md}
            />
          </StyledTextContainer>
        }
        backgroundColor='dark'
        hideCloseButton={true}
      >
        {/* <ModalContent> */}
        <StyledTokenContainer>
          <StyledTokenTypography>
            <Typography value={data.token} type={Typography.types.L} size={Typography.sizes.md} />
          </StyledTokenTypography>
          <StyledTokenIcon>
            <Icon
              icon={Copy}
              iconSize={23}
              onClick={() => {
                navigator.clipboard.writeText(data.token)
              }}
            />
          </StyledTokenIcon>
        </StyledTokenContainer>
        <StyledWarningToken
          open
          autoHideDuration={5000}
          type={Toast.types.WARNING_LOW_INFORMATIONAL}
          label={
            <StyledToastLabel>
              <Typography value='Note' type={Typography.types.LABEL} size={Typography.sizes.md} />
            </StyledToastLabel>
          }
          paragraph={
            <StyledToastParagraph>
              <Typography
                value='This token will not be displayed again, so make sure to save it to a safe place.'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
            </StyledToastParagraph>
          }
          className='l3-storybook-toast_wrapper'
          icon={
            <StyledToastIcon>
              <Warning size='65' />
            </StyledToastIcon>
          }
          hideIcon={false}
          closeable={false}
        />
        {/* </ModalContent> */}
        <StyledApiModalFooter>
          <Button kind={Button.kinds.PRIMARY} size={Button.sizes.LARGE} onClick={closeModal}>
            Done
          </Button>
        </StyledApiModalFooter>
      </StyledModal>
    </>
  )
}

export default withRenderModal('show-api-key-modal')(ShowApiKeyModal)

export const StyledModal = styled(Modal)`
  width: 664px;
  height: 312px;
`
const StyledToastIcon = styled.div`
  display: flex;
  position: relative;
  float: left;
  right: 27px;
`
const StyledToastLabel = styled.div`
  display: flex;
  position: relative;
  float: left;
  right: 50px;
`
const StyledToastParagraph = styled.div`
  display: flex;
  position: relative;
  float: left;
  right: 50px;
  width: 600px;
`

export const StyledApiModalFooter = styled(ModalFooter)`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  float: right;
  bottom: 65px;
`
export const StyledTextContainer = styled.div`
  width: 632px;
  height: 75px;
  margin-top: 16px;
  color: #ffffff;
`
export const StyledTokenContainer = styled.div`
  width: 662px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-top: 34px;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const StyledTokenTypography = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-left: 15px;
`

export const StyledTokenIcon = styled.div`
  display: flex;
  position: relative;
  left: 300px;
  float: right;
`

export const StyledWarningToken = styled(Toast)`
  width: 662px;
  height: 56px;
  display: flex;
  position: relative;
  left: 0px;
  margin-top: 66px;
`

export const StyledIcon = styled.div`
  margin-top: 12px;
  margin-left: 18px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
export const StyledIconText = styled.div`
  margin-top: 2px;
`
export const StyledTypography = styled.div`
  display: contents;
  color: black;
  font-weight: 600 !important;
  line-height: 32px;
`
