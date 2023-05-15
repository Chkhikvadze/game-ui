import {
  IChatMessage,
  IChat,
  MESSAGE_TYPE_ENUM,
  GPT_PROMPT_ENUM,
  ICollection,
  IReward,
  IAchievement,
} from '../types'
import {
  gameIdeaPrompt,
  gameplayPrompt,
  parseGPTContent,
  rewardAchievementPrompt,
  questionConfirmPrompt,
  collectionPrompt,
} from '../utils/prompts'
import { testJSON, testRewardsAchievementsJSON } from '../utils/test'
import { dalle } from 'modals/AIChatModal/utils/dalle'
import { v4 as uuidv4 } from 'uuid'

const useMediaAI = (
  addNotifyMessage: (text: string, ai: boolean) => void,
  addMessage: (message: IChatMessage) => void,
  regenerateMessage: (message: IChatMessage) => void,
  updateMessageCollection: (messageId: string, collection: ICollection) => void,
) => {
  const generateCollectionMediasAI = async (): Promise<any> => {}

  const generateAssetsMediasAI = async (): Promise<any> => {}
  return {
    generateCollectionMediasAI,
  }
}

export { useMediaAI }
