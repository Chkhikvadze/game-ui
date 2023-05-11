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
  AI = 'AI',
  gameCategory = 'Game Category',
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
  gameCategory?: string
}
