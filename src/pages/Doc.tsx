import styled from "styled-components"

const Doc = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>Doc</h1>
  </StyledContainer>
)

export default Doc

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
