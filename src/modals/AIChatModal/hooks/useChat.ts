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
import { gameIdeaPrompt, gameplayPrompt, collectionPrompt, parseGPTContent } from '../utils/prompts'
import { davinci } from 'modals/AIChatModal/utils/davinci'
import { dalle } from 'modals/AIChatModal/utils/dalle'

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)
  // const [curruntMessage, setCurrentMessage] = useState<ChatMessageType>(InitialMessage)

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

  const setGameIdea = (gameIdea: any) => {
    setCurrentChat({
      ...currentChat,
      gameIdea,
      gameName: gameIdea.title,
    })
  }

  const setGameplay = (gameplay: any) => {
    setCurrentChat({
      ...currentChat,
      gameplay,
    })
  }

  const setCollections = (collections: any) => {
    setCurrentChat({
      ...currentChat,
      collections,
    })
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

  console.log('currentChat', currentChat)

  const goToNextStep = () => {
    if (
      currentChat?.currentStep?.name &&
      ChatStepEnum.CreateGameConcept === currentChat.currentStep.name
    ) {
      if (!currentChat?.gameCategory) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: 'Choose game a game category first.',
          ai: true,
          type: ChatMessageTypeEnum.AI_MANUAL,
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

  const updateStepStatus = (stepName: string, status: StepStatusEnum) => {
    setCurrentChat({
      ...currentChat,
      steps: {
        ...currentChat.steps,
        [stepName]: status,
      },
    })
  }

  const generatePrompt = async (userInput: string, aiModel: string) => {
    switch (currentChat.currentStep.name) {
      case ChatStepEnum.CreateGameConcept: {
        updateMessage(userInput, false, aiModel)
        const ideaAmount = 3
        const prompt = gameIdeaPrompt(
          userInput,
          currentChat?.gameCategory || '',
          ideaAmount,
          'JSON',
          400,
        )
        const content = await callChatGPT(userInput, prompt, aiModel)

        if (!content) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: ChatMessageType = {
          id: id,
          created_on: Date.now(),
          text: `Here is ${ideaAmount} ideas for Game Concept`,
          ai: true,
          aiModel: `${aiModel}`,
          type: ChatMessageTypeEnum.GameIdea,
          jsonData: parseData.ideas,
        }
        addMessage(newMsg)
        // setCurrentChat({
        //   ...currentChat,
        //   //tslint:disable-next-line: no-any
        //   // gameIdeas: newMsg.jsonData,
        // })

        // if (data) updateMessage(data, true, aiModel)
        return
      }
      case ChatStepEnum.GenerateGameplay: {
        updateMessage(userInput, false, aiModel)
        const amount = 3
        const prompt = gameplayPrompt(
          userInput,
          currentChat?.gameIdea?.description || '',
          amount,
          'JSON',
          400,
        )
        const content = await callChatGPT(userInput, prompt, aiModel)

        if (!content) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const parseData = parseGPTContent(content)
        if (!parseData) {
          updateMessage('Please, provide more details to generate idea', true, aiModel)
          return
        }

        const id = Date.now() + Math.floor(Math.random() * 1000000)
        const newMsg: ChatMessageType = {
          id: id,
          created_on: Date.now(),
          text: `Here is ${amount} ideas of the Gameplay`,
          ai: true,
          aiModel: `${aiModel}`,
          type: ChatMessageTypeEnum.Gameplay,
          jsonData: parseData.gameplays,
        }
        addMessage(newMsg)
        return
      }
    }
  }

  /**
   * Adds a new message to the chat.
   *
   * @param {string} newValue - The text of the new message.
   * @param {boolean} [ai=false] - Whether the message was sent by an AI or the user.
   */
  const updateMessage = (newValue: string, ai = false, aiModel: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000)
    const newMsg: ChatMessageType = {
      id: id,
      created_on: Date.now(),
      text: newValue,
      ai: ai,
      aiModel: `${aiModel}`,
      type: ChatMessageTypeEnum.AI_MANUAL,
    }

    addMessage(newMsg)
  }

  type AiModelOption = 'ChatGPT' | 'DALL·E'

  const options: AiModelOption[] = ['ChatGPT', 'DALL·E']

  const callChatGPT = async (userInput: string, generatedPrompt: string, aiModel: string) => {
    // const key = window.localStorage.getItem('api-key')
    // const key = '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' //Giga token
    //todo move it to env
    const openAPIKey = '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' //Edu token

    try {
      if (aiModel === options[0]) {
        const response = await davinci(generatedPrompt, openAPIKey)
        const data = response.data.choices[0].message?.content
        return data
      } else {
        const response = await dalle(userInput, openAPIKey)
        const data = response.data.data[0].url
        return data
      }
    } catch (err) {
      console.log(`Error: ${err} please try again later`)
      return ''
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
    setGameIdea,
    setGameplay,
    setCollections,
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
