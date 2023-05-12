import { useState, useContext, useEffect } from 'react'
import {
  IChatMessage,
  IChat,
  CHAT_STEP_ENUM,
  STEP_STATUS_ENUM,
  CHAT_MESSAGE_ENUM,
  INITIAL_CHAT,
  INITIAL_MESSAGE,
  INITIAL_STEPS,
} from '../types'
import { ChatContext } from '../context/ChatContext'
import { gameIdeaPrompt, gameplayPrompt, collectionPrompt, parseGPTContent } from '../utils/prompts'
import { davinci } from 'modals/AIChatModal/utils/davinci'
import { dalle } from 'modals/AIChatModal/utils/dalle'

const useChat = () => {
  const [chats, setChats] = useState([INITIAL_CHAT])
  const [currentChat, setCurrentChat] = useState(INITIAL_CHAT)
  // const [curruntMessage, setCurrentMessage] = useState<IChatMessage>(INITIAL_MESSAGE)

  // console.log('gigaaaaa', currentChat)
  // const [messages, setMessages] = useState([INITIAL_MESSAGE])

  const addChat = (chat: IChat) => {
    if (chat.messages.length === 0) {
      chat.messages.push(INITIAL_MESSAGE)
    }
    if (Object.keys(chat?.steps || {}).length === 0) {
      chat.steps = INITIAL_STEPS
    }
    if (!chat.currentStep) {
      chat.currentStep = INITIAL_CHAT.currentStep
    }
    setChats(prev => [...prev, chat])
    showChat(chat)
  }

  const updateCurrentChat = (chat: IChat) => {
    setCurrentChat(chat)
  }

  const showChat = (chat: IChat) => {
    setCurrentChat(chat)
  }

  const setGameIdea = (gameIdea: any) => {
    const newStepStatus = updateStepStatus(
      CHAT_STEP_ENUM.CreateGameConcept,
      gameIdea ? STEP_STATUS_ENUM.Completed : STEP_STATUS_ENUM.Active,
    )
    updateCurrentChat({
      ...currentChat,
      gameIdea: gameIdea ? gameIdea : null,
      gameName: gameIdea?.title || null,
      ...newStepStatus,
    })
  }

  const setGameplay = (gameplay: any) => {
    const newStepStatus = updateStepStatus(
      CHAT_STEP_ENUM.CreateGameConcept,
      gameplay ? STEP_STATUS_ENUM.Completed : STEP_STATUS_ENUM.Active,
    )
    updateCurrentChat({
      ...currentChat,
      gameplay,
      ...newStepStatus,
    })
  }

  const setGameCategory = (gameCategory: any) => {
    updateCurrentChat({
      ...currentChat,
      gameCategory: gameCategory,
    })
  }

  const setCollections = (collections: any) => {
    updateCurrentChat({
      ...currentChat,
      collections,
    })
  }

  const addMessage = (message: IChatMessage) => {
    updateCurrentChat({
      ...currentChat,
      messages: [...currentChat.messages, message],
    })
  }
  const clearChats = () => setChats([INITIAL_CHAT])

  const clearMessages = () => updateCurrentChat({ ...currentChat, messages: [] })

  // useEffect(() => {
  //   if (
  //     !currentChat?.gameCategory &&
  //     !currentChat?.messages.filter(i => i.type === CHAT_MESSAGE_ENUM.GameCategory).length
  //   ) {
  //     addMessage({
  //       id: 2,
  //       created_on: Date.now(),
  //       text: 'Which sort of category is your game about?',
  //       ai: true,
  //       type: CHAT_MESSAGE_ENUM.GameCategory,
  //     })
  //   }
  // }, [currentChat])

  console.log('currentChat', currentChat)

  const goToNextStep = () => {
    if (
      currentChat?.currentStep?.name &&
      CHAT_STEP_ENUM.CreateGameConcept === currentChat.currentStep.name
    ) {
      if (!currentChat?.gameCategory) {
        addMessage({
          id: 2,
          created_on: Date.now(),
          text: 'Choose game a game category first.',
          ai: true,
          type: CHAT_MESSAGE_ENUM.AI_MANUAL,
        })
        return
      }
      addMessage({
        id: 2,
        created_on: Date.now(),
        text: 'Sure thing! Please share keywords about your dream game.',
        ai: true,
        type: CHAT_MESSAGE_ENUM.AI_MANUAL,
      })
    }

    switch (currentChat.currentStep.name) {
      case CHAT_STEP_ENUM.CreateGameConcept:
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

  const updateStepStatus = (name: string, status: STEP_STATUS_ENUM) => {
    let newCurrentStep = currentChat.currentStep

    const newSteps = currentChat.steps?.map(i => {
      if (i.name === name) {
        i.status = status
      }
      return i
    })
    if (currentChat.currentStep.id + 1 < currentChat.steps?.length) {
      newCurrentStep = currentChat.steps[currentChat.currentStep.id + 1]
      newCurrentStep.status = STEP_STATUS_ENUM.Active
    }

    return {
      steps: newSteps,
      currentStep: newCurrentStep,
    }
  }

  const generatePrompt = async (userInput: string, aiModel: string) => {
    switch (currentChat.currentStep.name) {
      case CHAT_STEP_ENUM.CreateGameConcept: {
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
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Here is ${ideaAmount} ideas for Game Concept`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.GameIdea,
          gameIdeas: parseData.ideas,
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
      case CHAT_STEP_ENUM.GenerateGameplay: {
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
        const newMsg: IChatMessage = {
          id: id,
          created_on: Date.now(),
          text: `Here is ${amount} ideas of the Gameplay`,
          ai: true,
          aiModel: `${aiModel}`,
          type: CHAT_MESSAGE_ENUM.Gameplay,
          gameplays: parseData.gameplays,
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
    const newMsg: IChatMessage = {
      id: id,
      created_on: Date.now(),
      text: newValue,
      ai: ai,
      aiModel: `${aiModel}`,
      type: CHAT_MESSAGE_ENUM.AI_MANUAL,
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
    showChat,
    updateCurrentChat,
    goToNextStep,
    chats,
    addChat,
    generatePrompt,
    setGameIdea,
    setGameplay,
    setCollections,
    setGameCategory,
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
