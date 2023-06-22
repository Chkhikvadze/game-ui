import { useLazyQuery } from '@apollo/client'
import GAMES_GQL from '../../gql/game/games.gql'

export const useGamesServiceLazy = () => {
  const [getGames, { loading, error, data }] = useLazyQuery(GAMES_GQL)
  return {
    getGames,
    loading,
    error,
    data: data?.games || [],
  }
}
