import { ReactNode, createContext } from 'react'
import { API_VERSIONS, INITIAL_CHAT, INITIAL_MESSAGE } from '../constants'
import { useChat } from '../hooks/useChat'
import {
  IChatMessage,
  IChat,
  API_VERSION_ENUM,
  ICollection,
  IAchievement,
  IReward,
  IAsset,
  IAssetMedia,
} from '../types'

export const ChatContext = createContext({
  messages: [INITIAL_MESSAGE],
  chats: [INITIAL_CHAT],
  currentChat: INITIAL_CHAT,
  apiVersions: API_VERSIONS,
  apiVersion: API_VERSION_ENUM.CreateV1,
  setAPIVersion: (apiVersion: API_VERSION_ENUM) => {},
  addMessage: (message: IChatMessage) => {},
  updateMessage: (id: string, newMessage: Partial<IChatMessage>) => {},
  updateMessageCollection: (messageId: string, collection: ICollection) => {},
  updateMessageCollectionAsset: (collectionId: string, asset: IAsset) => {},
  updateAsset: (collectionId: string, assetId: number, fields: Partial<IAsset>) => {},
  clearMessages: () => {},
  clearChats: () => {},
  handleGoToNextStep: () => {},
  addChat: (chat: IChat) => {},
  handleUserInput: (userInput: string, aiModel: string) => {},
  setGameMedias: (medias: IAssetMedia[]) => {},
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
  initialApiVersion?: API_VERSION_ENUM
}

export const ChatContextProvider = ({
  children,
  initialApiVersion = API_VERSION_ENUM.CreateV1,
}: ChatContextProviderProps) => {
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
    setGameMedias,
    addRemoveCollection,
    addRemoveRewardAchievement,
    updateMessageCollection,
    updateMessageCollectionAsset,
    updateAsset,
    setGameCategory,
    apiVersions,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
  } = useChat({ initialApiVersion })

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
        setGameMedias,
        updateMessageCollection,
        updateMessageCollectionAsset,
        updateAsset,
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
