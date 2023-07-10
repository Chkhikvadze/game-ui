import { useParams } from 'react-router-dom'
import {
  useAchievementsService,
  useCreateAchievementService,
} from 'services/useAssetResourcesService'

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
      name: 'untitled',
      description: '',
      media: '',
      order: 0,
    }

    await createAchievementService(achievementInput, () => {})

    achievementsRefetch()
  }
  return {
    addBlankAchievementRow,
    data: achievements?.items,
    achievementsRefetch,
  }
}
