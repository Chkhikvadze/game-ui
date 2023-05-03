import { useMutation } from '@apollo/client'
// TODO: fix absolute import or alias
import DEPLOY_CONTRACT_GQL from '../../gql/contract/deployContract.gql'

export const useDeployContractService = () => {
  const [mutation] = useMutation(DEPLOY_CONTRACT_GQL)

  const deployContractService = async (id: string) => {
    const { data: { deployContract } = {} } = await mutation({
      variables: { id },
    })

    return deployContract
  }

  return [deployContractService]
}
