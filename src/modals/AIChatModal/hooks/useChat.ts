import { useState, useContext, useEffect } from 'react'
import {
  ChatMessageType,
  ChatType,
  ChatStepEnum,
  StepStatusEnum,
  ChatMessageTypeEnum,
} from '../types'
import { ChatContext } from '../context/ChatContext'

const InitialSteps = [
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
  name: 'Gmar',
  created_on: Date.now(),
  messages: [InitialMessage],
  steps: InitialSteps,
  currentStep: {
    name: ChatStepEnum.CreateGameConcept,
    status: StepStatusEnum.InProgress,
  },
  // active_step:
}

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)

  // console.log('gigaaaaa', currentChat)
  // const [messages, setMessages] = useState([InitialMessage])

  const addChat = (chat: ChatType) => {
    if (chat.messages.length === 0) {
      chat.messages.push(InitialMessage)
    }
    if (Object.keys(chat?.steps || {}).length === 0) {
      chat.steps = InitialSteps
    }
    if (!chat.currentStep) {
      chat.currentStep = INITIAL_CHAT.currentStep
    }
    setChats(prev => [...prev, chat])
    setCurrentChat(chat)
  }

  const addMessage = (message: ChatMessageType) => {
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, message],
    })
  }
  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => setCurrentChat({ ...currentChat, messages: [] })

  useEffect(() => {
    if (
      !currentChat?.gameCategory &&
      !currentChat?.messages.filter(i => i.type === ChatMessageTypeEnum.GameCategory).length
    ) {
      addMessage({
        id: 2,
        created_on: Date.now(),
        text: 'Which sort of category is your game about?',
        ai: true,
        type: ChatMessageTypeEnum.GameCategory,
      })
    }
  }, [currentChat])

  return {
    messages: currentChat.messages,
    addMessage,
    clearMessages,
    clearChats,
    currentChat,
    setCurrentChat,
    chats,
    addChat,
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
