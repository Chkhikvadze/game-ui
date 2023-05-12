import { useState, useContext, useEffect } from 'react'
import {
  ChatMessageType,
  ChatType,
  ChatStepEnum,
  StepStatusEnum,
  ChatMessageTypeEnum,
  INITIAL_CHAT,
  InitialMessage,
  InitialSteps,
} from '../types'
import { ChatContext } from '../context/ChatContext'
import { ToastContext } from 'contexts'
import { gameIdeaPrompt, gameplayPrompt, collectionPrompt } from '../utils/prompts'

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)
  const { setToast } = useContext(ToastContext)

  // console.log('gigaaaaa', currentChat)
  // const [messages, setMessages] = useState([InitialMessage])

  const addChat = (chat: ChatType) => {
    if (chat.messages.length === 0) {
      chat.messages.push(InitialMessage)
    }
    if (Object.keys(chat?.steps || {}).length === 0) {
      chat.steps = InitialSteps
    }
    if (!chat.currentStep) {
      chat.currentStep = INITIAL_CHAT.currentStep
    }
    setChats(prev => [...prev, chat])
    setCurrentChat(chat)
  }

  const addMessage = (message: ChatMessageType) => {
    setCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, message],
    })
  }
  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => setCurrentChat({ ...currentChat, messages: [] })

  // useEffect(() => {
  //   if (
  //     !currentChat?.gameCategory &&
  //     !currentChat?.messages.filter(i => i.type === ChatMessageTypeEnum.GameCategory).length
  //   ) {
  //     addMessage({
  //       id: 2,
  //       created_on: Date.now(),
  //       text: 'Which sort of category is your game about?',
  //       ai: true,
  //       type: ChatMessageTypeEnum.GameCategory,
  //     })
  //   }
  // }, [currentChat])

  const goToNextStep = () => {
    console.log('currentChat', currentChat)
    console.log(ChatStepEnum.CreateGameConcept === currentChat.currentStep.name, ' = aaaaaaa')

    if (
      currentChat?.currentStep?.name &&
      ChatStepEnum.CreateGameConcept === currentChat.currentStep.name
    ) {
      if (!currentChat?.gameCategory) {
        setToast({
          message: 'Choose a game category first',
          type: 'negative',
          open: true,
        })
        return
      }
      alert('go to next step')
      addMessage({
        id: 2,
        created_on: Date.now(),
        text: 'Sure thing! Please share keywords about your dream game.',
        ai: true,
        type: ChatMessageTypeEnum.AI_MANUAL,
      })
    }

    switch (currentChat.currentStep.name) {
      case ChatStepEnum.CreateGameConcept:
        break
    }
    // const currentStepIndex = currentChat?.steps?.findIndex(
    //   i => i.name === currentChat.currentStep.name,
    // )
    // if (currentChat.steps) {
    //   const nextStep = currentChat.steps[currentStepIndex || 0 + 1]
    //   setCurrentChat({
    //     ...currentChat,
    //     currentStep: nextStep,
    //   })
    //
  }

  const generatePrompt = (userInput: string, aiModel: string) => {
    switch (currentChat.currentStep.name) {
      case ChatStepEnum.CreateGameConcept:
        return gameIdeaPrompt(userInput, currentChat.gameCategory || '', 3, 'JSON', 200)

      // case ChatStepEnum.CreateGameplay:
      //   return gameplayPrompt
      // case ChatStepEnum.CreateCollection:
      //   return collectionPrompt
      // default:
      //   return gameIdeaPrompt
    }
  }

  return {
    messages: currentChat.messages,
    addMessage,
    clearMessages,
    clearChats,
    currentChat,
    setCurrentChat,
    goToNextStep,
    chats,
    addChat,
    generatePrompt,
  }
}

const useChatState = () => {
  const context = useContext(ChatContext)

  if (context === undefined) {
    throw new Error('useChatState must be used within a useChatState')
  }
  return context
}

export { useChat, useChatState }
