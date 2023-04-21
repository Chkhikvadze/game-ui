import styled from 'styled-components'

export const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 400px;
`

const StyledModalWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 40px;
  padding: 40px 41px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const StyledCloseBtn = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  cursor: pointer;
`

const StyledTypography = styled.p<{ disabled?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  pointer-events: ${p => p.disabled && 'none'};
`

const StyledModalBody = styled.div`
  display: flex;
  justify-content: center;
`

const StyledModalFooter = styled.div`
  padding: 94px 58px 64px;
  display: flex;
  align-items: center;
  gap: 20px;
`

export {
  StyledModalWrapper,
  StyledModalFooter,
  StyledModalBody,
  StyledCloseBtn,
  StyledHeaderGroup,
  StyledHeader,
  StyledTypography,
}
