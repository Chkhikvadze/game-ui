import { useMutation } from '@apollo/client'
import COMPILE_CONTRACT_GQL from '../../gql/contract/compileContract.gql'

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
