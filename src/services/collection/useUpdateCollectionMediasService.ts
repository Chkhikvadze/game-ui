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
  medias?: Nullable<any>
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
    const { data } = response || {} // Check if response exists and extract data property
    const updateGameImages = data?.updateGameImages // Check if data exists and extract updateGameImages property

    return { success: Boolean(updateGameImages) } // Return an object with a success property

    // Alternatively, you can return a default value when updateGameImages is undefined
    // return { success: Boolean(updateGameImages || false) };
  }

  return { updateCollectionMedias, loading }
}
