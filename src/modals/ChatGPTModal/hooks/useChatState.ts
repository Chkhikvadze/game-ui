import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const useChatState = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChatState must be used within a useChatState')
  }
  return context
}

export { useChatState }
