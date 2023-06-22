import { useQuery } from '@apollo/client'
import COLLECTION_COUNT_BY_GAME_ID from '../../gql/collection/collectionsCountByGameId.gql'
import { ICollection } from 'services'

interface Data {
  collectionsCountByGameId: ICollection
}

interface Variables {
  game_id?: string
}

export const useCollectionCountByGameIdService = (game_id?: string) => {
  const {
    data: { collectionsCountByGameId } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(COLLECTION_COUNT_BY_GAME_ID, {
    variables: {
      game_id,
    },
  })

  return {
    data: collectionsCountByGameId || 0,
    error,
    loading,
    refetch,
  }
}
