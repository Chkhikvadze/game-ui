import { useMutation, useQuery } from '@apollo/client'
// TODO: fix absolute import or alias
import CREATE_CONTRACT_GQL from '../gql/contract/createContract.gql'
import UPDATE_CONTRACT_GQL from '../gql/contract/updateContract.gql'
import COMPILE_CONTRACT_GQL from '../gql/contract/compileContract.gql'
import CONTRACT_BY_COLLECTION_ID_GQL from '../gql/contract/contractByCollectionId.gql'
import CONTRACT_BY_ID_GQL from '../gql/contract/contractById.gql'
import CONTRACTS_GQL from '../gql/contract/contracts.gql'
import { Transaction } from 'ethers'

type Nullable<T> = T | null

export interface Contract {
  id: string
  name: string
  contract_type?: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: { [k: string]: object }[]
  bytecode: string
  constructor_args: Nullable<unknown[]>
  collection_id?: string
  deployer_address?: `0x${string}`
  contract_address: `0x${string}`
  transaction_hash?: string
}

interface CreateContractInput {
  name: string
  contract_type?: string
  blockchain?: string
  chain_name?: string
  chain_id: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  note?: string
  collection_id?: string
  project_id?: string
}

interface UpdateContractInput {
  name?: string
  contract_type?: string
  chain_id?: number
  environment?: string
  template?: string
  config?: Record<string, unknown>
  constructor_args?: unknown[]
  note?: string
  collection_id?: string
  transaction_hash?: string
  contract_address?: string
  deployer_address?: string
  deploy_transaction?: Transaction
}

export const useCreateContractService = () => {
  const [mutation, { loading }] = useMutation(CREATE_CONTRACT_GQL)

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

export const useCompileContractService = () => {
  const [mutation] = useMutation(COMPILE_CONTRACT_GQL)

  const compileContractService = async (id: string) => {
    const { data: { compileContract } = {} } = await mutation({
      variables: { id },
    })

    return compileContract
  }

  return [compileContractService]
}

type UseContractsServiceProps = {
  page: number
  limit: number
  search_text?: string
  project_id?: string
}

interface PaginationResult<T> {
  items: T[]
  page: number
  total: number
  limit: number
}

export const useContractsService = ({ page, limit, project_id }: UseContractsServiceProps) => {
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
        // sort: 'name',
        // order: 'ASC',
        project_id,
      },
    },
    skip: !project_id,
  })

  return {
    data: contracts,
    error,
    loading,
    refetch,
  }
}

export const useContractById = ({ id }: { id?: string }) => {
  const {
    data: { contractById } = {},
    error,
    loading,
    refetch,
  } = useQuery<{ contractById: Contract }>(CONTRACT_BY_ID_GQL, {
    variables: { id },
    skip: !id,
  })

  return {
    data: contractById,
    error,
    loading,
    refetch,
  }
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
