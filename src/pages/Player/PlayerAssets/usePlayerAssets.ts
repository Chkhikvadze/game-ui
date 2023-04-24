import { useParams } from 'react-router-dom'
import {
  usePlayerAssetsByCollectionsService,
  usePlayerAssetsService,
} from 'services/usePlayerAssetService'
import { usePlayerByIdService } from 'services/usePlayerService'

const usePlayerAssets = () => {
  const params = useParams()
  const playerId = params.playerId

  const { data: playerById } = usePlayerByIdService({ id: playerId })

  const { game_id } = playerById

  const { data: playerAssets } = usePlayerAssetsService({
    page: 1,
    limit: 100,
    game_id: game_id,
    player_id: playerId,
  })

  const { data: playerAssetsByCollections } = usePlayerAssetsByCollectionsService({
    game_id: game_id,
    player_id: playerId,
  })

  console.log(playerAssetsByCollections)

  return {
    playerAssets,
    playerAssetsByCollections,
  }
}

export default usePlayerAssets
