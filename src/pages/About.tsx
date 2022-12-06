import styled from "styled-components"

const About = () => (
  <StyledContainer>
    <h1 style={{ color: "white", textAlign: "center" }}>About</h1>
  </StyledContainer>
)

export default About

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
