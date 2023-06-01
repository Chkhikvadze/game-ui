import { v4 as uuidv4 } from 'uuid'
import {
  API_VERSION_ENUM,
  CHAT_STEP_ENUM,
  IChat,
  IChatMessage,
  MESSAGE_TYPE_ENUM,
  STEP_STATUS_ENUM,
} from './types'

export const API_VERSIONS = Object.values(API_VERSION_ENUM)

export const INITIAL_STEPS: { [key in CHAT_STEP_ENUM]: STEP_STATUS_ENUM } = {
  [CHAT_STEP_ENUM.CreateGameConcept]: STEP_STATUS_ENUM.InProgress,
  [CHAT_STEP_ENUM.GenerateGameplay]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateCollections]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateAssets]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.AssetsMedias]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateAchievementsAndRewards]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.FinishAndCreate]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.BuildContracts]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateSDKs]: STEP_STATUS_ENUM.Pending,
}

export const INITIAL_MESSAGE: IChatMessage = {
  id: uuidv4(),
  createdOn: Date.now(),
  text: "Ready to shape an L3 AI-powered, decentralized game? First, let's uncover its genre. What's the gaming realm?",
  ai: true,
  type: MESSAGE_TYPE_ENUM.GameCategory,
  history: [],
}

export const INITIAL_CHAT: IChat = {
  id: uuidv4(),
  name: 'Game by L3 AI',
  createdOn: Date.now(),
  messages: [INITIAL_MESSAGE],
  steps: INITIAL_STEPS,
}
