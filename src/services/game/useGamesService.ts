import { useQuery } from '@apollo/client'
import GAMES_GQL from '../../gql/game/games.gql'

type useGamesServiceProps = {
  page?: number
  limit?: number
  search_text?: string
}

export const useGamesService = ({ page, limit, search_text }: useGamesServiceProps) => {
  const { data, error, loading, refetch } = useQuery(GAMES_GQL, {
    variables: {
      filter: {
        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
  })

  return {
    data: data?.games || [],
    error,
    loading,
    refetch,
  }
}
