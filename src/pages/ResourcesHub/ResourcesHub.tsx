import Button from '@l3-lib/ui-core/dist/Button'
import { useParams } from 'react-router-dom'
import { useCreateAttributeService } from 'services/useAssetTraitsService'

const ResourcesHub = () => {
  const params = useParams()

  const gameId: string = params?.gameId!

  const [createAttributeService] = useCreateAttributeService()

  const addBlankRow = () => {
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
      property_type: '',
      asset_url: '',
      order: 0,
      main_media: '',
    }

    createAttributeService(attributeInput, () => {})
  }

  return (
    <Button kind={Button.kinds.TERTIARY} onClick={addBlankRow}>
      {'add attribute'}
    </Button>
  )
}

export default ResourcesHub
