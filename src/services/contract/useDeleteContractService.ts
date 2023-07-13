import { useMutation } from '@apollo/client'
import DELETE_CONTRACT_GQL from '../../gql/contract/deleteContract.gql'

interface Data {
  deleteContract: {
    message: string
    success: boolean
  }
}

interface Variables {
  id: string
}

export const useDeleteContractService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(DELETE_CONTRACT_GQL)

  const deleteContractService = async (
    id: string,
  ): Promise<{ message: string; success: boolean }> => {
    const { data } = await mutation({ variables: { id } })
    const deleteContract = data?.deleteContract || { message: '', success: false }
    return deleteContract
  }
  return { deleteContractService, loading }
}
