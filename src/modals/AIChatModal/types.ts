import { v4 as uuidv4 } from 'uuid'

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
  Pending = 'Pending',
  InProgress = 'In Progress',
}

export enum GPT_PROMPT_ENUM {
  GameIdeaPrompt = 'GameIdeaPrompt',
  GameplayPrompt = 'gameplayPrompt',
  CollectionAssetPrompt = 'CollectionAssetPrompt',
  RewardAchievementPrompt = 'RewardAchievementPrompt',
  QuestionConfirmPrompt = 'QuestionConfirmPrompt',
}

export enum API_VERSION_ENUM {
  CreateV1 = 'L3-Create-v1',
  ReportV1 = 'L3-Report-v1',
}
export const API_VERSIONS: API_VERSION_ENUM[] = [
  API_VERSION_ENUM.CreateV1,
  API_VERSION_ENUM.ReportV1,
]

export enum MESSAGE_TYPE_ENUM {
  AI_MANUAL = 'AI_MANUAL',
  GameCategory = 'Game Category',
  User = 'User',
  GameIdea = 'GameIdea',
  Gameplay = 'Gameplay',
  Collection = 'Collection',
  RewardAchievement = 'RewardAchievement',
  CreateFinishQuestion = 'CreateFinishQuestion',
  CreateContractQuestion = 'CreateContractQuestion',
  Report = 'Report',
}

export interface IChatStep {
  id: number
  name: CHAT_STEP_ENUM
  status: STEP_STATUS_ENUM
}

export interface IGameplay {
  id: number
  name: string
  description: string
}

export interface IGameIdea {
  id: number
  name: string
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
export interface IReward {
  id: number
  name: string
  description: string
  type: string
}
export interface IAchievement {
  id: number
  name: string
  description: string
  trigger: string
  rewards: IReward[]
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
  createdOn: number
  text: string
  prompt?: string
  ai: boolean
  type: MESSAGE_TYPE_ENUM
  gameIdeas?: IGameIdea[]
  gameplays?: IGameplay[]
  collections?: ICollection[]
  rewards?: IReward[]
  achievements?: IAchievement[]
}

export interface IChat {
  id: string
  createdOn: number
  name: string
  messages: IChatMessage[]
  steps: { [key in CHAT_STEP_ENUM]: STEP_STATUS_ENUM }
  currentStep: IChatStep
  gameCategory?: string
  userKeywords?: string
  gameIdea?: IGameIdea
  gameplay?: IGameplay
  collections?: ICollection[]
  rewards?: IReward[]
  achievements?: IAchievement[]
}

export const INITIAL_STEPS: { [key in CHAT_STEP_ENUM]: STEP_STATUS_ENUM } = {
  [CHAT_STEP_ENUM.CreateGameConcept]: STEP_STATUS_ENUM.InProgress,
  [CHAT_STEP_ENUM.GenerateGameplay]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateCollections]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateAssets]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateAchievementsAndRewards]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.BuildContracts]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.FinishAndCreate]: STEP_STATUS_ENUM.Pending,
  [CHAT_STEP_ENUM.GenerateSDKs]: STEP_STATUS_ENUM.Pending,
}

export const INITIAL_MESSAGE: IChatMessage = {
  id: 1,
  createdOn: Date.now(),
  text: "Ready to shape an L3 AI-powered, decentralized game? First, let's uncover its genre. What's the gaming realm?",
  ai: true,
  type: MESSAGE_TYPE_ENUM.GameCategory,
}

export const INITIAL_CHAT: IChat = {
  id: uuidv4(),
  name: 'Game with L3 AI',
  createdOn: Date.now(),
  messages: [INITIAL_MESSAGE],
  steps: INITIAL_STEPS,
  currentStep: {
    id: 0,
    name: CHAT_STEP_ENUM.CreateGameConcept,
    status: STEP_STATUS_ENUM.InProgress,
  },
}
