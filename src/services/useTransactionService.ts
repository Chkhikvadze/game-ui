import { useQuery } from '@apollo/client'

import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'
import transactionsGql from '../gql/transaction/transactions.gql'

type transactionType = {
  page: number
  limit: number
  player_id?: any
}

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

export const useTransactions = ({ player_id, page, limit }: transactionType) => {
  const { data, error, loading, refetch } = useQuery(transactionsGql, {
    variables: { filter: { player_id, page, limit } },
  })

  return {
    data: data?.transactions || [],
    error,
    loading,
    refetch,
  }
}
