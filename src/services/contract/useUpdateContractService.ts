import { useMutation } from '@apollo/client'
// TODO: fix absolute import or alias
import UPDATE_CONTRACT_GQL from '../../gql/contract/updateContract.gql'
import { useCallback } from 'react'
import { ContractFormConfig } from 'pages/Contract/ContractForm/useContractForm'
import { Transaction } from 'ethers'

interface UpdateContractInput {
  name?: string
  contract_type?: string
  chain_id?: number
  environment?: string
  template?: string
  config?: ContractFormConfig
  constructor_args?: unknown[]
  note?: string
  collection_id?: string
  transaction_hash?: string
  contract_address?: string
  deployer_address?: string
  deploy_transaction?: Transaction
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
