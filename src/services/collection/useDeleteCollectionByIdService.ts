import { useMutation } from '@apollo/client'
import DELETE_COLLECTION_BY_ID_SERVICE from '../../gql/collection/deleteCollectionById.gql'

export const useDeleteCollectionByIdService = () => {
  const [mutation] = useMutation(DELETE_COLLECTION_BY_ID_SERVICE)

  const deleteCollectionById = async (
    id: string,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteCollection },
    } = await mutation({ variables: { id } })
    return deleteCollection
  }
  return [deleteCollectionById]
}
