import {
  IChatMessage,
  IChat,
  MESSAGE_TYPE_ENUM,
  GPT_PROMPT_ENUM,
  ICollection,
  IReward,
  IAchievement,
} from '../types'
import { callChatGPT, davinci } from '../utils/davinci'
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

  const generateGameMediasAI = async (
    name: string,
    description: string,
    amount: number,
  ): Promise<string[]> => {
    const prompt = `Generate Prompt for Dalle AI, I want to use it for the game:
    Game title: "${name}",
    Game description: "${description}",

    General rules:
    1. character amount must be less than 400. 
    2. Give me output only prompt text`
    const dallePrompt = await callChatGPT(prompt)

    if (!dallePrompt) return []
    const response = await dalle(dallePrompt, amount)
    const result = response?.data?.data?.map((item: any) => {
      return item?.url
    })
    return result
  }

  const generateAssetsMediasAI = async (): Promise<any> => {}

  return {
    generateCollectionMediasAI,
    generateGameMediasAI,
    generateAssetsMediasAI,
  }
}

export { useMediaAI }
