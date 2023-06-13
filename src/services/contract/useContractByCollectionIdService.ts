import { useQuery } from '@apollo/client'
import CONTRACT_BY_COLLECTION_ID_GQL from '../../gql/contract/contractByCollectionId.gql'
import { IContract } from 'services/types'

interface Data {
  contractByCollectionId: IContract
}

interface Variables {
  id?: string
}

export const useContractByCollectionIdService = ({ id }: { id?: string }) => {
  const {
    data: { contractByCollectionId } = {},
    error,
    loading,
    refetch,
  } = useQuery<Data, Variables>(CONTRACT_BY_COLLECTION_ID_GQL, {
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
