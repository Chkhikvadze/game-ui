import { useMutation } from '@apollo/client'

import createMessageGql from '../../gql/chat/createMessage.gql'
import { ChatMessageVersionEnum } from 'services/types'

interface CreateMessageInput {
  message: string
  version: ChatMessageVersionEnum
  isPrivateChat: boolean
  gameId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(createMessageGql)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, gameId, isPrivateChat, version } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          version,
          game_id: gameId,
          is_private_chat: isPrivateChat,
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
