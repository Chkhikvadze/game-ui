import React from 'react'

import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextField from '@l3-lib/ui-core/dist/TextField'

const CreateEndPoint = ({ onClose }: { onClose: Function }) => {
  return (
    <>
      <StyledEndPointContainer>
        <StyledFieldWrapper>
          <TextField placeholder='e.g/ v1/checkout/sessions' />
        </StyledFieldWrapper>
        <StyledButtonContainer>
          <StyledTertiaryButton
            kind={Button.kinds.TERTIARY}
            size={Button.sizes.SMALL}
            onClick={onClose}
          >
            <Typography value='Clear' type={Typography.types.LABEL} size={Typography.sizes.sm} />
          </StyledTertiaryButton>

          <StyledPrimaryButton kind={Button.kinds.PRIMARY} size={Button.sizes.SMALL}>
            <Typography value='Apply' type={Typography.types.LABEL} size={Typography.sizes.sm} />
          </StyledPrimaryButton>
        </StyledButtonContainer>
      </StyledEndPointContainer>
    </>
  )
}
export default CreateEndPoint

const StyledEndPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 16px;
  position: absolute;
  width: 319px;
  height: 144px;
  left: 546px;
  top: 151px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(100px);
  border-radius: 16px;
  flex: none;
  order: 3;
  flex-grow: 0;
  z-index: 3;
`
const StyledFieldWrapper = styled.div`
  width: 287px;
  height: 44px;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
`
const StyledButtonContainer = styled.div`
  width: 287px;
  height: 44px;
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
  //   gap: 90px;
`
const StyledPrimaryButton = styled(Button)`
  padding: 10px 26px;
`
const StyledTertiaryButton = styled(Button)`
  padding: 10px 26px;
`
