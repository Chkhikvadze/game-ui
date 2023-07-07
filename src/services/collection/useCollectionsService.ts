import { useQuery, QueryResult } from '@apollo/client'
import COLLECTION_GQL from '../../gql/collection/collections.gql'
import { ICollection } from 'services'

export type UseCollectionServiceProps = {
  page: number
  limit: number
  search_text?: string
  game_id?: string
}

type CollectionFilter = {
  game_id?: string
  search_text?: string
  page: number
  limit: number
  sort: string
  order: string
}

type CollectionData = {
  collections: ICollection[]
}

type CollectionVariables = {
  filter: CollectionFilter
}

export const useCollectionsService = ({
  page,
  limit,
  search_text,
  game_id,
}: UseCollectionServiceProps): QueryResult<CollectionData, CollectionVariables> => {
  const result = useQuery<CollectionData, CollectionVariables>(COLLECTION_GQL, {
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

  return result
}
