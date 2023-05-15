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

type UseCreateGameFromChatServiceProps = {
  chat: IChat
}

export const useCreateGameFromChatService = ({ chat }: UseCreateGameFromChatServiceProps) => {
  const [mutation, { loading }] = useMutation<Data, Variables>(CREATE_GAME_FROM_CHAT_GQL)

  const createGameFromChatService = async () => {
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
