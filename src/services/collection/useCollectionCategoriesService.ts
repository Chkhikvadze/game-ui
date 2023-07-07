import { useQuery } from '@apollo/client'
import COLLECTION_CATEGORIES_GQL from '../../gql/collection/collectionCategories.gql'

interface Data {
  collectionCategories?: string[]
}

interface Variables {
  game_id?: string
}

export const useCollectionCategoriesService = (game_id?: string) => {
  const { data, error, loading, refetch } = useQuery<Data, Variables>(COLLECTION_CATEGORIES_GQL, {
    variables: {
      game_id,
    },
  })

  const collectionCategories = data?.collectionCategories || []

  return {
    data: collectionCategories,
    error,
    loading,
    refetch,
  }
}
