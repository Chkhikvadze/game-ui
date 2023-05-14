import { IChatMessage, IChat, MESSAGE_TYPE_ENUM, GPT_PROMPT_ENUM, ICollection } from '../types'
import {
  gameIdeaPrompt,
  gameplayPrompt,
  parseGPTContent,
  rewardAchievementPrompt,
  questionConfirmPrompt,
} from '../utils/prompts'
import { testJSON } from '../utils/test'
import { callChatGPT } from 'modals/AIChatModal/utils/davinci'
import { v4 as uuidv4 } from 'uuid'

const useChatPrompts = (
  addNotifyMessage: (text: string, ai: boolean) => void,
  addMessage: (message: IChatMessage) => void,
  regenerateMessage: (message: IChatMessage) => void,
  updateMessageCollection: (messageId: string, collection: ICollection) => void,
) => {
  const generateGameIdeaAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(userInput, false)
    }
    const ideaAmount = 3
    const prompt = gameIdeaPrompt(userInput, chat?.gameCategory || '', ideaAmount, 'JSON', 800)
    const content = await callChatGPT(prompt)

    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      // addNotifyMessage('Response of L3', true)
      return
    }

    const parseData = parseGPTContent(content)
    if (!parseData) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      // addNotifyMessage('Parse JSON error', true)
      return
    }

    const id = uuidv4()

    if (isRegenerated && regeneratedMessage?.id !== undefined) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        gameIdeas: parseData.ideas,
      })
      return
    } else {
      const newMsg: IChatMessage = {
        id: id,
        createdOn: Date.now(),
        text: `Here is ${ideaAmount} ideas for Game Concept`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.GameIdea,
        gameIdeas: parseData.ideas,
      }
      addMessage(newMsg)
    }
    return
  }

  const generateGameplayAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(`Let's now brainstorm exciting gameplay!`, true)
    }
    const amount = 3
    const prompt = gameplayPrompt(userInput, chat?.gameIdea?.description || '', amount, 'JSON', 600)

    const content = await callChatGPT(prompt)

    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }

    const parseData = parseGPTContent(content)
    if (!parseData) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }

    if (isRegenerated && regeneratedMessage) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        gameplays: parseData.gameplays,
      })
      return
    }

    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Here are ${amount} ideas for the Gameplay`,
      ai: true,
      type: MESSAGE_TYPE_ENUM.Gameplay,
      gameplays: parseData.gameplays,
    }
    addMessage(newMsg)
    return
  }

  const generateCollectionAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    if (!isRegenerated) {
      addNotifyMessage(
        `Ready your consoles, as we conjure collections, assets, attributes, and properties for your game. Brace for a few minutes of creation, unfolding step-by-step with vivid detail.`,
        true,
      )
    }
    const collections: ICollection[] = [
      {
        id: uuidv4(),
        loading: true,
        name: 'Collection 1',
      },
      {
        id: uuidv4(),
        loading: true,
        name: 'Collection 2',
      },
      {
        id: uuidv4(),
        loading: true,
        name: 'Collection 3',
      },
    ]
    const amount = 3

    await new Promise(resolve => setTimeout(resolve, 3000))

    const parseData = await testJSON() //await generateCollection(chat)
    if (!parseData) {
      console.log('Parse Data for collection is null')
      return
    }
    delete parseData?.collection?.id
    collections[0] = {
      ...collections[0],
      ...parseData?.collection,
    }
    //todo: regenerate disable on assets
    // if (isRegenerated && regeneratedMessage) {
    //   regenerateMessage({
    //     ...regeneratedMessage,
    //     createdOn: Date.now(),
    //     collections: parseData.collection,
    //   })
    //   return
    // }
    // debugger

    console.log(parseData, 'CollectionAssetPrompt parseData')
    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Amazing! Age of Nations started to seem fun! Here are some assets we can include in your game
          * Select all that apply`,
      ai: true,
      type: MESSAGE_TYPE_ENUM.Collection,
      collections,
    }

    addMessage(newMsg)
    // debugger
    for (let i = 1; i < amount; i++) {
      await new Promise(resolve => setTimeout(resolve, 6000))

      const prData = await testJSON() //await generateCollection(chat)
      if (prData.collection && newMsg.collections) {
        delete prData.collection.id
        const updateCollection = {
          ...newMsg.collections[i],
          ...prData.collection,
        }
        updateMessageCollection(newMsg.id, updateCollection)
      }
    }

    return
  }

  const generateRewardAchievementAI = async (
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ): Promise<any> => {
    const amountReward = 5
    const amountAchievement = 5
    const prompt = rewardAchievementPrompt(
      chat.name,
      chat.gameIdea?.description || '',
      chat.gameplay?.description || '',
      amountReward,
      amountAchievement,
      'JSON',
      80,
      80,
    )
    const content = await callChatGPT(prompt)

    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }

    const parseData = parseGPTContent(content)
    if (!parseData) {
      addNotifyMessage('Oops, we hit a snag! Please give it another go later.', true)
      return
    }

    if (isRegenerated && regeneratedMessage) {
      regenerateMessage({
        ...regeneratedMessage,
        createdOn: Date.now(),
        rewards: parseData.rewards,
        achievements: parseData.achievements,
      })
    }
    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Great! Here are some rewards and achievements we can include in your game`,
      ai: true,
      type: MESSAGE_TYPE_ENUM.RewardAchievement,
      rewards: parseData.rewards,
      achievements: parseData.achievements,
    }
    addMessage(newMsg)
    return
  }

  const generatedAI = async (
    type: GPT_PROMPT_ENUM,
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ) => {
    switch (type) {
      case GPT_PROMPT_ENUM.GameIdeaPrompt: {
        await generateGameIdeaAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GPT_PROMPT_ENUM.GameplayPrompt: {
        await generateGameplayAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GPT_PROMPT_ENUM.CollectionAssetPrompt: {
        await generateCollectionAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
      case GPT_PROMPT_ENUM.RewardAchievementPrompt: {
        await generateRewardAchievementAI(chat, userInput, isRegenerated, regeneratedMessage)
        return
      }
    }
  }
  const questionConfirmAI = async (question: string, answer: string): Promise<boolean> => {
    const prompt = questionConfirmPrompt(question, answer)
    const content = await callChatGPT(prompt)

    return content?.includes('yes') || false
  }

  return { generatedAI, questionConfirmAI }
}

export { useChatPrompts }
