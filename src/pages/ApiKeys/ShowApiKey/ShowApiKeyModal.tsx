import React from 'react'
import withRenderModal from 'hocs/withRenderModal'

import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Modal from '@l3-lib/ui-core/dist/Modal'
import ModalFooter from '@l3-lib/ui-core/dist/ModalFooter'
import ModalContent from '@l3-lib/ui-core/dist/ModalContent'
import Icon from '@l3-lib/ui-core/dist/Icon'
import SpecialWarning from '@l3-lib/ui-core/dist/icons/SpecialWarning'
import Copy from '@l3-lib/ui-core/dist/icons/Copy'

type ShowApiKeyModalProps = {
  closeModal: () => void
  data: {
    token: any
  }
}

const ShowApiKeyModal = ({ closeModal, data }: ShowApiKeyModalProps) => {
  return (
    <>
      <StyledModal
        show
        title={
          <Typography value='Your API token' type={Typography.types.P} size={Typography.sizes.lg} />
        }
        backgroundColor='dark'
      >
        <ModalContent>
          <StyledTextContainer>
            <Typography
              value='Your new API token is displayed below. Treat this token like a password, as it can be'
              type={Typography.types.P}
              size={Typography.sizes.md}
            />
            <Typography
              value='used to access your account without a username, password, or two-factor'
              type={Typography.types.P}
              size={Typography.sizes.md}
            />
            <Typography
              value='authentication.'
              type={Typography.types.P}
              size={Typography.sizes.md}
            />
          </StyledTextContainer>
          <StyledTokenContainer>
            <StyledTokenTypography>
              <Typography value={data.token} type={Typography.types.L} size={Typography.sizes.md} />
            </StyledTokenTypography>
            <StyledTokenIcon>
              <Icon icon={Copy} iconSize={23} />
            </StyledTokenIcon>
          </StyledTokenContainer>
          <StyledWarningToken>
            <StyledIcon>
              <Icon icon={SpecialWarning} iconSize={23} />
              <StyledIconText>
                <Typography
                  value='This token  '
                  type={Typography.types.L}
                  size={Typography.sizes.md}
                />
                <StyledTypography>
                  <Typography
                    value='will not be displayed'
                    type={Typography.types.L}
                    size={Typography.sizes.md}
                  />
                </StyledTypography>
                <Typography
                  value=' again so make sure to save it to a safe place. '
                  type={Typography.types.L}
                  size={Typography.sizes.md}
                />
              </StyledIconText>
            </StyledIcon>
          </StyledWarningToken>
        </ModalContent>
        <StyledApiModalFooter>
          <Button kind={Button.kinds.PRIMARY} size={Button.sizes.MEDIUM} onClick={closeModal}>
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
  height: 356px;
`

export const StyledApiModalFooter = styled(ModalFooter)`
  display: flex;
  position: absolute;
  right: 32px;
  bottom: 24px;
`
export const StyledTextContainer = styled.div`
  width: 632px;
  height: 75px;
  margin-top: 24px;
  color: #ffffff;
`
export const StyledTokenContainer = styled.div`
  width: 662px;
  height: 44px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-top: 24px;
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
  position: absolute;
  right: 58.57px;
  top: 200px;
  // bottom: 10.57px;
`

export const StyledWarningToken = styled.div`
  width: 663px;
  height: 56px;
  background: #fefedc;
  border-radius: 12px;
  margin-top: 24px;
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
