import { useState } from 'react'
import { ChatMessageType } from '../types'

export const INITIAL_MESSAGE: ChatMessageType = {
  id: 1,
  createdAt: Date.now(),
  text: '**Hello!** *How can I help you today?*',
  ai: true,
}

const useMessageCollection = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const addMessage = (message: ChatMessageType) => {
    setMessages(prev => [...prev, message])
  }

  const clearMessages = () => setMessages([INITIAL_MESSAGE])

  return {
    messages,
    addMessage,
    clearMessages,
  }
}

export default useMessageCollection
