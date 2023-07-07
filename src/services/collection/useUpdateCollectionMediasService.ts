import { useMutation } from '@apollo/client'
import UPDATE_COLLECTION_MEDIAS_GQL from '../../gql/collection/updateCollectionMedias.gql'
import { ICollection } from 'services/types'
import { Nullable } from 'types'

interface Data {
  updateGameImages: ICollection
}

interface Variables {
  id: string
  input: UpdateCollectionMediasServiceInput
}

interface UpdateCollectionMediasServiceInput {
  medias?: any[]
}

export const useUpdateCollectionMediasService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPDATE_COLLECTION_MEDIAS_GQL)
  const updateCollectionMedias = async (
    id: string,
    input: UpdateCollectionMediasServiceInput,
  ): Promise<{ success: boolean }> => {
    const response = await mutation({
      variables: {
        id,
        input,
      },
    })
    const { data } = response || {}
    const updateGameImages = data?.updateGameImages

    return { success: Boolean(updateGameImages) }
  }

  return { updateCollectionMedias, loading }
}
