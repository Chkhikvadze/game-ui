import { useLazyQuery } from '@apollo/client'
import PLAYERS_GQL from '../../gql/player/players.gql'

type UsePlayersServiceLazyProps = {
  page: number
  limit: number
  search_text: string
  game_id: string
}

export const usePlayersServiceLazy = () => {
  const [fetchData] = useLazyQuery(PLAYERS_GQL)

  const fetchPlayers = async ({
    page,
    limit,
    search_text,
    game_id,
  }: UsePlayersServiceLazyProps) => {
    const { data } = await fetchData({
      variables: {
        filter: {
          game_id,
          search_text,
          page,
          limit,
          sort: 'name',
          order: 'ASC',
        },
      },
    })

    if (!data?.players) return []

    return data.players.items
  }

  return {
    fetchPlayers,
  }
}
