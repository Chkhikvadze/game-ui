import { useParams } from 'react-router-dom'
import { useTransactions } from 'services/useTransactionService'

const usePlayerTransactions = () => {
  const params = useParams()
  const playerId = params.playerId

  const { data: transactionsByPlayer } = useTransactions({
    player_id: playerId,
    page: 1,
    limit: 100,
  })

  return {
    transactionsByPlayer,
  }
}

export default usePlayerTransactions
