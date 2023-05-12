import { number } from 'yup'

export enum CHAT_STEP_ENUM {
  CreateGameConcept = 'Create Game Concept',
  GenerateGameplay = 'Generate Gameplay',
  GenerateCollections = 'Generate Collections',
  GenerateAssets = 'Generate Assets (Properties & Attributes)',
  GenerateAchievementsAndRewards = 'Generate Achievements & Rewards',
  BuildContracts = 'Build Contracts',
  FinishAndCreate = 'Finish & Create',
  GenerateSDKs = 'Generate SDKs',
}

export enum STEP_STATUS_ENUM {
  Completed = 'Completed',
  Active = 'Active',
}

export enum CHAT_MESSAGE_ENUM {
  AI_MANUAL = 'AI_MANUAL',
  GameCategory = 'Game Category',
  User = 'User',
  GameIdea = 'GameIdea',
  Gameplay = 'Gameplay',
}

export interface IChatStep {
  id: number
  name: CHAT_STEP_ENUM
  status: STEP_STATUS_ENUM
}

export interface IGameplay {
  id: number
  title: string
  description: string
}

export interface IGameIdea {
  id: number
  title: string
  description: string
  image?: string
}

export interface IAsset {
  id: number
  name: string
}
export interface IAttribute {
  id: number
  name: string
}
export interface IProperty {
  id: number
  name: string
}

export interface ICollection {
  id: number
  name: CHAT_STEP_ENUM
  assets: IAsset[]
  properties: IProperty[]
  attributes: IAttribute[]
}

export interface IChatMessage {
  id: number
  created_on: number
  text: string
  prompt?: string
  ai: boolean
  aiModel?: string
  type: CHAT_MESSAGE_ENUM

  gameIdeas?: IGameIdea[]
  gameplays?: IGameplay[]
  collections?: ICollection[]
}

export interface IChat {
  id: number
  created_on: number
  name: string
  messages: IChatMessage[]
  steps: IChatStep[]
  currentStep: IChatStep
  gameCategory?: string
  userKeywords?: string
  gameName?: string
  gameIdea?: IGameIdea
  gameplay?: IGameplay
  collections?: [JSON]
}

export const INITIAL_STEPS = [
  { id: 0, name: CHAT_STEP_ENUM.CreateGameConcept, status: STEP_STATUS_ENUM.Active },
  { id: 1, name: CHAT_STEP_ENUM.GenerateGameplay, status: STEP_STATUS_ENUM.Active },
  { id: 2, name: CHAT_STEP_ENUM.GenerateCollections, status: STEP_STATUS_ENUM.Active },
  { id: 3, name: CHAT_STEP_ENUM.GenerateAssets, status: STEP_STATUS_ENUM.Active },
  { id: 4, name: CHAT_STEP_ENUM.GenerateAchievementsAndRewards, status: STEP_STATUS_ENUM.Active },
  { id: 5, name: CHAT_STEP_ENUM.BuildContracts, status: STEP_STATUS_ENUM.Active },
  { id: 6, name: CHAT_STEP_ENUM.FinishAndCreate, status: STEP_STATUS_ENUM.Active },
  { id: 7, name: CHAT_STEP_ENUM.GenerateSDKs, status: STEP_STATUS_ENUM.Active },
]

export const INITIAL_MESSAGE: IChatMessage = {
  id: 1,
  created_on: Date.now(),
  text: "Ready to shape an L3 AI-powered, decentralized game? First, let's uncover its genre. What's the gaming realm?",
  ai: true,
  type: CHAT_MESSAGE_ENUM.GameCategory,
  // queue: {
  //   id: 1,
  // }
}

export const INITIAL_CHAT: IChat = {
  id: 1,
  name: 'Game with L3 AI',
  created_on: Date.now(),
  messages: [INITIAL_MESSAGE],
  steps: INITIAL_STEPS,
  currentStep: {
    id: 0,
    name: CHAT_STEP_ENUM.CreateGameConcept,
    status: STEP_STATUS_ENUM.Active,
  },
  // active_step:
}
