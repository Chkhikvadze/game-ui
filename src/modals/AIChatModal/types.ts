export enum CHAT_STEP_ENUM {
  CreateGameConcept = 'Create Game Concept',
  GenerateGameplay = 'Generate Gameplay',
  GenerateCollections = 'Generate Collections',
  GenerateAssets = 'Generate Assets (Properties & Attributes)',
  AssetsMedias = 'Generate Medias of Assets',
  GenerateAchievementsAndRewards = 'Achievements & Rewards',
  FinishAndCreate = 'Finish & Create',
  BuildContracts = 'Build Smart Contracts (Coming soon)',
  GenerateSDKs = 'Generate Code (Coming soon)',
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
  ReportPrompt = 'ReportPrompt',
}

export enum API_VERSION_ENUM {
  CreateV1 = 'L3-Create-v1',
  ReportV1 = 'L3-Report-v1',
  MediaV1 = 'L3-Media-v1',
}

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
  SelectGameForReport = 'SelectGameForReport',
  GameMedias = 'GameMedias',
  AssetsMedias = 'AssetsMedias',
  Media = 'Media',
}

export interface IChatStep {
  id: number
  name: CHAT_STEP_ENUM
  status: STEP_STATUS_ENUM
}

export interface IGameplay {
  id: number
  description: string
}

export interface IGameIdea {
  id: number
  name: string
  description: string
  image?: string
}

export interface IAssetMedia {
  id?: string
  url?: string
  is_main?: boolean
  format?: string
}

export interface IAsset {
  id: number
  name: string
  description: string
  attributes: IAttribute[]
  properties: IProperty[]
  medias: IAssetMedia[] // media for backend

  isMediaGenerating?: boolean

  media?: IMedia
}

export interface IAttribute {
  id: number
  name: string
  description: string
  min: number
  max: number
}
export interface IAttributeAsset {
  id: number
  name: string
  value: number
}
export interface IProperty {
  id: number
  name: string
  description: string
}
export interface IReward {
  id: number
  loading: boolean
  name: string
  description?: string
  type?: string
}
export interface IAchievement {
  id: number
  loading: boolean
  name: string
  description?: string
  trigger?: string
  rewards: IReward[]
}

export interface ICollection {
  id: string
  loading: boolean
  name?: string
  description?: string
  image?: string
  assets?: IAsset[]
  properties?: IProperty[]
  attributes?: IAttributeAsset[]
}

export interface IChat {
  id: string
  createdOn: number
  name: string
  messages: IChatMessage[]
  steps: { [key in CHAT_STEP_ENUM]: STEP_STATUS_ENUM }
  gameCategory?: string
  userKeywords?: string
  gameIdea?: IGameIdea
  gameplay?: IGameplay
  collections?: ICollection[]
  rewards?: IReward[]
  achievements?: IAchievement[]
  isCreateFinished?: boolean
  isAssetMediasGenerated?: boolean

  // Game medias
  medias?: IAssetMedia[]

  report?: {
    gameId?: string
  }
}

export interface IChatMessage {
  id: string
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
  history?: IChatMessage[]
  loader_type?: string
  medias?: string[]

  media?: IMedia

  isMediaGenerating?: boolean

  report?: {
    gameId?: string

    charts?: IReportChart[]
  }
}

export interface IReportChart {
  type: ChartTypeEnum
  title: string
  data: Record<string, unknown>[]
}

export enum ChartTypeEnum {
  Pie = 'pie',
  Bar = 'bar',
  Line = 'line',
}

export interface IMedia {
  current: {
    url: string
    type: 'collage' | 'upscaled' | 'upscaledWithoutBackground'
  }

  // Generated media collage (4 images)
  collage: {
    id: string
    url: string
  }

  // Upscaled/chosen media (1 image)
  upscaled?: {
    id: string
    url: string
  }

  upscaledWithoutBackground?: {
    url: string
  }
}
