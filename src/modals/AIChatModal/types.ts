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
}

export interface ChatStepType {
  name: ChatStepEnum
  status: StepStatusEnum
}

export interface ChatMessageType {
  id: number
  created_on: number
  text: string
  ai: boolean
  selected?: string
  type: ChatMessageTypeEnum
}

export interface ChatType {
  id: number
  created_on: number
  name: string
  messages: ChatMessageType[]
  steps?: ChatStepType[]
  currentStep: ChatStepType
  gameCategory?: string
}

export const InitialSteps = [
  { name: ChatStepEnum.CreateGameConcept, status: StepStatusEnum.InProgress },
  { name: ChatStepEnum.GenerateGameplay, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.GenerateCollections, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.GenerateAssets, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.GenerateAchievementsAndRewards, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.BuildContracts, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.FinishAndCreate, status: StepStatusEnum.Pending },
  { name: ChatStepEnum.GenerateSDKs, status: StepStatusEnum.Pending },
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
