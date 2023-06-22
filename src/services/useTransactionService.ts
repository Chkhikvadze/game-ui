import { useQuery } from '@apollo/client'

// import transactionsByPlayerGql from '../gql/transaction/transactionsByPlayer.gql'
import TRANSACTIONS_GQL from '../gql/transaction/transactions.gql'
import transactionsPlayersCountByCollectionGql from '../gql/transaction/transactionsPlayersCountByCollection.gql'

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
  game_id?: string
}

export const useTransactions = ({ game_id, player_id, page, limit }: UseTransactionsProps) => {
  const { data, error, loading, refetch } = useQuery(TRANSACTIONS_GQL, {
    variables: { filter: { game_id, player_id, page, limit } },
    // skip: !player_id || !game_id,
  })

  return {
    data: data?.transactions || [],
    error,
    loading,
    refetch,
  }
}

export const useTransactionsPlayersCountByCollectionService = (collection_id: string) => {
  const {
    data: { transactionsPlayersCountByCollection } = [],
    error,
    loading,
    refetch,
  } = useQuery(transactionsPlayersCountByCollectionGql, {
    variables: {
      collection_id,
    },
  })

  return {
    data: transactionsPlayersCountByCollection || [],
    error,
    loading,
    refetch,
  }
}
