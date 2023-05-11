import { useState } from 'react'
import { ChatMessageType, ChatType } from '../types'

export const INITIAL_MESSAGE: ChatMessageType = {
  id: 1,
  created_on: Date.now(),
  text: '**Hello!** *How can I help you today?*',
  ai: true,
}

export const INITIAL_CHAT = {
  id: 1,
  name: 'Chat',
  created_on: Date.now(),
  messages: [],
  ai: true,
}

const useMessageCollection = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const addChat = (chat: ChatType) => {
    setChats(prev => [...prev, chat])
  }

  const addMessage = (message: ChatMessageType) => {
    setMessages(prev => [...prev, message])
  }

  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => setMessages([INITIAL_MESSAGE])

  return {
    messages,
    addMessage,
    clearMessages,
  }
}

export default useMessageCollection
