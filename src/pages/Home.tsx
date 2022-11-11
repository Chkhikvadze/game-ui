import styled from "styled-components"

const Home = () => {
  return (
    <StyledContainer>
      <h1 style={{ color: "white", textAlign: "center" }}>Home</h1>
    </StyledContainer>
  )
}

export default Home

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
