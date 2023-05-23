import { useMutation } from '@apollo/client'
import UPSCALE_AI_MEDIA_GQL from '../../gql/chat/upscaleAiMedia.gql'
import { IAiMediaPrompt } from 'services/types/chat'

interface Data {
  upscaleAiMedia: IAiMediaPrompt
}

interface Variables {
  id: string
  button: string
}

export const useUpscaleAiMediaService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(UPSCALE_AI_MEDIA_GQL)

  const upscaleAiMediaService = async (variables: Variables) => {
    const { data, errors } = await mutation({
      variables,
    })

    const upscaleAiMedia = data?.upscaleAiMedia

    if (errors?.length || !upscaleAiMedia) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return upscaleAiMedia
  }

  return {
    upscaleAiMediaService,
    loading,
  }
}
