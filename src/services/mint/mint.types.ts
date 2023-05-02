interface Token {
  token_id?: number
  asset_id?: string
  amount: number
}

export interface MintInput {
  contract_id: string
  game_id: string
  collection_id: string
  player_id: string
  asset: Token
}

export interface MintTransactionData {
  transaction_hash: string
}
