import { ReactNode, createContext } from 'react'
import useMessageCollection, { INITIAL_MESSAGE } from '../hooks/useMessageCollection'
import { ChatMessageType } from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  addMessage: (message: ChatMessageType) => {},
  clearMessages: () => {},
})

type ChatContextProviderProps = {
  children: ReactNode
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { messages, addMessage, clearMessages } = useMessageCollection()

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}
