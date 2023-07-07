import { useQuery } from '@apollo/client'
import COLLECTION_GQL from '../../gql/collection/collections.gql'

type UseCollectionServiceProps = {
  page: number
  limit: number
  search_text?: string
  game_id?: string
}

export const useCollectionsService = ({
  page,
  limit,
  search_text,
  game_id,
}: UseCollectionServiceProps) => {
  const {
    data: { collections } = [],
    error,
    loading,
    refetch,
  } = useQuery(COLLECTION_GQL, {
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
    skip: !game_id,
  })

  return {
    data: collections || [],
    error,
    loading,
    refetch,
  }
}
