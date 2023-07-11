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
    const updateGameSocialLinks = data?.updateGameSocialLinks

    return { success: Boolean(updateGameSocialLinks) }
  }

  return { updateCollectionSocialLinks, loading }
}
