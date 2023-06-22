import { useQuery } from '@apollo/client'
import COLLECTION_CATEGORIES_GQL from '../../gql/collection/collectionCategories.gql'
import { ICollection } from 'services'

interface Data {
  collectionCategories: ICollection
}

interface Variables {
  game_id?: string
}

export const useCollectionCategoriesService = (game_id: string) => {
  const {
    data: { collectionCategories } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(COLLECTION_CATEGORIES_GQL, {
    variables: {
      game_id,
    },
  })

  return {
    data: collectionCategories || [],
    error,
    loading,
    refetch,
  }
}
