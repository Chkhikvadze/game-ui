import { useMutation } from '@apollo/client'
import CREATE_GAME_GQL from '../../gql/game/createGame.gql'
import { IGame } from 'services'
import { Nullable } from 'types'

interface Data {
  createGame: IGame
  name?: string
  logo_image?: string
  category?: Nullable<string>
}

interface Variables {
  input: CreateGameInput
}

interface CreateGameInput {
  name?: string
  category?: Nullable<string>
  description?: Nullable<string>
  banner_image?: Nullable<string>
  logo_image?: string
  background_image?: Nullable<string>
  url?: Nullable<string>
  web_link?: string
  discord?: Nullable<string>
  twitter?: Nullable<string>
  instagram?: Nullable<string>
  contact_email?: Nullable<string>
  contact_phone?: Nullable<string>
  is_url?: boolean
  medias?: Nullable<any>[]
  main_media?: Nullable<string>
}

export const useCreateGameService = () => {
  const [mutation] = useMutation<Data, Variables>(CREATE_GAME_GQL)
  const createGameService = async (input: CreateGameInput, callback: any) => {
    const { data } = await mutation({
      variables: { input },
    })

    const createGame = data?.createGame

    if (callback) {
      callback()
    }

    return createGame
  }

  return [createGameService]
}
