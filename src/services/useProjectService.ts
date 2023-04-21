import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'
import createProjectGql from '../gql/game/createProject.gql'
import projectsGql from '../gql/game/projects.gql'

// const createProjectGql = loader("../gql/game/createProject.gql")
// const projectsGql = loader("../gql/game/projects.gql")

import projectByIdGql from '../gql/game/projectById.gql'
import updateProjectByIdGql from '../gql/game/updateProject.gql'
import updateProjectMediasGql from '../gql/game/updateProjectMedia.gql'
import setDefaultProjectMediaGql from '../gql/game/setDefaultProjectMedia.gql'
import deleteProjectByIdGql from '../gql/game/deleteProject.gql'
import updateProjectSocialLinksGql from '../gql/game/updateProjectSocialLinks.gql'

type createProjectType = {
  name: string
  category: string
  // description: String
}

type projectsService = {
  page: number
  limit: number
  search_text: string
}

export const useCreateGameService = () => {
  const [mutation] = useMutation(createProjectGql)
  const createGameService = async (input: createProjectType, callback: any) => {
    const {
      data: { createProject },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createProject
  }

  return [createGameService]
}

export const useProjectsService = ({ page, limit, search_text }: projectsService) => {
  const { data, error, loading, refetch } = useQuery(projectsGql, {
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
    data: data?.projects || [],
    error,
    loading,
    refetch,
  }
}

export const useProjectByIdService = ({ id }: { id: any }) => {
  const {
    data: { projectById } = [],
    error,
    loading,
    refetch,
  } = useQuery(projectByIdGql, {
    variables: { id },
  })

  return {
    data: projectById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateProjectByIdService = () => {
  const [mutation] = useMutation(updateProjectByIdGql)
  const updateProjectById = async (id: any, input: any): Promise<{ success: boolean }> => {
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

  return [updateProjectById]
}

export const useUpdateProjectImages = () => {
  const [mutation] = useMutation(updateProjectMediasGql)
  const updateProjectImages = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { updateProjectImages },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updateProjectImages
  }

  return [updateProjectImages]
}

export const useUpdateProjectSocialLinksService = () => {
  const [mutation, { loading }] = useMutation(updateProjectSocialLinksGql)
  const updateProjectSocialLinks = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { updateProjectSocialLinks },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updateProjectSocialLinks
  }

  return { updateProjectSocialLinks, loading }
}

export const useDeleteProjectByIdService = () => {
  const [mutation, { loading }] = useMutation(deleteProjectByIdGql)

  const deleteProjectById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteProject },
    } = await mutation({ variables: { id } })
    return deleteProject
  }
  return { deleteProjectById, loading }
}

export const useSetDefaultProjectMediaService = () => {
  const [mutation, { loading }] = useMutation(setDefaultProjectMediaGql)

  const setDefaultProjectMedia = async (
    game_id: string,
    media_id: string,
  ): Promise<{ success: boolean }> => {
    const {
      data: { projectMedia },
    } = await mutation({ variables: { game_id, media_id } })
    return projectMedia
  }
  return { setDefaultProjectMedia, loading }
}
