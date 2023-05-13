import { useState, useContext, useEffect, useCallback } from 'react'
import {
  IChatMessage,
  IChat,
  CHAT_STEP_ENUM,
  STEP_STATUS_ENUM,
  MESSAGE_TYPE_ENUM,
  INITIAL_CHAT,
  INITIAL_MESSAGE,
  INITIAL_STEPS,
  GPT_PROMPT_ENUM,
  API_VERSIONS,
  API_VERSION_ENUM,
  IGameplay,
  IGameIdea,
} from '../types'
import { ChatContext } from '../context/ChatContext'
import {
  gameIdeaPrompt,
  gameplayPrompt,
  collectionPrompt,
  parseGPTContent,
  rewardAchievementPrompt,
  questionConfirmPrompt,
} from '../utils/prompts'
import { davinci } from 'modals/AIChatModal/utils/davinci'
import { dalle } from 'modals/AIChatModal/utils/dalle'
import { v4 as uuidv4 } from 'uuid'
import { set } from 'lodash'

const useChat = () => {
  const apiVersions = API_VERSIONS
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)
  const [apiVersion, setAPIVersion] = useState(apiVersions[0])
  const [thinking, setThinking] = useState(false)

  const updateChatsByCurrent = (chat: IChat) => {
    setChats(chats => {
      // Find the index of the chat that matches the currentChat
      const index = chats.findIndex(chat => chat.id === currentChat.id)

      // If no chat was found, return the original array
      if (index === -1) return chats

      // Otherwise, replace the chat at the found index with the currentChat
      return [...chats.slice(0, index), chat, ...chats.slice(index + 1)]
    })
  }

  const regenerateMessage = (message: IChatMessage) => {
    if (!message?.history) {
      message.history = []
    }
    message?.history?.push(message)
    const index = currentChat.messages.findIndex(message => message.id === message.id)
    // If no chat was found, return the original array
    if (index === -1) return

    // Otherwise, replace the chat at the found index with the currentChat
    const newMessages = [
      ...currentChat.messages.slice(0, index),
      message,
      ...currentChat.messages.slice(index + 1),
    ]
    setCurrentChat({ ...currentChat, messages: newMessages })
  }

  useEffect(() => {
    setChats(chats => {
      // Find the index of the chat that matches the currentChat
      const index = chats.findIndex(chat => chat.id === currentChat.id)

      // If no chat was found, return the original array
      if (index === -1) return chats

      // Otherwise, replace the chat at the found index with the currentChat
      return [...chats.slice(0, index), currentChat, ...chats.slice(index + 1)]
    })
  }, [currentChat])

  const addChat = (chat: IChat) => {
    if (chat.messages.length === 0) {
      chat.messages.push(INITIAL_MESSAGE)
    }
    if (Object.keys(chat?.steps || {}).length === 0) {
      chat.steps = INITIAL_STEPS
    }
    setChats(prev => [
      ...prev,
      {
        ...chat,
        id: uuidv4(),
      },
    ])
    showChat(chat)
  }

  const updateCurrentChat = (chat: IChat) => {
    setCurrentChat(chat)
  }

  const showChat = (chat: IChat) => {
    updateChatsByCurrent(currentChat)
    setCurrentChat(chat)
  }

  const setGameIdea = (gameIdea: IGameIdea) => {
    const newChat = { ...currentChat, gameIdea: gameIdea }
    updateCurrentChat({ ...newChat, ...updateStepStatus(newChat) })
  }

  const setGameplay = (gameplay: IGameplay) => {
    const newChat = { ...currentChat, gameplay }
    updateCurrentChat({ ...newChat, ...updateStepStatus(newChat) })
  }

  const setGameCategory = (gameCategory: string) => {
    const newChat = { ...currentChat, gameCategory }
    updateCurrentChat({ ...newChat, ...updateStepStatus(newChat) })
  }

  const setUserKeywords = (userKeywords: string) => {
    const newChat = { ...currentChat, userKeywords }
    updateCurrentChat({ ...newChat, ...updateStepStatus(newChat) })
  }

  const setCollections = (collections: any) => {
    const newChat = { ...currentChat, collections }
    updateCurrentChat({ ...newChat, ...updateStepStatus(newChat) })
  }

  const addMessage = (message: IChatMessage) => {
    updateCurrentChat({ ...currentChat, messages: [...currentChat.messages, message] })
  }

  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => updateCurrentChat({ ...currentChat, messages: [] })

  const analyzeData = async (userInput?: string) => {
    if (!currentChat?.gameCategory) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: 'Please, choose a game category first.',
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      return
    }

    if (!currentChat?.gameIdea) {
      const isShowedGameIdeas = currentChat?.messages.filter(
        i => i.type === MESSAGE_TYPE_ENUM.GameIdea,
      ).length
      if (isShowedGameIdeas) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing game idea or inspire a new one.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      } else {
        if (userInput) {
          setUserKeywords(userInput)
          await generatedPrompt(GPT_PROMPT_ENUM.GameIdeaPrompt, currentChat, userInput)
          return
        }
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Sure thing! Please share keywords about your dream game.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      }
      return
    }

    if (!currentChat?.gameplay) {
      const isShowedGameplays = currentChat?.messages.filter(
        i => i.type === MESSAGE_TYPE_ENUM.Gameplay,
      ).length
      if (isShowedGameplays) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing gameplay or regenerate it.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      } else {
        await generatedPrompt(
          GPT_PROMPT_ENUM.GameplayPrompt,
          currentChat,
          currentChat.userKeywords || '',
        )
      }
      return
    }

    if (!currentChat?.collections?.length) {
      const isShowedCollections = currentChat?.messages.filter(
        i => i.type === MESSAGE_TYPE_ENUM.Collection,
      ).length
      if (isShowedCollections) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Please choose a collection or regenerate new ideas.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      } else {
        await generatedPrompt(
          GPT_PROMPT_ENUM.CollectionAssetPrompt,
          currentChat,
          currentChat.userKeywords || '',
        )
      }
      return
    }

    const lastMessage = currentChat.messages[currentChat.messages.length - 1]
    if (lastMessage.type === MESSAGE_TYPE_ENUM.CreateFinishQuestion && userInput) {
      const isConfirmed = await questionConfirm(lastMessage.text, userInput)
      if (isConfirmed) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Great! We will generate game objects for you.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return true
      }
      if (isConfirmed) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Okay, you can do game objects later.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return true
      }
    }

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: 'We already generate all your game assets for you, Do you confirm to create game objects L3vels system?',
      ai: true,
      type: MESSAGE_TYPE_ENUM.CreateFinishQuestion,
    })

    return true
  }
  const handleUserInput = async (userInput: string) => {
    switch (apiVersion) {
      case API_VERSION_ENUM.CreateV1:
        await analyzeData(userInput)
        return
      case API_VERSION_ENUM.ReportV1:
        await analyzeData(userInput)
        return
    }
  }

  const reportGeneration = async () => {}

  const handleRegenerate = async () => {
    setThinking(true)
    currentChat.messages = currentChat.messages.filter(
      i =>
        i.type !== MESSAGE_TYPE_ENUM.AI_MANUAL &&
        i.type !== MESSAGE_TYPE_ENUM.User &&
        i.type !== MESSAGE_TYPE_ENUM.Report,
    )
    const message = currentChat.messages[currentChat.messages.length - 1]
    switch (message.type) {
      case MESSAGE_TYPE_ENUM.GameIdea:
        if (!currentChat?.gameCategory) {
          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: 'Choose game a game category first.',
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })
          break
        }
        await generatedPrompt(
          GPT_PROMPT_ENUM.GameIdeaPrompt,
          currentChat,
          message.text,
          true,
          message,
        )
        break
      case MESSAGE_TYPE_ENUM.Gameplay:
        await generatedPrompt(
          GPT_PROMPT_ENUM.GameplayPrompt,
          currentChat,
          message.text,
          true,
          message,
        )
        break
      case MESSAGE_TYPE_ENUM.Collection:
        await generatedPrompt(
          GPT_PROMPT_ENUM.CollectionAssetPrompt,
          currentChat,
          currentChat.userKeywords || '',
          true,
          message,
        )
        break
      default:
        // addMessage({
        //   id: 2,
        //   createdOn: Date.now(),
        //   text: `You can not call regenerate action on that stage.`,
        //   ai: true,
        //   type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        // })
        break
    }
    setThinking(false)
  }

  const handleGoToNextStep = async () => {
    setThinking(true)
    const isValid = await analyzeData()
    setThinking(false)
  }

  const updateStepStatus = (chat: IChat) => {
    const steps = INITIAL_STEPS
    if (!chat.gameCategory || !chat.gameIdea) {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.InProgress
    } else {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.gameplay) {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.CreateGameConcept] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.collections?.length) {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Pending
      steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.GenerateGameplay] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.InProgress
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Completed

      if (!chat.collections[0].assets?.length) {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Pending
      } else {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Completed
      }
    }

    if (!chat.rewards?.length) {
      steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.Pending

      if (steps[CHAT_STEP_ENUM.GenerateCollections] === STEP_STATUS_ENUM.Completed) {
        steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.InProgress
      }
    } else {
      steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] = STEP_STATUS_ENUM.Completed
    }

    if (steps[CHAT_STEP_ENUM.GenerateAchievementsAndRewards] === STEP_STATUS_ENUM.Completed) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.InProgress

      if (chat.isCreateFinished) {
        steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.Completed
      }
    }

    if (steps[CHAT_STEP_ENUM.FinishAndCreate] === STEP_STATUS_ENUM.Completed) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.InProgress
    }

    return {
      steps: steps,
    }
  }

  const questionConfirm = async (question: string, answer: string): Promise<boolean> => {
    const prompt = questionConfirmPrompt(question, answer)
    const content = await callChatGPT(prompt)

    return content?.includes('yes') || false
  }

  const generatedPrompt = async (
    type: GPT_PROMPT_ENUM,
    chat: IChat,
    userInput: string,
    isRegenerated = false,
    regeneratedMessage?: IChatMessage,
  ) => {
    switch (type) {
      case GPT_PROMPT_ENUM.GameIdeaPrompt: {
        if (!isRegenerated) {
          addNotifyMessage(userInput, false)
        }
        const ideaAmount = 3
        const prompt = gameIdeaPrompt(
          userInput,
          currentChat?.gameCategory || '',
          ideaAmount,
          'JSON',
          800,
        )
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
      case GPT_PROMPT_ENUM.GameplayPrompt: {
        if (!isRegenerated) {
          addNotifyMessage('Right now we are going to generate gemaplay ideas', true)
        }
        const amount = 3
        const prompt = gameplayPrompt(
          userInput,
          currentChat?.gameIdea?.description || '',
          amount,
          'JSON',
          600,
        )

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
          text: `Here are ${amount} ideas for the Game Concept`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.Gameplay,
          gameplays: parseData.gameplays,
        }
        addMessage(newMsg)
        return
      }
      case GPT_PROMPT_ENUM.CollectionAssetPrompt: {
        const amount = 3
        const prompt = collectionPrompt(
          chat.name,
          chat.gameIdea?.description || '',
          chat.gameplay?.description || '',
          amount,
          'JSON',
          80,
          80,
          400,
          200,
          8,
          5,
          5,
        )
        const content = await callChatGPT(prompt)

        if (!content) {
          addNotifyMessage('Something wrong, Please try later!', true)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          addNotifyMessage('Something wrong, Please try later!', true)
          return
        }

        if (isRegenerated && regeneratedMessage) {
          regenerateMessage({
            ...regeneratedMessage,
            createdOn: Date.now(),
            collections: parseData.collections,
          })
          return
        }
        const newMsg: IChatMessage = {
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Amazing! Age of Nations started to seem fun! Here are some assets we can include in your game
          * Select all that apply`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.Collection,
          collections: parseData.collections,
        }
        addMessage(newMsg)
        return
      }
      case GPT_PROMPT_ENUM.RewardAchievementPrompt: {
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
          addNotifyMessage('Something wrong, Please try later!', true)
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
    }
  }

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const addNotifyMessage = (newValue: string, ai = false) => {
    const newMsg: IChatMessage = {
      id: uuidv4(),
      createdOn: Date.now(),
      text: newValue,
      ai: ai,
      type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      history: [],
    }

    addMessage(newMsg)
  }

  const callChatGPT = async (generatedPrompt: string) => {
    // const key = window.localStorage.getItem('api-key')
    // const key = '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' //Giga token
    //todo move it to env
    const openAPIKey = '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' //Edu token

    try {
      const response = await davinci(generatedPrompt, openAPIKey)
      const data = response.data.choices[0].message?.content
      return data
    } catch (err) {
      console.log(`Error: ${err} please try again later`)
      return ''
    }
  }

  return {
    messages: currentChat.messages,
    addMessage,
    clearMessages,
    clearChats,
    currentChat,
    showChat,
    updateCurrentChat,
    handleGoToNextStep,
    chats,
    addChat,
    handleUserInput,
    setGameIdea,
    setGameplay,
    setCollections,
    setGameCategory,
    handleRegenerate,
    apiVersions,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
  }
}

const useChatState = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChatState must be used within a useChatState')
  }
  return context
}

export { useChat, useChatState }
