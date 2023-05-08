import { useParams } from 'react-router-dom'
import { useAttributesService, useCreateAttributeService } from 'services/useAssetTraitsService'

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
      name: '',
      description: '',
      min: 0,
      max: 0,
      media: {},
      value: 0,
      display_value: '',
      properties: {},
      custom_props: {},
      config: {},
      formats: {},
      asset_url: '',
      order: 0,
      main_media: '',
    }

    await createAttributeService(attributeInput, () => {})

    attributesRefetch()
  }

  return {
    addBlankAttributeRow,
    data: attributes?.items,
  }
}
