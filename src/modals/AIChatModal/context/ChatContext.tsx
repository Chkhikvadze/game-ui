import { ReactNode, createContext } from 'react'
import { useChat, InitialMessage, INITIAL_CHAT } from '../hooks/useChat'
import { ChatMessageType, ChatType } from '../types'

export const ChatContext = createContext({
  messages: [InitialMessage],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  addMessage: (message: ChatMessageType) => {},
  setCurrentChat: (chat: ChatType) => {},
  clearMessages: () => {},
  clearChats: () => {},
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
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
