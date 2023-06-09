import { Nullable } from 'types'

export interface IContract {
  id: string
  name: string
  contract_type: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment: string
  template: string
  config: IContractConfig
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: Nullable<{ [k: string]: object }[]>
  bytecode: Nullable<string>
  constructor_args: any[]
  constructor_config: IContractConstructorConfig
  collection_id: Nullable<string>
  deployer_address?: `0x${string}`
  contract_address: `0x${string}`
  transaction_hash: Nullable<string>
  game_id: string
}

export interface IContractConfig {
  collection_size?: number
  max_mint_per_transaction?: number
  max_mint_per_player?: number
  player_mint_fee: number

  is_opensea?: boolean
  is_sale_status?: boolean
  is_airdrop?: boolean
  is_award?: boolean
  is_mint_by_admin: boolean
  is_buy_by_player: boolean
  is_royalties: boolean
  is_withdraw?: boolean
  is_price_per_nft?: boolean
  is_burnable?: boolean
  is_player_metadata?: boolean
}

export interface IContractConstructorConfig {
  owner_address: string
  role_addresses: string[]
  royalty_addresses: string[]
  royalty_percentages: number[]
  royalty_fee: number
  initial_contract_uri: string
  is_royalty_split: boolean
}
