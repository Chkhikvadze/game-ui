import { useMutation } from '@apollo/client'
import COMPILE_CONTRACT_GQL from '../../gql/contract/compileContract.gql'
import { IContract } from 'services'

interface Data {
  compileContract: IContract
}

interface Variables {
  id: string
}

export const useCompileContractService = () => {
  const [mutation] = useMutation<Data, Variables>(COMPILE_CONTRACT_GQL)

  const compileContractService = async (id: string) => {
    const { data, errors } = await mutation({
      variables: { id },
    })

    if (errors?.length || !data) {
      throw new Error(errors ? errors[0].message : 'Something went wrong')
    }

    return data.compileContract
  }

  return [compileContractService]
}
