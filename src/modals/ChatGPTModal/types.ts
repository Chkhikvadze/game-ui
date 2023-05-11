export interface ChatMessageType {
  id: number
  created_on: number
  text: string
  ai: boolean
  selected?: string
}

export interface ChatType {
  id: number
  created_on: number
  name: string
  messages: ChatMessageType[]
}
