import { useParams } from 'react-router-dom'
import { useAttributesService, useCreateAttributeService } from 'services/useAssetResourcesService'

export const useAttributes = () => {
  const params = useParams()

  const gameId: string = params?.gameId!

  const [createAttributeService] = useCreateAttributeService()

  const { data: attributes, refetch: attributesRefetch } = useAttributesService({
    game_id: gameId || '',
    page: 1,
    limit: 100,
  })

  const addBlankAttributeRow = async () => {
    const attributeInput = {
      game_id: gameId,
      name: 'untitled',
      description: '',
      min: 0,
      max: 0,
      media: '',
      order: 0,
    }

    await createAttributeService(attributeInput, () => {})

    attributesRefetch()
  }

  return {
    addBlankAttributeRow,
    data: attributes?.items,
  }
}
