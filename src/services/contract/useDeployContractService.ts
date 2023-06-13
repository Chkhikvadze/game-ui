import { useMutation } from '@apollo/client'
import DEPLOY_CONTRACT_GQL from '../../gql/contract/deployContract.gql'
import { IContract } from 'services'

interface Data {
  deployContract: IContract
}

interface Variables {
  id: string
}

export const useDeployContractService = () => {
  const [mutation] = useMutation<Data, Variables>(DEPLOY_CONTRACT_GQL)

  const deployContractService = async (id: string) => {
    const { data, errors } = await mutation({
      variables: { id },
    })

    if (errors?.length || !data) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return data.deployContract
  }

  return [deployContractService]
}
