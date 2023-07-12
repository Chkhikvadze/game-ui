import { useMutation } from '@apollo/client'

import createMessageGql from '../../gql/chat/createMessage.gql'

interface CreateMessageInput {
  message: string
  gameId?: string
}

export const useCreateChatMessageService = () => {
  const [mutation] = useMutation(createMessageGql)

  const createMessageService = async (input: CreateMessageInput) => {
    const { message, gameId } = input

    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: message,
          game_id: gameId,
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
