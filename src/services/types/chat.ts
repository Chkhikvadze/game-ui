export interface IAiMediaPrompt {
  id: string
  prompt: string
  generating: boolean
  webhook_data: IAiMediaPromptWebhookData
}

export interface IAiMediaPromptWebhookData {
  // Prompt used to generate the media
  content: string

  // URL
  imageUrl: string

  // Available buttons to choose between 4 images or choose version you like
  buttons: string[]

  createdAt: string
  responseAt: string

  type: 'imagine' | 'button'

  // Unique identifier for the prompt
  originatingMessageId: string

  // Button message Id to use to choose options
  buttonMessageId: string
}
