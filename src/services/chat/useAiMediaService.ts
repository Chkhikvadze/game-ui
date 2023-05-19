import { useLazyQuery } from '@apollo/client'
import AI_MEDIA_GQL from '../../gql/chat/aiMedia.gql'
import { IAiMediaPrompt } from 'services/types/chat'

interface Data {
  aiMedia: IAiMediaPrompt
}

interface Variables {
  id: string
}

export const useAiMediaService = () => {
  const [fetchData, { loading }] = useLazyQuery<Data, Variables>(AI_MEDIA_GQL, {
    fetchPolicy: 'no-cache',
  })

  const fetchAiMedia = (id: string) =>
    new Promise<Data['aiMedia']>((resolve, reject) => {
      const interval = setInterval(() => {
        fetchData({
          variables: { id },
        })
          .then(({ data }) => {
            if (!data) return

            if (data.aiMedia.webhook_data) {
              clearInterval(interval)
              resolve(data.aiMedia)
            }
          })
          .catch(err => {
            // Handle potential errors, if needed
            reject(err)
          })
      }, 10000)
    })

  return {
    fetchAiMedia,
    loading,
  }
}
