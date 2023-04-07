import { useMutation, useQuery } from '@apollo/client'
// TODO: fix absolute import or alias
import MINT_TOKEN_GQL from '../gql/mint/mintToken.gql'
import { Transaction } from 'ethers'

type Nullable<T> = T | null

export interface Contract {
  id: string
  name: string
  contract_type?: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: { [k: string]: object }[]
  bytecode: string
  constructor_args: Nullable<unknown[]>
  collection_id?: string
  deployer_address?: `0x${string}`
  contract_address: `0x${string}`
  transaction_hash?: string
}

export interface MintInput {
  contract_id: string
  project_id: string
  collection_id: string
  player_id: string
  token_id: number
  amount: number
}

export const useMintService = () => {
  const [mutation, { loading }] = useMutation(MINT_TOKEN_GQL)

  const mintService = async (input: MintInput) => {
    const { data: { mintToken } = {} } = await mutation({
      variables: { input },
    })

    return mintToken
  }

  return [mintService]
}
