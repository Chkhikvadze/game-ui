import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'
import createGameGql from '../gql/game/createGame.gql'
import gamesGql from '../gql/game/games.gql'

// const createGameGql = loader("../gql/game/createGame.gql")
// const gamesGql = loader("../gql/game/games.gql")

import gameByIdGql from '../gql/game/gameById.gql'
import updateGameByIdGql from '../gql/game/updateGame.gql'
import updateGameMediasGql from '../gql/game/updateGameMedia.gql'
import setDefaultGameMediaGql from '../gql/game/setDefaultGameMedia.gql'
import deleteGameByIdGql from '../gql/game/deleteGame.gql'
import updateGameSocialLinksGql from '../gql/game/updateGameSocialLinks.gql'

type createGameType = {
  name: string
  category: string
  // description: String
}

type gamesService = {
  page: number
  limit: number
  search_text: string
}

export const useCreateGameService = () => {
  const [mutation] = useMutation(createGameGql)
  const createGameService = async (input: createGameType, callback: any) => {
    const {
      data: { createGame },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createGame
  }

  return [createGameService]
}

export const useGamesService = ({ page, limit, search_text }: gamesService) => {
  const { data, error, loading, refetch } = useQuery(gamesGql, {
    variables: {
      filter: {
        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
  })

  return {
    data: data?.games || [],
    error,
    loading,
    refetch,
  }
}
export const useGamesServiceLazy = () => {
  const [getGames, { loading, error, data }] = useLazyQuery(gamesGql)
  return {
    getGames,
    loading,
    error,
    data: data?.games || [],
  }
}

export const useGameByIdService = ({ id }: { id: any }) => {
  const {
    data: { gameById } = [],
    error,
    loading,
    refetch,
  } = useQuery(gameByIdGql, {
    variables: { id },
  })

  return {
    data: gameById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateGameByIdService = () => {
  const [mutation] = useMutation(updateGameByIdGql)
  const updateGameById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { game },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return game
  }

  return [updateGameById]
}

export const useUpdateGameImages = () => {
  const [mutation] = useMutation(updateGameMediasGql)
  const updateGameImages = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { updateGameImages },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updateGameImages
  }

  return [updateGameImages]
}

export const useUpdateGameSocialLinksService = () => {
  const [mutation, { loading }] = useMutation(updateGameSocialLinksGql)
  const updateGameSocialLinks = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { updateGameSocialLinks },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updateGameSocialLinks
  }

  return { updateGameSocialLinks, loading }
}

export const useDeleteGameByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteGameByIdGql)

  const deleteGameById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteGame },
    } = await mutation({ variables: { id } })
    return deleteGame
  }
  return { deleteGameById, loading }
}

export const useSetDefaultGameMediaService = () => {
  const [mutation, { loading }] = useMutation(setDefaultGameMediaGql)

  const setDefaultGameMedia = async (
    game_id: string,
    media_id: string,
  ): Promise<{ success: boolean }> => {
    const {
      data: { gameMedia },
    } = await mutation({ variables: { game_id, media_id } })
    return gameMedia
  }
  return { setDefaultGameMedia, loading }
}
