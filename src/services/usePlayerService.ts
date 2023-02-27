import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

// const createPlayerGql = loader('../gql/player/createPlayer.gql')
// const playersGql = loader('../gql/player/players.gql')
// const playerByIdGql = loader('../gql/player/playerById.gql')
// const updatePlayerGql = loader('../gql/player/updatePlayer.gql')
// const deletePlayerGql = loader('../gql/player/deletePlayer.gql')

import createPlayerGql from '../gql/player/createPlayer.gql'
import playersGql from '../gql/player/players.gql'
import playersImagesGql from '../gql/player/playersImages.gql'
import playerByIdGql from '../gql/player/playerById.gql'
import updatePlayerGql from '../gql/player/updatePlayer.gql'
import deletePlayerGql from '../gql/player/deletePlayer.gql'

type createPlayerType = {
  unique_id: string
  avatar: string
  name: string
  project_id: any
  username: string
  email: string
  is_create_wallet: boolean
}

type playersService = {
  page: number
  limit: number
  search_text: string
  project_id: any
}

export const useCreatePlayerService = () => {
  const [mutation] = useMutation(createPlayerGql)
  const createPlayerService = async (input: createPlayerType, callback: any) => {
    const {
      data: { createPlayer },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }
    return createPlayer
  }

  return [createPlayerService]
}

export const usePlayersService = ({ page, limit, search_text, project_id }: playersService) => {
  const {
    data: { players } = [],
    error,
    loading,
    refetch,
  } = useQuery(playersGql, {
    variables: {
      filter: {
        project_id,
        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
  })

  return {
    data: players || [],
    error,
    loading,
    refetch,
  }
}

export const usePlayersImages = ({ project_id, limit }: any) => {
  const {
    data: { playersImages } = [],
    error,
    loading,
    refetch,
  } = useQuery(playersImagesGql, {
    variables: {
      filter: {
        project_id,
        limit,
      },
    },
  })

  return {
    data: playersImages || [],
    error,
    loading,
    refetch,
  }
}

export const usePlayerByIdService = ({ id }: { id: any }) => {
  const {
    data: { playerById } = [],
    error,
    loading,
    refetch,
  } = useQuery(playerByIdGql, {
    variables: { id },
  })

  return {
    data: playerById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdatePlayerByIdService = () => {
  const [mutation] = useMutation(updatePlayerGql)
  const updatePlayerById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { player },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return player
  }

  return [updatePlayerById]
}

export const useDeletePlayerByIdService = () => {
  const [mutation] = useMutation(deletePlayerGql)

  const deletePlayerById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deletePlayer },
    } = await mutation({ variables: { id } })
    return deletePlayer
  }
  return [deletePlayerById]
}
