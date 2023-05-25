import { useMutation } from '@apollo/client'
import CREATE_GAME_FROM_CHAT_GQL from '../../gql/chat/createGameFromChat.gql'
import { IChat } from 'modals/AIChatModal/types'

interface Data {
  createGameFromChat: {
    game: {
      id: string
      name: string
    }
    collections: {
      id: string
      name: string
    }[]
  }
}

interface Variables {
  input: IChat
}

export const useCreateGameFromChatService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(CREATE_GAME_FROM_CHAT_GQL)

  const createGameFromChatService = async (chat: IChat) => {
    const { data, errors } = await mutation({
      variables: { input: chat },
    })

    const createGameFromChat = data?.createGameFromChat

    if (errors?.length || !createGameFromChat) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return createGameFromChat
  }

  return {
    createGameFromChatService,
    loading,
  }
}
