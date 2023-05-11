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
    switch (currentChat.currentStep.name) {
      case ChatStepEnum.CreateGameConcept:
      case ChatStepEnum.GenerateGameplay:
    }
    const currentStepIndex = currentChat?.steps?.findIndex(
      i => i.name === currentChat.currentStep.name,
    )
    if (currentChat.steps) {
      const nextStep = currentChat.steps[currentStepIndex || 0 + 1]
      setCurrentChat({
        ...currentChat,
        currentStep: nextStep,
      })
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
