import { useState, useContext, useEffect, useCallback } from 'react'
import {
  IChatMessage,
  IChat,
  CHAT_STEP_ENUM,
  STEP_STATUS_ENUM,
  CHAT_MESSAGE_ENUM,
  INITIAL_CHAT,
  INITIAL_MESSAGE,
  INITIAL_STEPS,
  GPT_PROMPT_ENUM,
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

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)
  // console.log(chats, 'chats')
  // const [curruntMessage, setCurrentMessage] = useState<IChatMessage>(INITIAL_MESSAGE)

  // console.log('gigaaaaa', currentChat)
  // const [messages, setMessages] = useState([INITIAL_MESSAGE])

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
    if (!chat.currentStep) {
      chat.currentStep = INITIAL_CHAT.currentStep
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

  const setGameIdea = (gameIdea: any) => {
    updateCurrentChat({
      ...currentChat,
      gameIdea: gameIdea ? gameIdea : null,
      name: gameIdea?.title || null,
      ...updateStepStatus(currentChat),
    })
  }

  const setGameplay = (gameplay: any) => {
    updateCurrentChat({
      ...currentChat,
      gameplay,
      ...updateStepStatus(currentChat),
    })
  }

  const setGameCategory = (gameCategory: any) => {
    updateCurrentChat({
      ...currentChat,
      gameCategory: gameCategory,
      ...updateStepStatus(currentChat),
    })
  }

  const setCollections = (collections: any) => {
    updateCurrentChat({
      ...currentChat,
      collections,
      ...updateStepStatus(currentChat),
    })
  }

  const addMessage = (message: IChatMessage) => {
    updateCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, message],
    })
  }
  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => updateCurrentChat({ ...currentChat, messages: [] })

  const analyzeData = async (userInput?: string) => {
    if (!currentChat?.gameCategory) {
      addMessage({
        id: 2,
        created_on: Date.now(),
        text: 'Choose game a game category first.',
        ai: true,
        type: CHAT_MESSAGE_ENUM.AI_MANUAL,
      })
      return
    }

    if (!currentChat?.gameIdea) {
      const isShowedGameIdeas = currentChat?.messages.filter(
        i => i.type === CHAT_MESSAGE_ENUM.GameIdea,
      ).length
      if (isShowedGameIdeas) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: 'Pick an existing game idea or inspire a new one.',
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
      } else {
        if (userInput) {
          generatedPrompt(GPT_PROMPT_ENUM.GameIdeaPrompt, currentChat, userInput, 'ChatGPT')
          return
        }
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: 'Sure thing! Please share keywords about your dream game.',
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
      }
      return
    }

    if (!currentChat?.gameplay) {
      const isShowedGameplays = currentChat?.messages.filter(
        i => i.type === CHAT_MESSAGE_ENUM.Gameplay,
      ).length
      if (isShowedGameplays) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: 'Pick an existing gameplay or regenerate it.',
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
      } else {
        generatedPrompt(
          GPT_PROMPT_ENUM.GameplayPrompt,
          currentChat,
          currentChat.userKeywords || '',
          'Dale',
        )
      }
      return
    }

    if (!currentChat?.collections?.length) {
      const isShowedCollections = currentChat?.messages.filter(
        i => i.type === CHAT_MESSAGE_ENUM.Gameplay,
      ).length
      if (isShowedCollections) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: `Please choose a collection or regenerate new ideas.`,
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
      } else {
        generatedPrompt(
          GPT_PROMPT_ENUM.CollectionAssetPrompt,
          currentChat,
          currentChat.userKeywords || '',
          'Dale',
        )
      }
      return
    }

    const lastMessage = currentChat.messages[currentChat.messages.length - 1]
    if (lastMessage.type === CHAT_MESSAGE_ENUM.CreateFinishQuestion && userInput) {
      const isConfirmed = await questionConfirm(lastMessage.text, userInput)
      if (isConfirmed) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: `Great! We will generate game objects for you.`,
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
        return true
      }
      if (isConfirmed) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: `Okay, you can do game objects later.`,
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
        return true
      }
    }

    addMessage({
      id: 2,
      created_on: Date.now(),
      text: 'We already generate all your game assets for you, Do you confirm to create game objects L3vels system?',
      ai: true,
      type: CHAT_MESSAGE_ENUM.CreateFinishQuestion,
    })

    return true
  }
  const handleUserInput = async (userInput: string, aiModel: string) => {
    analyzeData(userInput)
  }

  const handleRegenerate = async () => {
    const isValid = analyzeData()
  }

  const handleGoToNextStep = () => {
    const isValid = analyzeData()
  }

  const updateStepStatus = (chat: IChat) => {
    const steps = INITIAL_STEPS
    const newCurrentStep = chat.currentStep
    if (!chat.gameCategory || !chat.gameIdea) {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.Active
    } else {
      steps[CHAT_STEP_ENUM.CreateGameConcept] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.gameplay) {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Active
    } else {
      steps[CHAT_STEP_ENUM.GenerateGameplay] = STEP_STATUS_ENUM.Completed
    }

    if (!chat.collections?.length) {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Active
      steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Active
    } else {
      steps[CHAT_STEP_ENUM.GenerateCollections] = STEP_STATUS_ENUM.Completed

      if (!chat.collections[0].assets?.length) {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Active
      } else {
        steps[CHAT_STEP_ENUM.GenerateAssets] = STEP_STATUS_ENUM.Completed
      }
    }

    return {
      steps: steps,
      currentStep: newCurrentStep,
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
    aiModel: string,
  ) => {
    switch (type) {
      case GPT_PROMPT_ENUM.GameIdeaPrompt: {
        updateMessage(userInput, false, aiModel)
        const ideaAmount = 3
        const prompt = gameIdeaPrompt(
          userInput,
          currentChat?.gameCategory || '',
          ideaAmount,
          'JSON',
          400,
        )
        const content = await callChatGPT(prompt)

        if (!content) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Here is ${ideaAmount} ideas for Game Concept`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.GameIdea,
          gameIdeas: parseData.ideas,
        }
        addMessage(newMsg)
        // setCurrentChat({
        //   ...currentChat,
        //   //tslint:disable-next-line: no-any
        //   // gameIdeas: newMsg.jsonData,
        // })

        // if (data) updateMessage(data, true, aiModel)
        return
      }
      case GPT_PROMPT_ENUM.GameplayPrompt: {
        updateMessage(userInput, false, aiModel)
        const amount = 3
        const prompt = gameplayPrompt(
          userInput,
          currentChat?.gameIdea?.description || '',
          amount,
          'JSON',
          400,
        )
        const content = await callChatGPT(prompt)

        if (!content) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Here are ${amount} ideas for the Game Concept`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.Gameplay,
          gameplays: parseData.gameplays,
        }
        addMessage(newMsg)
        return
      }
      case GPT_PROMPT_ENUM.CollectionAssetPrompt: {
        updateMessage(userInput, false, aiModel)
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
        const content = await callChatGPT(userInput)

        if (!content) {
          updateMessage('Something wrong, Please try later!', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Something wrong, Please try later!', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Amazing! Age of Nations started to seem fun! Here are some assets we can include in your game
          * Select all that apply`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.Collection,
          collections: parseData.collections,
        }
        addMessage(newMsg)
        return
      }
      case GPT_PROMPT_ENUM.RewardAchievementPrompt: {
        updateMessage(userInput, false, aiModel)
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
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Something wrong, Please try later!', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Great! Here are some rewards and achievements we can include in your game`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.RewardAchievement,
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
  const updateMessage = (newValue: string, ai = false, aiModel: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000)
    const newMsg: IChatMessage = {
      id: id,
      created_on: Date.now(),
      text: newValue,
      ai: ai,
      aiModel: `${aiModel}`,
      type: CHAT_MESSAGE_ENUM.AI_MANUAL,
    }

    addMessage(newMsg)
  }

  type AiModelOption = 'ChatGPT' | 'DALL·E'

  const options: AiModelOption[] = ['ChatGPT', 'DALL·E']

  const callChatGPT = async (generatedPrompt: string) => {
    // const key = window.localStorage.getItem('api-key')
    // const key = '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' //Giga token
    //todo move it to env
    const openAPIKey = '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' //Edu token

    try {
      const response = await davinci(generatedPrompt, openAPIKey)
      const data = response.data.choices[0].message?.content
      return data
      // if (aiModel === options[0]) {

      // } else {
      //   // const response = await dalle(userInput, openAPIKey)
      //   // const data = response.data.data[0].url
      //   // return data
      // }
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
