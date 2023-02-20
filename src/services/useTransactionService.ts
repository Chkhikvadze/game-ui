import { useQuery } from '@apollo/client'

import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'

export const useTransactionsByPlayer = ({ player_id }: { player_id: any }) => {
  const { data, error, loading, refetch } = useQuery(transactionsByPlayerGql, {
    variables: { player_id: player_id },
  })

  return {
    data: data?.transactionsByPlayer || [],
    error,
    loading,
    refetch,
  }
}
