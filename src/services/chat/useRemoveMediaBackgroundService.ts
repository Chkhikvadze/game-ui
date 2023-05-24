import { useMutation } from '@apollo/client'
import REMOVE_MEDIA_BACKGROUND_GQL from '../../gql/chat/removeMediaBackground.gql'

interface Data {
  removeMediaBackground: string
}

interface Variables {
  id: string
}

export const useRemoveMediaBackgroundService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(REMOVE_MEDIA_BACKGROUND_GQL)

  const removeMediaBackgroundService = async (variables: Variables) => {
    const { data, errors } = await mutation({
      variables,
    })

    const removeMediaBackground = data?.removeMediaBackground

    if (errors?.length || !removeMediaBackground) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return removeMediaBackground
  }

  return {
    removeMediaBackgroundService,
    loading,
  }
}
