import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { IContract, IContractConfig, IContractConstructorConfig } from 'services'
import UPDATE_CONTRACT_GQL from '../../gql/contract/updateContract.gql'

interface Data {
  updateContract: IContract
}

interface Variables {
  id: string
  input: UpdateContractInput
}

interface UpdateContractInput {
  name?: string
  chain_id?: number
  config?: IContractConfig
  constructor_config?: IContractConstructorConfig
  collection_id?: string
}

export const useUpdateContractService = () => {
  const [mutation] = useMutation<Data, Variables>(UPDATE_CONTRACT_GQL)

  const updateContractService = useCallback(
    async (id: string, input: UpdateContractInput) => {
      const { data, errors } = await mutation({
        variables: { id, input },
      })

      if (errors?.length || !data) {
        throw new Error(errors ? errors[0].message : 'Something went wrong')
      }

      return data.updateContract
    },
    [mutation],
  )

  return [updateContractService]
}
