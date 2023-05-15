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
import { simulateConfirmAI, testJSON, testRewardsAchievementsJSON } from '../utils/test'
import { callChatGPT } from 'modals/AIChatModal/utils/davinci'
import { v4 as uuidv4 } from 'uuid'

const useChatAI = (
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
        loading: false,
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

    const parseData: any =
      process.env.REACT_APP_DATA_TEST_MODE === 'true'
        ? await testJSON()
        : await generateCollection(chat, userInput)

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
    for (let i = 1; i < amount; i++) {
      const prData =
        process.env.REACT_APP_DATA_TEST_MODE === 'true'
          ? await testJSON()
          : await generateCollection(chat, userInput)

      if (prData.collection && newMsg.collections) {
        delete prData.collection.id
        const updateCollection = {
          ...newMsg.collections[i],
          ...prData.collection,
          loading: false,
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
    if (!isRegenerated) {
      addNotifyMessage(
        `Let's seize the moment to create exciting Rewards and Achievements for your game!`,
        true,
      )
    }
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

    let parseData: any = null
    if (process.env.REACT_APP_DATA_TEST_MODE === 'true') {
      parseData = await testRewardsAchievementsJSON()
    } else {
      const content = await callChatGPT(prompt)
      if (!content) {
        addNotifyMessage('Please, provide more details to generate idea', true)
        return
      }
      parseData = parseGPTContent(content)
    }

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

  const generateCollection = async (chat: IChat, userInput: string): Promise<any> => {
    const prompt = collectionPrompt(
      userInput,
      chat?.gameIdea?.description || 'Any Game Idea',
      chat?.gameplay?.description || 'Any Gameplay',
      3,
      'JSON',
      100,
      100,
      200,
      100,
      5,
      5,
      5,
    )
    const content = await callChatGPT(prompt)
    if (!content) {
      addNotifyMessage('Please, provide more details to generate idea', true)
      return
    }
    return parseGPTContent(content)
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

    if (process.env.REACT_APP_DATA_TEST_MODE === 'true') {
      return simulateConfirmAI(question, answer)
    }
    return content?.includes('yes') || false
  }

  return { generatedAI, questionConfirmAI }
}

export { useChatAI }
