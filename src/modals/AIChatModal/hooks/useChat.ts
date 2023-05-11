import { useState, useContext } from 'react'
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
  text: 'Ready to craft a decentralized game with L3 AI? Toss your game concept keywords our way!',
  ai: true,
  type: ChatMessageTypeEnum.AI,
  // queue: {
  //   id: 1,
  // }
}

export const INITIAL_CHAT: ChatType = {
  id: 1,
  name: 'Chat',
  created_on: Date.now(),
  messages: [InitialMessage],
  steps: InitialSteps,
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
