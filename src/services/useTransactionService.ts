import { useQuery } from '@apollo/client'

// import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'
import TRANSACTIONS_GQL from '../gql/transaction/transactions.gql'

// export const useTransactionsByPlayer = ({ player_id }: { player_id: string }) => {
//   const { data, error, loading, refetch } = useQuery(transactionsByPlayerGql, {
//     variables: { player_id: player_id },
//   })

//   return {
//     data: data?.transactionsByPlayer || [],
//     error,
//     loading,
//     refetch,
//   }
// }

type UseTransactionsProps = {
  page: number
  limit: number
  player_id?: string
}

export const useTransactions = ({ player_id, page, limit }: UseTransactionsProps) => {
  const { data, error, loading, refetch } = useQuery(TRANSACTIONS_GQL, {
    variables: { filter: { player_id, page, limit } },
    skip: !player_id,
  })

  return {
    data: data?.transactions || [],
    error,
    loading,
    refetch,
  }
}
