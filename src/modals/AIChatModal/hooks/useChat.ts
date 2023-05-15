import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ChatContext } from '../context/ChatContext'
import {
  API_VERSIONS,
  API_VERSION_ENUM,
  CHAT_STEP_ENUM,
  GPT_PROMPT_ENUM,
  IChat,
  IChatMessage,
  ICollection,
  IGameIdea,
  IGameplay,
  INITIAL_CHAT,
  INITIAL_MESSAGE,
  INITIAL_STEPS,
  MESSAGE_TYPE_ENUM,
  STEP_STATUS_ENUM,
} from '../types'
import { useChatPrompts } from './useChatPrompts'
import { simulateConfirmAI } from '../utils/test'

const useChat = () => {
  const apiVersions = API_VERSIONS
  const initialChats: IChat[] = JSON.parse(localStorage.getItem('chats') || 'null') || [
    INITIAL_CHAT,
  ]
  const [chats, setChats] = useState<IChat[]>(initialChats)
  const [currentChat, setCurrentChat] = useState<IChat>(initialChats[0])

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

  const addMessage = (message: IChatMessage) => {
    setCurrentChat(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }))
  }

  const regenerateMessage = (message: IChatMessage) => {
    setCurrentChat(prevState => {
      //todo need fix history
      // if (!message?.history) {
      //   message.history = []
      // }
      // message?.history?.push(message)
      const index = prevState.messages.findIndex(message => message.id === message.id)
      // If no chat was found, return the original array
      if (index === -1) return prevState

      // Otherwise, replace the chat at the found index with the currentChat
      const newMessages = [
        ...prevState.messages.slice(0, index),
        message,
        ...prevState.messages.slice(index + 1),
      ]

      return {
        ...prevState,
        messages: newMessages,
      }
    })
  }

  const updateMessageCollection = (messageId: string, collection: ICollection) => {
    setCurrentChat(prevState => {
      const updatedMessages = prevState.messages.map(message => {
        if (message.id !== messageId) {
          return message
        }

        const updatedCollections = message.collections?.map(c => {
          if (c.id === collection.id) {
            return collection
          }
          return c
        })

        return { ...message, collections: updatedCollections }
      })
      return {
        ...prevState,
        messages: updatedMessages,
      }
    })
  }

  const { generatedAI, questionConfirmAI } = useChatPrompts(
    addNotifyMessage,
    addMessage,
    regenerateMessage,
    updateMessageCollection,
  )

  // Save chats to localStorage whenever it is updated
  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  // console.log(currentChat)

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

  const showChat = (chat: IChat) => {
    updateChatsByCurrent(currentChat)
    setCurrentChat(chat)
  }

  const setGameIdea = (gameIdea?: IGameIdea) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameIdea, name: gameIdea?.name || 'Game By L3 AI' }

      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setGameplay = (gameplay?: IGameplay) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameplay }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setGameCategory = (gameCategory: string) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, gameCategory }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setIsCreateFinished = (isCreateFinished: boolean) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, isCreateFinished }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const setUserKeywords = (userKeywords: string) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, userKeywords }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const addRemoveCollection = (isAdd: boolean, collection: ICollection) => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState }

      if (!newChat?.collections) newChat.collections = []
      const index = newChat.collections?.findIndex(c => c.id === collection.id)
      if (isAdd) {
        if (index >= 0) return prevState
        newChat.collections = [...newChat.collections, collection]
      } else {
        if (index === -1) return prevState
        newChat.collections = [
          ...newChat.collections.slice(0, index),
          ...newChat.collections.slice(index + 1),
        ]
      }

      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }

  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => {
    setCurrentChat(prevState => {
      const newChat = { ...prevState, collections: [] }
      return {
        ...newChat,
        ...updateStepStatus(newChat),
      }
    })
  }
  const analyzeGameIdea = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameIdea) {
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
        return false
      } else {
        if (userInput) {
          setUserKeywords(userInput)
          await generatedAI(GPT_PROMPT_ENUM.GameIdeaPrompt, chat, userInput)
          return false
        }
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Sure thing! Please share keywords about your dream game.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      }
      return false
    }
    return true
  }
  const analyzeCategory = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameCategory) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: 'Please, choose a game category first.',
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      return false
    }
    return true
  }

  const analyzeGameplay = async (chat: IChat, userInput?: string): Promise<boolean> => {
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
        return false
      } else {
        await generatedAI(
          GPT_PROMPT_ENUM.GameplayPrompt,
          currentChat,
          currentChat.userKeywords || '',
        )
        return false
      }
    }
    return true
  }

  const analyzeCollections = async (chat: IChat, userInput?: string): Promise<boolean> => {
    const isShowedCollections = chat?.messages.filter(
      i => i.type === MESSAGE_TYPE_ENUM.Collection,
    ).length
    if (isShowedCollections) {
      if (!chat?.collections?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Please choose a collection or regenerate new ideas.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }
    } else {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Okay, We.`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      await generatedAI(GPT_PROMPT_ENUM.CollectionAssetPrompt, chat, chat.userKeywords || '')
      return false
    }
    return true
  }

  const analyzeCreateFinish = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (chat?.isCreateFinished) return true

    if (!userInput) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Having already made selections for Collections, Assets, properties, and attributes, are you now inclined to forge game objects? Kindly confirm your intent.`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.CreateFinishQuestion,
      })
      return false
    }

    debugger
    //todo analyze if last answer is yes, to create objects
    const lastMessage = chat.messages[chat.messages.length - 1]
    if (lastMessage.type === MESSAGE_TYPE_ENUM.CreateFinishQuestion && userInput !== undefined) {
      //todo replace simulation of ChatGPT

      // const isConfirmed = await questionConfirmAI(lastMessage.text, userInput)
      const isConfirmed = await simulateConfirmAI(lastMessage.text, userInput)
      if (isConfirmed) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Great! We will generate game objects for you.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        //todo mirian save game objects

        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Game object created.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Creation breathes life into the collection's objects.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `The art of creation unfolds: assets, properties, attributes.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Embark on triumph and unlock rewards and achievements.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        const gameLink = 'https://www.google.com' //todo put game link

        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Enter the gateway to your game: [${chat.name}?](${gameLink}), behold the wonders!`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        setIsCreateFinished(true)

        //todo mirian generate game objects

        return true
      } else {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Okay, you can do game objects later.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }
    }
    return true
  }

  const analyzeData = async (chat: IChat, userInput?: string) => {
    if (!(await analyzeCategory(chat, userInput))) return

    //  if(!await analyzeGameIdea(chat, userInput)) return

    //  if(!await analyzeGameplay(chat, userInput)) return

    if (!(await analyzeCollections(chat, userInput))) return

    if (!(await analyzeCreateFinish(chat, userInput))) return

    debugger

    // addMessage({
    //   id: uuidv4(),
    //   createdOn: Date.now(),
    //   text: 'We already generate all your game assets for you, Do you confirm to create game objects L3vels system?',
    //   ai: true,
    //   type: MESSAGE_TYPE_ENUM.CreateFinishQuestion,
    // })

    //save record in database here Mirian

    return true
  }

  const handleUserInput = async (userInput: string) => {
    switch (apiVersion) {
      case API_VERSION_ENUM.CreateV1:
        await analyzeData(currentChat, userInput)
        return
      case API_VERSION_ENUM.ReportV1:
        await analyzeData(currentChat, userInput)
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
        await generatedAI(GPT_PROMPT_ENUM.GameIdeaPrompt, currentChat, message.text, true, message)
        break
      case MESSAGE_TYPE_ENUM.Gameplay:
        await generatedAI(GPT_PROMPT_ENUM.GameplayPrompt, currentChat, message.text, true, message)
        break
      case MESSAGE_TYPE_ENUM.Collection:
        await generatedAI(
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
    const isValid = await analyzeData(currentChat)
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
    }

    if (chat.isCreateFinished) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.Completed
    }

    if (steps[CHAT_STEP_ENUM.FinishAndCreate] === STEP_STATUS_ENUM.Completed) {
      steps[CHAT_STEP_ENUM.FinishAndCreate] = STEP_STATUS_ENUM.InProgress
    }

    return {
      steps: steps,
    }
  }

  return {
    messages: currentChat.messages,
    addMessage,
    clearMessages,
    clearChats,
    currentChat,
    showChat,
    handleGoToNextStep,
    chats,
    addChat,
    handleUserInput,
    setGameIdea,
    setGameplay,
    addRemoveCollection,
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
