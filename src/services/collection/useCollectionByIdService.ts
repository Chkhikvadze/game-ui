import { useQuery } from '@apollo/client'
import COLLECTION_BY_ID_GQL from '../../gql/collection/collectionById.gql'
import { ICollection } from 'services'

interface Data {
  collectionById: ICollection
}

interface Variables {
  id?: string
}

export const useCollectionByIdService = ({ id }: { id?: string }) => {
  const {
    data: { collectionById } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(COLLECTION_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: collectionById || {},
    error,
    loading,
    refetch,
  }
}
