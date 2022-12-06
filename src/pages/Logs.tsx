import styled from "styled-components"

const Logs = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>Logs</h1>
  </StyledContainer>
)

export default Logs

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
