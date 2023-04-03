import { useMutation, useQuery, WatchQueryFetchPolicy } from '@apollo/client'
// TODO: fix absolute import or alias
import CREATE_CONTRACT_GQL from '../gql/contract/createContract.gql'
import UPDATE_CONTRACT_GQL from '../gql/contract/updateContract.gql'
import COMPILE_CONTRACT_GQL from '../gql/contract/compileContract.gql'
import CONTRACT_BY_COLLECTION_ID_GQL from '../gql/contract/contractByCollectionId.gql'
import CONTRACT_BY_ID_GQL from '../gql/contract/contractById.gql'
import CONTRACTS_GQL from '../gql/contract/contracts.gql'
import { Transaction } from 'ethers'
import { useCallback } from 'react'

type Nullable<T> = T | null

interface ContractConfig {
  collection_size: number
  player_mint_fee: number
  max_mint_per_transaction: number
  max_mint_per_player: number
  is_mint_by_admin: boolean
  is_buy_by_player: boolean
  is_royalties: boolean
}

export interface Contract {
  id: string
  name: string
  contract_type: string
  blockchain: string
  chain_name: string
  chain_id: number
  environment: string
  template: string
  config: ContractConfig
  note?: string
  status: string
  source_code: { file_name: string; code: string }[]
  abi: Nullable<{ [k: string]: object }[]>
  bytecode: Nullable<string>
  constructor_args: any[]
  collection_id: Nullable<string>
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
  const [mutation] = useMutation(CREATE_CONTRACT_GQL, {
    update(
      cache,
      {
        data: {
          createContract: { contract },
        },
      },
    ) {
      cache.writeQuery({
        query: CONTRACT_BY_ID_GQL,
        variables: { id: contract.id },
        data: { contractById: contract },
      })
    },
  })

  const createContractService = useCallback(
    async (input: CreateContractInput) => {
      const { data: { createContract } = {} } = await mutation({
        variables: { input },
      })

      return createContract
    },
    [mutation],
  )

  return [createContractService]
}

export const useUpdateContractService = () => {
  const [mutation] = useMutation(UPDATE_CONTRACT_GQL)

  const updateContractService = useCallback(
    async (id: string, input: UpdateContractInput) => {
      const { data: { updateContract } = {} } = await mutation({
        variables: { id, input },
      })

      return updateContract
    },
    [mutation],
  )

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
        sort: 'modified_on',
        order: 'ASC',
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

export const useContractById = (
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
