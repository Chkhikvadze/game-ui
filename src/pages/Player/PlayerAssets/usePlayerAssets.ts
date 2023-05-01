import { useParams } from 'react-router-dom'
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

  return {
    playerAssetsByCollections,
  }
}

export default usePlayerAssets
