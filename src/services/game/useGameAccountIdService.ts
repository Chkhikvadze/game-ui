import { useQuery } from '@apollo/client'
import GAME_ACCOUNT_ID from '../../gql/game/gameAccountId.gql'

interface Data {
  gameAccountId: string
}

interface Variables {
  id?: string
}

export const useGameAccountIdService = ({ id }: { id?: string }) => {
  const {
    data: { gameAccountId } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(GAME_ACCOUNT_ID, {
    variables: { id },
    skip: !id,
  })

  return {
    data: gameAccountId,
    error,
    loading,
    refetch,
  }
}
