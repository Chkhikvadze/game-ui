import { useMutation } from '@apollo/client'

import createMessageGql from '../../gql/chat/createMessage.gql'
import { ChatMessageVersionEnum } from 'services/types'

interface CreateMessageInput {
  message: string
  version: ChatMessageVersionEnum
  isPrivateChat: boolean
  gameId?: string
  collectionId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(createMessageGql)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, gameId, collectionId, isPrivateChat, version } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          version,
          is_private_chat: isPrivateChat,
          game_id: gameId,
          collection_id: collectionId,
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
