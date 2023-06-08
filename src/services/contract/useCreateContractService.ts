import { useMutation } from '@apollo/client'
// TODO: fix absolute import or alias
import CREATE_CONTRACT_GQL from '../../gql/contract/createContract.gql'
import CONTRACT_BY_ID_GQL from '../../gql/contract/contractById.gql'
import { IContractConstructorConfig, IContractConfig, IContract } from 'services'

interface Data {
  createContract: IContract
}

interface Variables {
  input: CreateContractInput
}

interface CreateContractInput {
  name: string
  contract_type: string
  chain_id: number
  config: IContractConfig
  constructor_config: IContractConstructorConfig
  game_id: string
}

export const useCreateContractService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(CREATE_CONTRACT_GQL, {
    update(cache, { data }) {
      const contract = data?.createContract
      if (!contract) return

      cache.writeQuery({
        query: CONTRACT_BY_ID_GQL,
        variables: { id: contract.id },
        data: { contractById: contract },
      })
    },
  })

  const createContractService = async (input: CreateContractInput) => {
    const { data, errors } = await mutation({
      variables: { input },
    })

    if (errors?.length || !data) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return data.createContract
  }

  return {
    createContractService,
    loading,
  }
}
