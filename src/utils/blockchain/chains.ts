interface Chain {
  name: string
  chainId: number
  blockExplorer: {
    name: string
    url: string
  }
}

export const CHAINS: Record<number, Chain> = {
  5: {
    name: 'Goerli',
    chainId: 5,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io',
    },
  },
  11155111: {
    name: 'Sepolia',
    chainId: 11155111,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
  },
  80001: {
    name: 'Polygon PoS',
    chainId: 80001,
    blockExplorer: {
      name: 'Etherscan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
}

export function getChain(chainId: number): Chain | undefined {
  return CHAINS[chainId]
}
