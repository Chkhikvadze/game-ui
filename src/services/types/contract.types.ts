import {
  ContractConstructorConfig,
  ContractFormConfig,
} from 'pages/Contract/ContractForm/useContractForm'

type Nullable<T> = T | null

export interface Contract {
  id: string
  name: string
  contract_type: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment: string
  template: string
  config: ContractFormConfig
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: Nullable<{ [k: string]: object }[]>
  bytecode: Nullable<string>
  constructor_args: any[]
  constructor_config: ContractConstructorConfig
  collection_id: Nullable<string>
  deployer_address?: `0x${string}`
  contract_address: `0x${string}`
  transaction_hash?: string
  game_id: string
}
