import styled from "styled-components"

const Wallets = () => {
  return (
    <StyledContainer>
      <h1 style={{ color: "white", textAlign: "center" }}>Wallets</h1>
    </StyledContainer>
  )
}

export default Wallets

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`
