import { useParams } from 'react-router-dom'
import { usePlayerByIdService } from 'services/usePlayerService'
import { useWalletByPlayerService } from 'services/useWalletService'

const usePlayerInfo = () => {
  const params = useParams()
  const playerId = params.playerId

  const { data: playerById } = usePlayerByIdService({ id: playerId })

  const { data: walletByPlayer, refetch: walletRefetch } = useWalletByPlayerService({
    // id: playerId,
    player_id: playerId,
  })

  return {
    walletByPlayer,
    playerById,
  }
}

export default usePlayerInfo
