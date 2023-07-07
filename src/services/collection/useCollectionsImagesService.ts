import { useQuery } from '@apollo/client'
import COLLECTIONS_IMAGES_GQL from '../../gql/collection/collectionsImages.gql'

type UseCollectionsImagesServiceProps = {
  limit: number
  game_id: string
}

type Data = {
  collectionsImages?: any[]
}

export const useCollectionsImagesService = ({
  game_id,
  limit,
}: UseCollectionsImagesServiceProps) => {
  const { data, error, loading, refetch } = useQuery<Data>(COLLECTIONS_IMAGES_GQL, {
    variables: {
      filter: {
        game_id,
        limit,
      },
    },
    skip: !game_id,
  })

  const collectionsImages = data?.collectionsImages || []

  return {
    data: collectionsImages,
    error,
    loading,
    refetch,
  }
}
