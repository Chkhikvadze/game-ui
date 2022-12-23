import { useQuery } from '@apollo/client'

import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'

export const useTransactionsByPlayer = ({ player_id }: { player_id: any }) => {
  const {
    data: { transactionsByPlayer } = [],
    error,
    loading,
    refetch,
  } = useQuery(transactionsByPlayerGql, {
    variables: { player_id: player_id },
  })

  return {
    data: transactionsByPlayer || [],
    error,
    loading,
    refetch,
  }
}
