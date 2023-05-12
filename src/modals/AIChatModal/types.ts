export enum ChatStepEnum {
  CreateGameConcept = 'Create Game Concept',
  GenerateGameplay = 'Generate Gameplay',
  GenerateCollections = 'Generate Collections',
  GenerateAssets = 'Generate Assets (Properties & Attributes)',
  GenerateAchievementsAndRewards = 'Generate Achievements & Rewards',
  BuildContracts = 'Build Contracts',
  FinishAndCreate = 'Finish & Create',
  GenerateSDKs = 'Generate SDKs',
}

export enum StepStatusEnum {
  InProgress = 'In progress',
  Completed = 'Done',
  Pending = 'Pending',
}

export enum ChatMessageTypeEnum {
  AI_MANUAL = 'AI_MANUAL',
  GameCategory = 'Game Category',
  User = 'User',
  GameIdea = 'GameIdea',
  Gameplay = 'Gameplay',
}

export interface ChatStepType {
  name: ChatStepEnum
  status: StepStatusEnum
}

export interface ChatMessageType {
  id: number
  created_on: number
  text: string
  prompt?: string
  ai: boolean
  aiModel?: string
  type: ChatMessageTypeEnum
  jsonData?: [JSON]
}

export interface ChatType {
  id: number
  created_on: number
  name: string
  messages: ChatMessageType[]
  steps?: ChatStepType[]
  currentStep: ChatStepType
  gameCategory?: string
  userKeywords?: string
  gameName?: string
  gameIdea?: {
    id: number
    title: string
    description: string
    image?: string
  }
  gameplay?: {
    id: number
    title: string
    description: string
  }
  collections?: [JSON]
}

export const InitialSteps = [
  { id: 0, name: ChatStepEnum.CreateGameConcept, status: StepStatusEnum.InProgress },
  { id: 1, name: ChatStepEnum.GenerateGameplay, status: StepStatusEnum.Pending },
  { id: 2, name: ChatStepEnum.GenerateCollections, status: StepStatusEnum.Pending },
  { id: 3, name: ChatStepEnum.GenerateAssets, status: StepStatusEnum.Pending },
  { id: 4, name: ChatStepEnum.GenerateAchievementsAndRewards, status: StepStatusEnum.Pending },
  { id: 5, name: ChatStepEnum.BuildContracts, status: StepStatusEnum.Pending },
  { id: 6, name: ChatStepEnum.FinishAndCreate, status: StepStatusEnum.Pending },
  { id: 7, name: ChatStepEnum.GenerateSDKs, status: StepStatusEnum.Pending },
]

export const InitialMessage: ChatMessageType = {
  id: 1,
  created_on: Date.now(),
  text: "Ready to shape an L3 AI-powered, decentralized game? First, let's uncover its genre. What's the gaming realm?",
  ai: true,
  type: ChatMessageTypeEnum.GameCategory,
  // queue: {
  //   id: 1,
  // }
}

export const INITIAL_CHAT: ChatType = {
  id: 1,
  name: 'Game with L3 AI',
  created_on: Date.now(),
  messages: [InitialMessage],
  steps: InitialSteps,
  currentStep: {
    name: ChatStepEnum.CreateGameConcept,
    status: StepStatusEnum.InProgress,
  },
  // active_step:
}
