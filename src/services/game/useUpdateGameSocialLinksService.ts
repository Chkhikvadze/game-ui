import { useMutation } from '@apollo/client'
import UPDATE_GAME_SOCIAL_LINKS_GQL from '../../gql/game/updateGameSocialLinks.gql'
import { IGame } from 'services'
import { Nullable } from 'types'

interface Data {
  updateGameSocialLinks: IGame
}

interface Variables {
  id: string
  input: UpdateGameSocialLinkInput
}

interface UpdateGameSocialLinkInput {
  twitter?: Nullable<string>
}

export const useUpdateGameSocialLinksService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPDATE_GAME_SOCIAL_LINKS_GQL)
  const updateGameSocialLinks = async (
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

  return { updateGameSocialLinks, loading }
}
