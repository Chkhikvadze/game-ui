import { ReactNode, createContext } from 'react'
import { useChat } from '../hooks/useChat'
import { IChatMessage, IChat, INITIAL_MESSAGE, INITIAL_CHAT } from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  apiVersions: ['L3-v1'],
  addMessage: (message: IChatMessage) => {},
  clearMessages: () => {},
  clearChats: () => {},
  handleGoToNextStep: () => {},
  addChat: (chat: IChat) => {},
  handleUserInput: (userInput: string, aiModel: string) => {},
  setGameIdea: (gameIdea: any) => {},
  setGameplay: (gameplay: any) => {},
  setCollections: (collections: any) => {},
  setGameCategory: (gameCategory: any) => {},
  showChat: (chat: IChat) => {},
  updateCurrentChat: (chat: IChat) => {},
  handleRegenerate: async () => {},
})

type ChatContextProviderProps = {
  children: ReactNode
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const {
    messages,
    addMessage,
    clearMessages,
    showChat,
    updateCurrentChat,
    chats,
    currentChat,
    clearChats,
    addChat,
    handleGoToNextStep,
    handleUserInput,
    handleRegenerate,
    setGameIdea,
    setGameplay,
    setCollections,
    setGameCategory,
    apiVersions,
  } = useChat()

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        showChat,
        updateCurrentChat,
        chats,
        currentChat,
        clearChats,
        addChat,
        handleGoToNextStep,
        handleUserInput,
        setGameIdea,
        setGameplay,
        setCollections,
        setGameCategory,
        handleRegenerate,
        apiVersions,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
