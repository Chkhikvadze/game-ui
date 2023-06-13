import { useQuery, WatchQueryFetchPolicy } from '@apollo/client'
import CONTRACT_BY_ID_GQL from '../../gql/contract/contractById.gql'
import { IContract } from 'services/types'

interface Data {
  contractById: IContract
}

interface Variables {
  id?: string
}

export const useContractByIdService = (
  { id }: { id?: string },
  { fetchPolicy }: { fetchPolicy?: WatchQueryFetchPolicy } = {},
) => {
  const {
    data: { contractById } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(CONTRACT_BY_ID_GQL, {
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
