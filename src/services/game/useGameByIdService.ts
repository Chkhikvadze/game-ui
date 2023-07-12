import { useQuery } from '@apollo/client'
import GAME_BY_ID from '../../gql/game/gameById.gql'
import { IGame } from 'services'

interface Data {
  gameById: IGame
}

interface Variables {
  id?: string
}

export const useGameByIdService = ({ id }: { id?: string }) => {
  const {
    data: { gameById } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(GAME_BY_ID, {
    variables: { id },
    skip: !id,
  })

  return {
    data: gameById,
    error,
    loading,
    refetch,
  }
}
