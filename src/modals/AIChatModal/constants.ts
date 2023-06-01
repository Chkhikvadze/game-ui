import { v4 as uuidv4 } from 'uuid'
import {
  ApiVersionEnum,
  ChatStepEnum,
  IChat,
  IChatMessage,
  MessageTypeEnum,
  StepStatusEnum,
} from './types'

export const apiVersion = Object.values(ApiVersionEnum)

export const initialSteps: { [key in ChatStepEnum]: StepStatusEnum } = {
  [ChatStepEnum.CreateGameConcept]: StepStatusEnum.InProgress,
  [ChatStepEnum.GenerateGameplay]: StepStatusEnum.Pending,
  [ChatStepEnum.GenerateCollections]: StepStatusEnum.Pending,
  [ChatStepEnum.GenerateAssets]: StepStatusEnum.Pending,
  [ChatStepEnum.AssetsMedias]: StepStatusEnum.Pending,
  [ChatStepEnum.GenerateAchievementsAndRewards]: StepStatusEnum.Pending,
  [ChatStepEnum.FinishAndCreate]: StepStatusEnum.Pending,
  [ChatStepEnum.BuildContracts]: StepStatusEnum.Pending,
  [ChatStepEnum.GenerateSDKs]: StepStatusEnum.Pending,
}

export const initialMessage: IChatMessage = {
  id: uuidv4(),
  createdOn: Date.now(),
  text: "Ready to shape an L3 AI-powered, decentralized game? First, let's uncover its genre. What's the gaming realm?",
  ai: true,
  type: MessageTypeEnum.GameCategory,
  history: [],
}

export const initialChat: IChat = {
  id: uuidv4(),
  name: 'Game by L3 AI',
  createdOn: Date.now(),
  messages: [initialMessage],
  steps: initialSteps,
}
