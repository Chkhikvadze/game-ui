export interface IApiKey {
  id: number
  name: string
  token: string
  expiration: Date
  note: string
  __typename: string
}

export interface IApiKeyInput {
  name: string
  expiration: Date
  note: string
}
