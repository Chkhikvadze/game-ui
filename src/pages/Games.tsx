import styled from "styled-components"

const Games = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>Games</h1>
  </StyledContainer>
)

export default Games

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
