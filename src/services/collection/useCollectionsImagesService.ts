import { useQuery } from '@apollo/client'
import COLLECTIONS_IMAGES_GQL from '../../gql/collection/collectionsImages.gql'

type UseCollectionsImagesServiceProps = {
  limit: number
  game_id: string
}

export const useCollectionsImagesService = ({
  game_id,
  limit,
}: UseCollectionsImagesServiceProps) => {
  const {
    data: { collectionsImages } = [],
    error,
    loading,
    refetch,
  } = useQuery(COLLECTIONS_IMAGES_GQL, {
    variables: {
      filter: {
        game_id,
        limit,
      },
    },
    skip: !game_id,
  })

  return {
    data: collectionsImages || [],
    error,
    loading,
    refetch,
  }
}
