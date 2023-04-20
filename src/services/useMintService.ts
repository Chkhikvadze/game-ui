import { useMutation } from '@apollo/client'
// TODO: fix absolute import or alias
import MINT_GQL from '../gql/mint/mint.gql'
import AWARD_GQL from '../gql/mint/award.gql'
import AIRDROP_GQL from '../gql/mint/airdrop.gql'

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

interface Token {
  token_id?: number
  asset_id?: string
  amount: number
}

export interface MintInput {
  contract_id: string
  project_id: string
  collection_id: string
  player_id: string
  asset: Token
}

export const useMintService = () => {
  const [mutation] = useMutation(MINT_GQL)

  const mintService = async (input: MintInput) => {
    const { data: { mint } = {} } = await mutation({
      variables: { input },
    })

    return mint
  }

  return [mintService]
}

export const useAirdropService = () => {
  const [mutation] = useMutation(AIRDROP_GQL)

  const airdropService = async (input: MintInput) => {
    const { data: { airdrop } = {} } = await mutation({
      variables: { input },
    })

    return airdrop
  }

  return [airdropService]
}

export const useAwardService = () => {
  const [mutation] = useMutation(AWARD_GQL)

  const awardService = async (input: MintInput) => {
    const { data: { award } = {} } = await mutation({
      variables: { input },
    })

    return award
  }

  return [awardService]
}
