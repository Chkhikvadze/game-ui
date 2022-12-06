import styled from "styled-components"

const CreateGame = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>Create Game</h1>
  </StyledContainer>
)

export default CreateGame

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
