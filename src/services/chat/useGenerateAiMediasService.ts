import { useMutation } from '@apollo/client'
import GENERATE_AI_MEDIAS_GQL from '../../gql/chat/generateAiMedias.gql'
import { IAiMediaPrompt } from 'services/types/chat'

interface Data {
  generateAiMedias: IAiMediaPrompt
}

interface Variables {
  prompt: string
}

export const useGenerateAiMediasService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(GENERATE_AI_MEDIAS_GQL)

  const generateAiMediasService = async (prompt: string) => {
    const { data, errors } = await mutation({
      variables: { prompt },
    })

    const generateAiMedias = data?.generateAiMedias

    if (errors?.length || !generateAiMedias) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return generateAiMedias
  }

  return {
    generateAiMediasService,
    loading,
  }
}
