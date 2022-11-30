import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Wallets = () => {
  return (
    <StyledContainer>
      <h1 style={{ color: "white", textAlign: "center" }}>Wallets</h1>
      <ConnectButton />
    </StyledContainer>
  );
};

export default Wallets;

const StyledContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  height: 100%;
`;
