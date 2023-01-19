import styled from "styled-components"

const Asset = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>Asset</h1>
  </StyledContainer>
)

export default Asset

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
