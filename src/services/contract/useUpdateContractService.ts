import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { Contract, ContractConfig, ContractConstructorConfig } from 'services'
import UPDATE_CONTRACT_GQL from '../../gql/contract/updateContract.gql'

interface Data {
  updateContract: Contract
}

interface Variables {
  id: string
  input: UpdateContractInput
}

interface UpdateContractInput {
  name?: string
  chain_id?: number
  config?: ContractConfig
  constructor_config?: ContractConstructorConfig
  collection_id?: string
}

export const useUpdateContractService = () => {
  const [mutation] = useMutation<Data, Variables>(UPDATE_CONTRACT_GQL)

  const updateContractService = useCallback(
    async (id: string, input: UpdateContractInput) => {
      const { data, errors } = await mutation({
        variables: { id, input },
      })

      const contract = data?.updateContract

      if (errors?.length || !contract) {
        throw new Error(errors ? errors[0].message : 'Something went wrong')
      }

      return contract
    },
    [mutation],
  )

  return [updateContractService]
}
