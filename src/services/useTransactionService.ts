import { useQuery } from '@apollo/client'

import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'
// import walletByPlayerGql from '../gql/wallet/walletByPlayer.gql'

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
