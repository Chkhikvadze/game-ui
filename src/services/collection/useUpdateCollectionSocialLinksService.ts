import { useMutation } from '@apollo/client'
import UPDATE_COLLECTION_SOCIAL_LINKS_GQL from '../../gql/collection/updateCollectionSocialLinks.gql'
import { ICollection } from 'services'
import { Nullable } from 'types'

interface Data {
  updateGameSocialLinks: ICollection
}

interface Variables {
  id: string
  input: UpdateGameSocialLinkInput
}

interface UpdateGameSocialLinkInput {
  twitter?: Nullable<string>
}

export const useUpdateCollectionSocialLinksService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPDATE_COLLECTION_SOCIAL_LINKS_GQL)
  const updateCollectionSocialLinks = async (
    id: string,
    input: UpdateGameSocialLinkInput,
  ): Promise<{ success: boolean }> => {
    const { data } = await mutation({
      variables: {
        id,
        input,
      },
    })
    const updateGameSocialLinks = data?.updateGameSocialLinks // Check if data exists and extract updateGameSocialLinks property

    return { success: Boolean(updateGameSocialLinks) } // Return an object with a success property

    // Alternatively, you can return a default value when updateGameSocialLinks is undefined
    // return { success: Boolean(updateGameSocialLinks || false) };
  }

  return { updateCollectionSocialLinks, loading }
}
