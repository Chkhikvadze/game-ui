import styled, { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
  .logo_upload_banner {

  }
`

const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 400px;
`

const StyledFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FLexSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledCenterFormContainer = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  max-width: 550px;
  justify-items: center;
`

const StyledFormContainer = styled.div`
  margin-top: 64px;
  display: grid;
  grid-row-gap: 16px;
  padding: 0 87px;
  width: 550px;
  max-width: 550px;
`

const StyledMainWrapper = styled.div``

export const StyledContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 16px;
`

export const StyledInnerGroup = styled.div`
  margin-top: 47px;
`

const StyledInnerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`

const StyleHeaderGroup = styled.header<{ grid?: boolean }>`
  padding: 32px 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${p =>
    p.grid &&
    css`
      padding-bottom: 12px;
    `};
`

const StyledCenteredWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

export {
  StyledFormSection,
  StyledFlex,
  StyledCenterFormContainer,
  StyledFormContainer,
  StyledMainWrapper,
  FLexSpaceBetween,
  StyledInnerWrapper,
  StyleHeaderGroup,
  StyledCenteredWrapper,
}
