import { useModal } from 'hooks'
import { useParams } from 'react-router-dom'
import { usePlayerByIdService } from 'services/usePlayerService'
import { useWalletByPlayerService } from 'services/useWalletService'
import usePlayerAssets from '../PlayerAssets/usePlayerAssets'

const usePlayerInfo = () => {
  const { openModal } = useModal()
  const params = useParams()
  const playerId = params.playerId

  const { playerAssetsByCollections } = usePlayerAssets()

  const { data: playerById } = usePlayerByIdService({ id: playerId })

  const { data: walletByPlayer, refetch: walletRefetch } = useWalletByPlayerService({
    // id: playerId,
    player_id: playerId,
  })

  return {
    walletByPlayer,
    playerById,
    openModal,
    totalAssets: playerAssetsByCollections?.total_player_assets,
  }
}

export default usePlayerInfo
