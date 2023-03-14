import styled, { createGlobalStyle } from 'styled-components'

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

const StyledCenterFormContainer = styled.div`
  align-self: center;
  justify-self: center;
  display: grid;
  max-width: 550px;
  justify-items: center;
`

export { StyledFormSection, StyledFlex, StyledCenterFormContainer }
