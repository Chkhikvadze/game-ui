import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'
import createProjectGql from '../gql/project/createProject.gql'
import projectsGql from '../gql/project/projects.gql'

// const createProjectGql = loader("../gql/project/createProject.gql")
// const projectsGql = loader("../gql/project/projects.gql")

import projectByIdGql from '../gql/project/projectById.gql'
import updateProjectByIdGql from '../gql/project/updateProject.gql'
import updateProjectMediasGql from '../gql/project/updateProjectMedia.gql'
import setDefaultProjectImageGql from '../gql/project/setDefaultProjectMedia.gql'
import deleteProjectByIdGql from '../gql/project/deleteProject.gql'
import updateProjectSocialLinksGql from '../gql/project/updateProjectSocialLinks.gql'

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

export const useCreateProjectService = () => {
  const [mutation] = useMutation(createProjectGql)
  const createProjectService = async (input: createProjectType, callback: any) => {
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

  return [createProjectService]
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
      data: { project },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return project
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
  const [mutation, { loading }] = useMutation(setDefaultProjectImageGql)

  const setDefaultProjectMedia = async (
    project_id: string,
    media_id: string,
  ): Promise<{ success: boolean }> => {
    const {
      data: { projectMedia },
    } = await mutation({ variables: { project_id, media_id } })
    return projectMedia
  }
  return { setDefaultProjectMedia, loading }
}
