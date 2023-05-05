import Button from '@l3-lib/ui-core/dist/Button'
import { useParams } from 'react-router-dom'
import {
  useCreateAchievementService,
  useCreateAttributeService,
} from 'services/useAssetTraitsService'

const ResourcesHub = () => {
  const params = useParams()

  const gameId: string = params?.gameId!

  const [createAttributeService] = useCreateAttributeService()
  const [createAchievementService] = useCreateAchievementService()

  const addBlankAttributeRow = () => {
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

    createAttributeService(attributeInput, () => {})
  }
  const addBlankAchievementRow = () => {
    const achievementInput = {
      game_id: gameId,
      name: '',
      description: '',
      media: {},
      // value: 0,
      display_value: '',
      properties: {},
      custom_props: {},
      config: {},
      formats: {},
      asset_url: '',
      order: 0,
      main_media: '',
    }

    createAchievementService(achievementInput, () => {})
  }

  return (
    <>
      <Button kind={Button.kinds.TERTIARY} onClick={addBlankAttributeRow}>
        {'add Attribute'}
      </Button>
      <Button kind={Button.kinds.TERTIARY} onClick={addBlankAchievementRow}>
        {'add Achievement'}
      </Button>
    </>
  )
}

export default ResourcesHub
