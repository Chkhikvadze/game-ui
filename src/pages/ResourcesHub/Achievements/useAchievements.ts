import { useParams } from 'react-router-dom'
import { useAchievementsService, useCreateAchievementService } from 'services/useAssetTraitsService'

export const useAchievements = () => {
  const params = useParams()

  const gameId: string = params?.gameId!

  const [createAchievementService] = useCreateAchievementService()

  const { data: achievements, refetch: achievementsRefetch } = useAchievementsService({
    game_id: gameId || '',
    page: 1,
    limit: 100,
  })

  const addBlankAchievementRow = async () => {
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

    await createAchievementService(achievementInput, () => {})

    achievementsRefetch()
  }

  return {
    addBlankAchievementRow,
    data: achievements?.items,
  }
}
