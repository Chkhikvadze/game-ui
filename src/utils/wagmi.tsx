import { connectorsForWallets, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import {
  metaMaskWallet,
  // braveWallet,
  // coinbaseWallet,
  // injectedWallet,
  // walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { ReactNode, useMemo } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai],
  [alchemyProvider({ apiKey: 'Fj_pYvI6MtnLDmkn-wCyHtH-FHJZO7tU' })],
)

// console.log("TESTNETS", process.env.REACT_APP_NEXT_PUBLIC_ENABLE_TESTNETS);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      // coinbaseWallet({ appName: "coin base", chains }),
      // walletConnectWallet({ chains }),
      // braveWallet({ chains }),
      // injectedWallet({ chains }),
    ],
  },
])

type WagmiProps = {
  children: ReactNode
  autoConnect?: boolean
}

export default function Wagmi({ children, autoConnect = true }: WagmiProps) {
  const wagmiClient = useMemo(
    () =>
      createClient({
        autoConnect,
        connectors,
        provider,
        webSocketProvider,
      }),
    [autoConnect],
  )

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={lightTheme({
          borderRadius: 'none',
          // accentColor: "#F2D7AE",
          accentColorForeground: '#000000',
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
