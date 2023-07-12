import { useMutation } from '@apollo/client'
import SET_DEFAULT_GAME_MEDIA_GQL from '../../gql/game/setDefaultGameMedia.gql'
import { IGame } from 'services'

interface Data {
  gameMedia: IGame
}

interface Variables {
  game_id: string
  media_id: any[]
}

export const useSetDefaultGameMediaService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(SET_DEFAULT_GAME_MEDIA_GQL)

  const setDefaultGameMedia = async (
    game_id: string,
    media_id: any[],
  ): Promise<{ success: boolean }> => {
    const { data } = await mutation({ variables: { game_id, media_id } })
    const gameMedia = data?.gameMedia

    return { success: Boolean(gameMedia) }
  }

  return { setDefaultGameMedia, loading }
}
