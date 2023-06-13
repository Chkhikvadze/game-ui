import { useQuery } from '@apollo/client'
import CONTRACTS_GQL from '../../gql/contract/contracts.gql'
import { IContract, PaginationResult } from 'services'

type UseContractsServiceProps = {
  page: number
  limit: number
  search_text?: string
  game_id?: string
}

export const useContractsService = ({ page, limit, game_id }: UseContractsServiceProps) => {
  const {
    data: { contracts } = {},
    error,
    loading,
    refetch,
  } = useQuery<{ contracts: PaginationResult<IContract> }>(CONTRACTS_GQL, {
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
