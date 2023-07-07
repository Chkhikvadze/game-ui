import { useMutation } from '@apollo/client'
import DELETE_GAME_BY_ID_GQL from '../../gql/game/deleteGame.gql'

interface Data {
  deleteGame: {
    message: string
    success: boolean
  }
}

interface Variables {
  id: string
}

export const useDeleteGameByIdService = () => {
  const [mutation, { loading }] = useMutation<Data, Variables>(DELETE_GAME_BY_ID_GQL)

  const deleteGameById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const { data } = await mutation({ variables: { id } })
    const deleteGame = data?.deleteGame || { message: '', success: false }
    return deleteGame
  }

  return { deleteGameById, loading }
}
