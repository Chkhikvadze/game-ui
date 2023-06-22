import { useMutation } from '@apollo/client'
import SET_DEFAULT_COLLECTION_MEDIA_GQL from '../../gql/collection/setDefaultCollectionMedia.gql'

export const useSetDefaultCollectionMediaService = () => {
  const [mutation, { loading }] = useMutation(SET_DEFAULT_COLLECTION_MEDIA_GQL)

  const setDefaultGameMedia = async (
    collection_id: string,
    media_id: string,
  ): Promise<{ success: boolean }> => {
    const {
      data: { gameMedia },
    } = await mutation({ variables: { collection_id, media_id } })
    return gameMedia
  }
  return { setDefaultGameMedia, loading }
}
