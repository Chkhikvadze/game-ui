import { useQuery } from '@apollo/client'
import CONTRACTS_GQL from '../../gql/contract/contracts.gql'
import { Contract } from 'services/types'

type UseContractsServiceProps = {
  page: number
  limit: number
  search_text?: string
  game_id?: string
}

interface PaginationResult<T> {
  items: T[]
  page: number
  total: number
  limit: number
}

export const useContractsService = ({ page, limit, game_id }: UseContractsServiceProps) => {
  const {
    data: { contracts } = {},
    error,
    loading,
    refetch,
  } = useQuery<{ contracts: PaginationResult<Contract> }>(CONTRACTS_GQL, {
    variables: {
      filter: {
        // search_text,
        page,
        limit,
        sort: 'modified_on',
        order: 'DESC',
        game_id,
      },
    },
    skip: !game_id,
  })

  return {
    data: contracts,
    error,
    loading,
    refetch,
  }
}
