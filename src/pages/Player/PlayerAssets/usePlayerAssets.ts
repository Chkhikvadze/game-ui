import { useParams } from 'react-router-dom'
import {
  useAchievementsService,
  useAttributesService,
  useRewardsService,
} from 'services/useAssetResourcesService'
import { usePlayerAssetsByCollectionsService } from 'services/usePlayerAssetService'
import { usePlayerByIdService } from 'services/usePlayerService'

const usePlayerAssets = () => {
  const params = useParams()
  const playerId = params.playerId

  const { data: playerById } = usePlayerByIdService({ id: playerId })

  const { game_id } = playerById

  const { data: playerAssetsByCollections } = usePlayerAssetsByCollectionsService({
    game_id: game_id,
    player_id: playerId,
  })

  const { data: attributes, refetch: attributesRefetch } = useAttributesService({
    game_id: game_id || '',
    page: 1,
    limit: 100,
  })

  const attributesOptions = attributes?.items?.map((attribute: any) => {
    return { id: attribute.id, media: attribute.media, name: attribute.name }
  })

  const { data: achievements, refetch: achievementsRefetch } = useAchievementsService({
    game_id: game_id || '',
    page: 1,
    limit: 100,
  })

  const achievementsOptions = achievements?.items?.map((achievement: any) => {
    return { id: achievement.id, media: achievement.media, name: achievement.name }
  })

  const { data: rewards, refetch: rewardsRefetch } = useRewardsService({
    game_id: game_id || '',
    page: 1,
    limit: 100,
  })

  const rewardsOptions = rewards?.items?.map((reward: any) => {
    return { id: reward.id, media: reward.media, name: reward.name }
  })

  return {
    playerAssetsByCollections,
    attributesOptions,
    achievementsOptions,
    rewardsOptions,
  }
}

export default usePlayerAssets
