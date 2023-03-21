import styled from 'styled-components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useAccount, useBalance } from 'wagmi'
import { useWallets } from './useWallets'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import columnConfig from './columnConfig'
import { useEffect } from 'react'

const Wallets = () => {
  const { addWallet, data, handleDeleteWallet, loading } = useWallets()

  const { address, connector } = useAccount({
    // onConnect({ address, connector }) {
    //   // console.log(connector);
    //   if (data?.items) {
    //     const addresses = data.items.map((item: any) => item.address);
    //     // console.log("addresses", addresses);
    //     if (addresses.includes(address)) {
    //       return;
    //     } else {
    //       addNewWallet(address, connector);
    //     }
    //   } else {
    //     addNewWallet(address, connector);
    //   }
    // },
  })

  const { data: balance } = useBalance({
    address,
  })

  const addNewWallet = async (address: any, connector: any, protocol: any) => {
    const walletValues = {
      address: address,
      label: 'account name',
      wallet_type: connector.name,
      network: connector.chains[0].name,
      protocol: protocol,
    }
    await addWallet(walletValues)
  }

  const config = columnConfig({
    handleDelete: handleDeleteWallet,
    address,
    balance: balance?.formatted,
  })

  // const generateAddresses = async (data: any) => {
  //   const addresses = await data.items.map((item: any) => item.address);
  //   console.log("addresses", addresses);
  //   if (addresses.length && addresses.includes(address)) {
  //     console.log("true");
  //     addNewWallet(address, connector, balance?.symbol);
  //   }
  //   if (data.items && data.items.length === 0) {
  //     // await addNewWallet(address, connector, balance?.symbol);
  //
  //   }
  // };

  const prepareSaveWallet = async () => {
    const addresses = await data?.items?.map((item: any) => item.address)
    // console.log(addresses)

    // const addresses = data.items.map((item: any) => item.address);

    if (addresses.includes(address)) {
      // console.log("return");
      return
    } else {
      await addNewWallet(address, connector, balance?.symbol)
    }
  }

  useEffect(() => {
    // console.log(address);
    if (balance && !loading) {
      prepareSaveWallet()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <StyledContainer>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Wallets</h1>
      <ConnectButton />
      <CustomTable
        templateColumns='1fr repeat(1, 1fr)  repeat(1,1fr)'
        size='14px'
        displayHeader
        columnsConfig={config}
        data={data?.items || []}
        alignItems='end'
        rowDifferentColors
      />
    </StyledContainer>
  )
}

export default Wallets

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`
