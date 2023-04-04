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
import { mainnet, goerli, sepolia, polygon, polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
// import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, sepolia, polygon, polygonMumbai],
  [
    infuraProvider({ apiKey: '92d4817069634160a684ced6332913c8' }),
    alchemyProvider({ apiKey: 'Fj_pYvI6MtnLDmkn-wCyHtH-FHJZO7tU' }),
    publicProvider(),
  ],
)

export const metaMaskConnector = new MetaMaskConnector({ chains })

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
