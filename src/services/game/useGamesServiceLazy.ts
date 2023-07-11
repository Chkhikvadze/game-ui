import { useLazyQuery } from '@apollo/client'
import GAMES_GQL from '../../gql/game/games.gql'
import { IGame } from 'services'

interface Data {
  games: IGame[]
}

export const useGamesServiceLazy = () => {
  const [getGames, { loading, error, data }] = useLazyQuery<Data>(GAMES_GQL)

  return {
    getGames,
    loading,
    error,
    data: data?.games || [],
  }
}
