import { useState } from 'react'
import { ChatMessageType, ChatType } from '../types'

export const INITIAL_MESSAGE: ChatMessageType = {
  id: 1,
  created_on: Date.now(),
  text: 'Ready to craft a decentralized game with L3 AI? Toss your game concept keywords our way!',
  ai: true,
}

export const INITIAL_CHAT: ChatType = {
  id: 1,
  name: 'Chat',
  created_on: Date.now(),
  messages: [INITIAL_MESSAGE],
}

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)

  // console.log('gigaaaaa', currentChat)
  // const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const addChat = (chat: ChatType) => {
    if (chat.messages.length === 0) {
      chat.messages.push(INITIAL_MESSAGE)
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

export { useChat }
