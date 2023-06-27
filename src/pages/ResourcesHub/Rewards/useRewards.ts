import { useParams } from 'react-router-dom'
import { useCreateRewardService, useRewardsService } from 'services/useAssetResourcesService'

export const useRewards = () => {
  const params = useParams()

  const gameId: string = params?.gameId!

  const [createRewardService] = useCreateRewardService()

  const { data: rewards, refetch: rewardsRefetch } = useRewardsService({
    game_id: gameId || '',
    page: 1,
    limit: 100,
  })

  const addBlankRewardRow = async () => {
    const rewardInput = {
      game_id: gameId,
      name: 'untitled',
      description: '',
      media: '',
      order: 0,
    }

    await createRewardService(rewardInput, () => {})

    rewardsRefetch()
  }

  return {
    addBlankRewardRow,
    data: rewards?.items,
    rewardsRefetch,
  }
}
