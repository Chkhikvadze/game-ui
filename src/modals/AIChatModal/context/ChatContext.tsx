import { ReactNode, createContext } from 'react'
import { useChat } from '../hooks/useChat'
import { IChatMessage, IChat, INITIAL_MESSAGE, INITIAL_CHAT } from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  addMessage: (message: IChatMessage) => {},
  setCurrentChat: (chat: IChat) => {},
  clearMessages: () => {},
  clearChats: () => {},
  goToNextStep: () => {},
  addChat: (chat: IChat) => {},
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
