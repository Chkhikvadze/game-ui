import { useMutation, useQuery } from '@apollo/client'
// TODO: fix absolute import or alias
import CREATE_CONTRACT_GQL from '../gql/contract/createContract.gql'
import CONTRACT_BY_COLLECTION_ID_GQL from '../gql/contract/contractByCollectionId.gql'

interface CreateContractInput {
  chain: string
  environment: string

  name: string
  contract_type: string
  template: string
  note: string

  collection_id: string

  token_uri?: string
  max_supply?: number
  tokens_per_trans_limit?: number
}

export const useCreateContractService = () => {
  const [mutation] = useMutation(CREATE_CONTRACT_GQL)

  const createContractService = async (input: CreateContractInput) => {
    const { data: { createContract } = {} } = await mutation({
      variables: { input },
    })
    // if (callback) {
    //   callback()
    // }

    return createContract
  }

  return [createContractService]
}

export const useContractByCollectionId = ({ id }: { id?: string }) => {
  const {
    data: { contractByCollectionId } = {},
    error,
    loading,
    refetch,
  } = useQuery(CONTRACT_BY_COLLECTION_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: contractByCollectionId || {},
    error,
    loading,
    refetch,
  }
}
