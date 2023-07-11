import { useMutation } from '@apollo/client'
import UPDATE_GAME_BY_ID from '../../gql/game/updateGame.gql'
import { IGame } from 'services'
import { Nullable } from 'types'

interface Data {
  game: IGame
}

interface Variables {
  id: string
  input: UpdateGameInput
}

interface UpdateGameInput {
  name?: string
  category?: Nullable<string>
  description?: Nullable<string>
  medias?: Nullable<any>[]
  main_media?: Nullable<string>
  banner_image?: Nullable<string>
  logo_image?: string
  background_image?: Nullable<string>
  url?: Nullable<string>
  web_link?: Nullable<string>
  twitter?: Nullable<string>
  instagram?: Nullable<string>
  discord?: Nullable<string>
  contact_email?: Nullable<string>
  contact_phone?: Nullable<string>
  is_url?: boolean
}

export const useUpdateGameByIdService = () => {
  const [mutation] = useMutation<Data, Variables>(UPDATE_GAME_BY_ID)
  const updateGameById = async (
    id: string,
    input: UpdateGameInput,
  ): Promise<{ success: boolean }> => {
    const { data } = await mutation({
      variables: {
        id,
        input,
      },
    })
    const game = data?.game
    return {
      success: !!game,
    }
  }

  return [updateGameById]
}
