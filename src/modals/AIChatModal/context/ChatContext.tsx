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
  generatePrompt: (userInput: string, aiModel: string) => {},
  setGameIdea: (gameIdea: any) => {},
  setGameplay: (gameplay: any) => {},
  setCollections: (collections: any) => {},
  setGameCategory: (gameCategory: any) => {},
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
    generatePrompt,
    setGameIdea,
    setGameplay,
    setCollections,
    setGameCategory,
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
        generatePrompt,
        setGameIdea,
        setGameplay,
        setCollections,
        setGameCategory,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
