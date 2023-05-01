import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import CONTRACT_BY_ID_GQL from '../../gql/contract/contractById.gql'
import { Contract } from 'services/types'

export const useContractByIdService = (
  { id }: { id?: string },
  { fetchPolicy }: { fetchPolicy?: WatchQueryFetchPolicy } = {},
) => {
  const {
    data: { contractById } = {},
    error,
    loading,
    refetch,
  } = useQuery<{ contractById: Contract }>(CONTRACT_BY_ID_GQL, {
    variables: { id },
    skip: !id,
    fetchPolicy,
  })

  return {
    data: contractById,
    error,
    loading,
    refetch,
  }
}
