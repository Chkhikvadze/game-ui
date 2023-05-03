import { useQuery } from '@apollo/client'
import CONTRACT_BY_COLLECTION_ID_GQL from '../../gql/contract/contractByCollectionId.gql'
import { Contract } from 'services/types'

export const useContractByCollectionIdService = ({ id }: { id?: string }) => {
  const {
    data: { contractByCollectionId } = {},
    error,
    loading,
    refetch,
  } = useQuery<{ contractByCollectionId: Contract }>(CONTRACT_BY_COLLECTION_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: contractByCollectionId,
    error,
    loading,
    refetch,
  }
}
