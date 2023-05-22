import { ReactNode, createContext } from 'react'
import { useChat } from '../hooks/useChat'
import {
  IChatMessage,
  IChat,
  INITIAL_MESSAGE,
  INITIAL_CHAT,
  API_VERSIONS,
  API_VERSION_ENUM,
  ICollection,
  IAchievement,
  IReward,
  IAsset,
} from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  apiVersions: API_VERSIONS,
  apiVersion: API_VERSION_ENUM.CreateV1,
  setAPIVersion: (apiVersion: API_VERSION_ENUM) => {},
  addMessage: (message: IChatMessage) => {},
  updateMessage: (newMessage: IChatMessage) => {},
  updateMessageCollection: (messageId: string, collection: ICollection) => {},
  updateMessageCollectionAsset: (collectionId: string, asset: IAsset) => {},
  clearMessages: () => {},
  clearChats: () => {},
  handleGoToNextStep: () => {},
  addChat: (chat: IChat) => {},
  handleUserInput: (userInput: string, aiModel: string) => {},
  setGameIdea: (gameIdea: any) => {},
  setGameplay: (gameplay: any) => {},
  addRemoveCollection: (isAdd: boolean, collection: ICollection) => {},
  addRemoveRewardAchievement: (isAdd: boolean, reward?: IReward, achievement?: IAchievement) => {},
  setGameCategory: (gameCategory: any) => {},
  showChat: (chat: IChat) => {},
  handleRegenerate: async () => {},
  thinking: false,
  setThinking: (thinking: boolean) => {},
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
    updateMessage,
    chats,
    currentChat,
    clearChats,
    addChat,
    handleGoToNextStep,
    handleUserInput,
    handleRegenerate,
    setGameIdea,
    setGameplay,
    addRemoveCollection,
    addRemoveRewardAchievement,
    updateMessageCollection,
    updateMessageCollectionAsset,
    setGameCategory,
    apiVersions,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
  } = useChat()

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        showChat,
        chats,
        currentChat,
        updateMessage,
        clearChats,
        addChat,
        handleGoToNextStep,
        handleUserInput,
        setGameIdea,
        updateMessageCollection,
        updateMessageCollectionAsset,
        setGameplay,
        addRemoveCollection,
        addRemoveRewardAchievement,
        setGameCategory,
        handleRegenerate,
        apiVersions,
        apiVersion,
        setAPIVersion,
        thinking,
        setThinking,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
