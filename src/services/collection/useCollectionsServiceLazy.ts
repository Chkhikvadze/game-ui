import { useLazyQuery } from '@apollo/client'
import COLLECTIONS_GQL from '../../gql/collection/collections.gql'

type UseCollectionsServiceLazyProps = {
  page: number
  limit: number
  search_text: string
  game_id: string
}

export const useCollectionsServiceLazy = () => {
  const [fetchData] = useLazyQuery(COLLECTIONS_GQL)

  const fetchCollections = async ({
    page,
    limit,
    search_text,
    game_id,
  }: UseCollectionsServiceLazyProps) => {
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

    if (!data?.collections) return []

    return data.collections.items
  }

  return {
    fetchCollections,
  }
}
