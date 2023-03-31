import { getChain } from './chains'

// export function getTransactionUrl(transactionHash: ) {

// }

export function getContractUrl(chainId: number, contractAddress: string) {
  const chain = getChain(chainId)
  if (!chain) return ''
  return `${chain.blockExplorer.url}/address/${contractAddress}`
}
