import { useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  API_VERSION_ENUM,
  GPT_PROMPT_ENUM,
  IChat,
  IChatMessage,
  ICollection,
  MESSAGE_TYPE_ENUM,
} from '../types'
import { useChatAI } from './useChatAI'
import { useMediaAI } from './useMediaAI'
import { simulateConfirmAI } from '../utils/test'
import { useCreateGameFromChatService } from 'services'
import { use } from 'i18next'

const useProcessSteps = (
  addMessage: (message: IChatMessage) => void,
  addNotifyMessage: (text: string, ai: boolean) => void,
  regenerateMessage: (message: IChatMessage) => void,
  setIsCreateFinished: (isFinished: boolean) => void,
  setGameMedias: (medias: string[]) => void,
  setIsAssetMediasGenerated: (isAssetMediasGenerated: boolean) => void,
  updateMessageCollection: (messageId: string, collection: ICollection) => void,
  setUserKeywords: (keywords: string) => void,
  apiVersion: API_VERSION_ENUM,
) => {
  const { generateCollectionMediasAI, generateGameMediasAI, generateAssetsMediasAI } = useMediaAI()

  const { generatedAI, questionConfirmAI } = useChatAI(
    addNotifyMessage,
    addMessage,
    regenerateMessage,
    updateMessageCollection,
  )

  const { createGameFromChatService } = useCreateGameFromChatService()

  const processGameIdea = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameIdea) {
      const isShowedGameIdeas = chat?.messages.filter(
        i => i.type === MESSAGE_TYPE_ENUM.GameIdea,
      ).length
      if (isShowedGameIdeas) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing game idea or inspire a new one.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      } else {
        if (userInput) {
          setUserKeywords(userInput)
          await generatedAI(GPT_PROMPT_ENUM.GameIdeaPrompt, chat, userInput)
          return false
        }
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Sure thing! Please share keywords about your dream game.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
      }
      return false
    }
    return true
  }

  const processCategory = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameCategory) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: 'Please, choose a game category first.',
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      return false
    }
    return true
  }

  const processGameplay = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameplay) {
      const isShowedGameplays = chat?.messages.filter(
        i => i.type === MESSAGE_TYPE_ENUM.Gameplay,
      ).length
      if (isShowedGameplays) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: 'Pick an existing gameplay or regenerate it.',
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      } else {
        await generatedAI(GPT_PROMPT_ENUM.GameplayPrompt, chat, chat.userKeywords || '')
        return false
      }
    }
    return true
  }

  const processCollections = async (chat: IChat, userInput?: string): Promise<boolean> => {
    const isShowedCollections = chat?.messages.filter(
      i => i.type === MESSAGE_TYPE_ENUM.Collection,
    ).length
    if (isShowedCollections) {
      if (!chat?.collections?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the collection or multiple collections that you'd like to incorporate into your game.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }
    } else {
      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Okay, We.`,
      //   ai: true,
      //   type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      // })
      await generatedAI(GPT_PROMPT_ENUM.CollectionAssetPrompt, chat, chat.userKeywords || '')
      return false
    }
    return true
  }

  const processRewardsAchievements = async (chat: IChat, userInput?: string): Promise<boolean> => {
    const isShowed = chat?.messages.filter(
      i => i.type === MESSAGE_TYPE_ENUM.RewardAchievement,
    ).length
    if (isShowed) {
      if (!chat?.rewards?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the reward or rewards that you'd like to incorporate into your game.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }

      if (!chat?.achievements?.length) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Kindly choose the achievements or achievements that you'd like to incorporate into your game.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }
    } else {
      // addMessage({
      //   id: uuidv4(),
      //   createdOn: Date.now(),
      //   text: `Okay, We.`,
      //   ai: true,
      //   type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      // })
      await generatedAI(GPT_PROMPT_ENUM.RewardAchievementPrompt, chat, chat.userKeywords || '')
      return false
    }
    return true
  }

  const processCreateFinish = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (chat?.isCreateFinished) return true

    if (!userInput) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Having already made selections for Collections, Assets, properties, and attributes, are you now inclined to forge game objects? Kindly confirm your intent.`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.CreateFinishQuestion,
      })
      return false
    }

    //todo process if last answer is yes, to create objects
    const lastMessage = chat.messages[chat.messages.length - 1]
    if (lastMessage.type === MESSAGE_TYPE_ENUM.CreateFinishQuestion && userInput !== undefined) {
      //todo replace simulation of ChatGPT

      // const isConfirmed = await questionConfirmAI(lastMessage.text, userInput)
      const isConfirmed = await simulateConfirmAI(lastMessage.text, userInput)
      if (isConfirmed) {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Great! We will generate game objects for you.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })

        //todo mirian save game objects
        console.log('save game objects', chat)

        console.log(JSON.stringify(chat))

        try {
          const { game, collections } = await createGameFromChatService(chat)
          console.log('saved data', game)

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `${game.name} game created.`,
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })

          const collectionNames = collections
            .map(collection => collection.name)
            .join(', ')
            .trim()

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Creation breathes life to the ${collectionNames} collections.`,
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `The art of creation unfolds: assets, properties and attributes.`,
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Embark on triumph and unlock rewards and achievements.`,
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })

          const gameLink = `/game/${game.id}/general` //todo put game link

          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: `Enter the gateway to your game: [${chat.name}?](${gameLink}), behold the wonders!`,
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })

          setIsCreateFinished(true)

          //todo mirian generate game objects

          console.log('generate game objects', chat)

          return true
        } catch (error) {
          if (error instanceof Error) {
            addMessage({
              id: uuidv4(),
              createdOn: Date.now(),
              text: `Failed to create objects. ${error.message}`,
              ai: true,
              type: MESSAGE_TYPE_ENUM.AI_MANUAL,
            })
          }

          return false
        }
      } else {
        addMessage({
          id: uuidv4(),
          createdOn: Date.now(),
          text: `Okay, you can do game objects later.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        })
        return false
      }
    }
    return true
  }

  const processReport = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!userInput) {
      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Compose any insights you'd like to report or visualizations you'd like to create for your game`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      return false
    } else {
      generatedAI(GPT_PROMPT_ENUM.ReportPrompt, chat, chat.userKeywords || '')
    }

    return true
  }

  const processGameMedia = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.gameIdea || !chat?.name) return false

    if (chat.media) return true

    // if (chat.medias && chat.medias.length > 0) return true

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Let generate cover image options for your game.`,
      ai: true,
      type: MESSAGE_TYPE_ENUM.AI_MANUAL,
    })

    const generated = await generateGameMediasAI(chat.name, chat?.gameIdea.name || '')
    if (!generated) return false

    const { id, webhook_data } = generated
    const { imageUrl } = webhook_data

    addMessage({
      id: uuidv4(),
      createdOn: Date.now(),
      text: `Here are generated media options for your game.`,
      ai: true,
      type: MESSAGE_TYPE_ENUM.GameMedias,
      // medias: [imageUrl], // todo
      currentMedia: {
        url: imageUrl,
        type: 'collage',
      },
      mediaCollage: {
        id,
        url: imageUrl,
      },
    })

    // todo: medias collage
    if (imageUrl) {
      setGameMedias([imageUrl])
    }

    return false
  }

  const processCollectionsMedia = async (chat: IChat, userInput?: string): Promise<boolean> => {
    return true
  }

  const processAssetsMedias = async (chat: IChat, userInput?: string): Promise<boolean> => {
    if (!chat?.collections) return false

    if (chat.isAssetMediasGenerated) return true

    let messageId: string
    const pr = chat.collections.map(async collection => {
      const { assets } = collection
      const { name, gameIdea } = chat

      if (!assets || assets?.length === 0) return false

      addMessage({
        id: uuidv4(),
        createdOn: Date.now(),
        text: `Generate stunning media assets for your collection.`,
        ai: true,
        type: MESSAGE_TYPE_ENUM.AI_MANUAL,
      })
      // debugger
      const assetsUrls = await generateAssetsMediasAI(
        assets,
        name,
        gameIdea?.description || 'Simple Idea',
        1,
      )
      const newAssets = assets.map(asset => {
        asset.medias = assetsUrls[asset.id]
        return asset
      })

      if (messageId) {
        updateMessageCollection(messageId, {
          ...collection,
          assets: newAssets,
        })
      } else {
        messageId = uuidv4()
        updateMessageCollection(messageId, {
          ...collection,
          assets: newAssets,
        })
        addMessage({
          id: messageId,
          createdOn: Date.now(),
          text: `Here are generated medias for your assets.`,
          ai: true,
          type: MESSAGE_TYPE_ENUM.AssetsMedias,
          collections: chat.collections,
        })
      }
    })

    await Promise.all(pr)

    setIsAssetMediasGenerated(true)

    return false
  }

  const processSteps = async (chat: IChat, userInput?: string) => {
    if (apiVersion === API_VERSION_ENUM.CreateV1) {
      if (!(await processCategory(chat, userInput))) return

      if (!(await processGameIdea(chat, userInput))) return

      if (!(await processGameMedia(chat, userInput))) return

      if (!(await processGameplay(chat, userInput))) return

      if (!(await processGameMedia(chat, userInput))) return

      if (!(await processCollectionsMedia(chat, userInput))) return

      if (!(await processCollections(chat, userInput))) return

      if (!(await processAssetsMedias(chat, userInput))) return

      if (!(await processRewardsAchievements(chat, userInput))) return

      if (!(await processCreateFinish(chat, userInput))) return
    } else if (apiVersion === API_VERSION_ENUM.ReportV1) {
      if (!(await processReport(chat, userInput))) return
    }

    // addMessage({
    //   id: uuidv4(),
    //   createdOn: Date.now(),
    //   text: 'We already generate all your game assets for you, Do you confirm to create game objects L3vels system?',
    //   ai: true,
    //   type: MESSAGE_TYPE_ENUM.CreateFinishQuestion,
    // })

    //save record in database here Mirian

    return true
  }

  const processRegenerate = async (chat: IChat, userInput?: string) => {
    chat.messages = chat.messages.filter(
      i =>
        i.type !== MESSAGE_TYPE_ENUM.AI_MANUAL &&
        i.type !== MESSAGE_TYPE_ENUM.User &&
        i.type !== MESSAGE_TYPE_ENUM.Report,
    )
    const message = chat.messages[chat.messages.length - 1]
    switch (message.type) {
      case MESSAGE_TYPE_ENUM.GameIdea:
        if (!chat?.gameCategory) {
          addMessage({
            id: uuidv4(),
            createdOn: Date.now(),
            text: 'Choose game a game category first.',
            ai: true,
            type: MESSAGE_TYPE_ENUM.AI_MANUAL,
          })
          break
        }
        await generatedAI(GPT_PROMPT_ENUM.GameIdeaPrompt, chat, message.text, true, message)
        break
      case MESSAGE_TYPE_ENUM.Gameplay:
        await generatedAI(GPT_PROMPT_ENUM.GameplayPrompt, chat, message.text, true, message)
        break
      case MESSAGE_TYPE_ENUM.Collection:
        await generatedAI(
          GPT_PROMPT_ENUM.CollectionAssetPrompt,
          chat,
          chat.userKeywords || '',
          true,
          message,
        )
        break
      default:
        // addMessage({
        //   id: 2,
        //   createdOn: Date.now(),
        //   text: `You can not call regenerate action on that stage.`,
        //   ai: true,
        //   type: MESSAGE_TYPE_ENUM.AI_MANUAL,
        // })
        break
    }
  }
  return {
    processSteps,
    processRegenerate,
  }
}

export { useProcessSteps }
