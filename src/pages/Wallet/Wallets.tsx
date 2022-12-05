import styled from "styled-components";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";
import { useWallets } from "./useWallets";
import { CustomTable } from "oldComponents/atoms/CustomTable";
import columnConfig from "./columnConfig";

const Wallets = () => {
  const { addWallet, data, handleDeleteWallet } = useWallets();

  const addNewWallet = (address: any) => {
    const walletValues = {
      address: address,
      label: "account name",
      wallet_type: "metamask",
    };

    addWallet(walletValues);
  };

  const { address, isConnected } = useAccount({
    onConnect({ address }) {
      // console.log("Connected", { address, connector, isReconnected,  });
      if (data?.items) {
        const addresses = data.items.map((item: any) => item.address);

        console.log("addresses", addresses);
        if (addresses.includes(address)) {
          return;
        } else {
          addNewWallet(address);
        }
      } else {
        addNewWallet(address);
      }
    },
  });

  const config = columnConfig({ handleDelete: handleDeleteWallet, address });

  return (
    <StyledContainer>
      <h1 style={{ color: "white", textAlign: "center" }}>Wallets</h1>
      <ConnectButton />
      <CustomTable
        templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
        size="14px"
        displayHeader
        columnsConfig={config}
        data={data?.items || []}
        alignItems="end"
        rowDifferentColors
      />
    </StyledContainer>
  );
};

export default Wallets;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
