import { useMutation } from '@apollo/client'
import UPDATE_GAME_MEDIAS_GQ from '../../gql/game/updateGameMedia.gql'
import { IGame } from 'services'

interface Data {
  updateGameImages: IGame
}

interface Variables {
  id: string
  input: UpdateGameImageInput
}

type UpdateGameImageInput = {
  is_main: boolean
  url: string
  format: string
}[]

export const useUpdateGameImages = () => {
  const [mutation] = useMutation<Data, Variables>(UPDATE_GAME_MEDIAS_GQ)
  const updateGameImages = async (
    id: string,
    input: UpdateGameImageInput,
  ): Promise<IGame | undefined> => {
    const response = await mutation({
      variables: {
        id,
        input,
      },
    })

    const updatedGameImages = response?.data?.updateGameImages

    if (updatedGameImages) {
      return updatedGameImages
    }
    return undefined
  }

  return [updateGameImages]
}
