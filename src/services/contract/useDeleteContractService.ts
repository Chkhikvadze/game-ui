import { useMutation } from '@apollo/client'
import DELETE_CONTRACT_SERVICE from '../../gql/contract/deleteContract.gql'

export const useDeleteContractService = () => {
  const [mutation] = useMutation(DELETE_CONTRACT_SERVICE)

  const deleteContractService = async (
    id?: string,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteContract },
    } = await mutation({ variables: { id } })
    return deleteContract
  }
  return [deleteContractService]
}
