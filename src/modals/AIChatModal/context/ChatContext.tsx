import { ReactNode, createContext } from 'react'
import { useChat } from '../hooks/useChat'
import { ChatMessageType, ChatType, InitialMessage, INITIAL_CHAT } from '../types'

export const ChatContext = createContext({
  messages: [InitialMessage],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  addMessage: (message: ChatMessageType) => {},
  setCurrentChat: (chat: ChatType) => {},
  clearMessages: () => {},
  clearChats: () => {},
  goToNextStep: () => {},
  addChat: (chat: ChatType) => {},
})

type ChatContextProviderProps = {
  children: ReactNode
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const {
    messages,
    addMessage,
    clearMessages,
    setCurrentChat,
    chats,
    currentChat,
    clearChats,
    addChat,
    goToNextStep,
  } = useChat()

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        setCurrentChat,
        chats,
        currentChat,
        clearChats,
        addChat,
        goToNextStep,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
