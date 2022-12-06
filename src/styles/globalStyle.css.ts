import styled, { createGlobalStyle } from "styled-components"


export default createGlobalStyle`
  .logo_upload_banner {

  }
`


const StyledFromSection = styled.div<{columns?: string}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 400px;
`


export { StyledFromSection }
