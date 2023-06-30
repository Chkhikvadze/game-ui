import { useMutation } from '@apollo/client'

import createMessageGql from '../../gql/chat/createMessage.gql'

export const useCreateChatMassageService = () => {
  const [mutation] = useMutation(createMessageGql)

  const createMessageService = async (input: any) => {
    const {
      data: { createMessage },
    } = await mutation({
      variables: {
        input: {
          prompt: input.message,
          chat_id: '1cca3976-9b05-49db-952e-9848e7535233',
          game_id: '77453f60-e0d6-4c34-82fc-42a81b583533',
          account_id: 'ebd02d5f-1fcc-495e-92a4-84f79095307e',
          user_id: '0ce585de-483a-4ef0-939d-4283434e8649',
        },
      },
    })

    return createMessage
  }

  return [createMessageService]
}
