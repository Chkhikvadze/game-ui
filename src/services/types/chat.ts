import { ApiVersionEnum } from 'modals/AIChatModal/types'

export interface IAiMediaPrompt {
  id: string
  media: string
}

export enum ChatMessageVersionEnum {
  ChatConversational = 'chat_conversational',
  PlanAndExecute = 'plan_and_execute',
  PlanAndExecuteWithTools = 'plan_and_execute_with_tools',
}

export const API_VERSION_TO_CHAT_MESSAGE_VERSION_MAP = {
  [ApiVersionEnum.L3_Conversational]: ChatMessageVersionEnum.ChatConversational,
  [ApiVersionEnum.L3_PlanAndExecute]: ChatMessageVersionEnum.PlanAndExecute,
  [ApiVersionEnum.L3_PlanAndExecuteWithTools]: ChatMessageVersionEnum.PlanAndExecuteWithTools,
}
