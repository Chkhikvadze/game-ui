import { useMutation } from '@apollo/client'
import DELETE_GAME_BY_ID_GQL from '../../gql/game/deleteGame.gql'

export const useDeleteGameByIdService = () => {
  const [mutation, { loading }] = useMutation(DELETE_GAME_BY_ID_GQL)

  const deleteGameById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteGame },
    } = await mutation({ variables: { id } })
    return deleteGame
  }
  return { deleteGameById, loading }
}
