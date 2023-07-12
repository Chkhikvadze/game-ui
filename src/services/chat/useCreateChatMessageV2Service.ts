import { useMutation } from '@apollo/client'

import CREATE_MESSAGE_V2_GQL from '../../gql/chat/createMessageV2.gql'

interface CreateMessageInput {
  message: string
  gameId?: string
}

export const useCreateChatMessageV2Service = () => {
  const [mutation] = useMutation(CREATE_MESSAGE_V2_GQL)

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

    console.log(createMessage)

    return createMessage
  }

  return [createMessageService]
}
