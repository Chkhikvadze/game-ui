import { useMutation, useQuery } from '@apollo/client'
// TODO: fix absolute import or alias
import CREATE_CONTRACT_GQL from '../gql/contract/createContract.gql'
import UPDATE_CONTRACT_GQL from '../gql/contract/updateContract.gql'
import CONTRACT_BY_COLLECTION_ID_GQL from '../gql/contract/contractByCollectionId.gql'
import { Transaction } from 'ethers'

export interface Contract {
  id: string
  name?: string
  contract_type?: string
  blockchain?: string
  chain_name?: string
  chain_id?: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: { [k: string]: object }[]
  bytecode: string
  constructor_args?: unknown[]
  collection_id?: string
  deployer_address?: `0x${string}`
  contract_address: `0x${string}`
  transaction_hash?: string
}

interface UpdateContractInput {
  name?: string
  contract_type?: string
  blockchain?: string
  chain_name?: string
  chain_id?: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  constructor_args?: unknown[]
  note?: string
  transaction_hash?: string
  contract_address?: string
  deployer_address?: string
  deploy_transaction?: Transaction
}

interface CreateContractInput {
  name: string
  contract_type: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment: string
  template: string
  config: Record<string, unknown>
  note: string
  collection_id: string
}

export const useCreateContractService = () => {
  const [mutation] = useMutation(CREATE_CONTRACT_GQL)

  const createContractService = async (input: CreateContractInput) => {
    const { data: { createContract } = {} } = await mutation({
      variables: { input },
    })

    return createContract
  }

  return [createContractService]
}

export const useUpdateContractService = () => {
  const [mutation] = useMutation(UPDATE_CONTRACT_GQL)

  const updateContractService = async (id: string, input: UpdateContractInput) => {
    const { data: { updateContract } = {} } = await mutation({
      variables: { id, input },
    })

    return updateContract
  }

  return [updateContractService]
}

export const useContractByCollectionId = ({ id }: { id?: string }) => {
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
