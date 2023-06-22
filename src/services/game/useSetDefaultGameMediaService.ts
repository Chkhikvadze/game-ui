import { useMutation } from '@apollo/client'
import SET_DEFAULT_GAME_MEDIA_GQL from '../../gql/game/setDefaultGameMedia.gql'

export const useSetDefaultGameMediaService = () => {
  const [mutation, { loading }] = useMutation(SET_DEFAULT_GAME_MEDIA_GQL)

  const setDefaultGameMedia = async (
    game_id: string,
    media_id: string,
  ): Promise<{ success: boolean }> => {
    const {
      data: { gameMedia },
    } = await mutation({ variables: { game_id, media_id } })
    return gameMedia
  }
  return { setDefaultGameMedia, loading }
}
