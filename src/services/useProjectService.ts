import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

const createProjectGql = loader("../gql/project/createProject.gql")
const projectsGql = loader("../gql/project/projects.gql")
const projectByIdGql = loader("../gql/project/projectById.gql")
const updateProjectByIdGql = loader("../gql/project/updateProject.gql")
const deleteProjectByIdGql = loader("../gql/project/deleteProject.gql")

type createProjectType = {
  name: String
  category: String
  description: String
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
	  data:{createProject},
	} = await mutation({
	  variables:{input},
	})
	if (callback) {
	  callback()
	}
	
	return createProject
  }
  
  return [createProjectService]
}


export const useProjectsService = ({
  page,
  limit,
  search_text
}: projectsService) => {
  const {
	data:{projects} = [],
	error,
	loading,
	refetch,
  } = useQuery(projectsGql, {
	variables:{filter:{
		  search_text,
		  page,
		  limit,
		  "sort": "name",
		  "order":"ASC"
		}},
  })
  
  return {
	data:projects || [],
	error,
	loading,
	refetch,
  }
}


export const useProjectByIdService = ({id}: {id: any}) => {
  const {
	data:{projectById} = [],
	error,
	loading,
	refetch,
  } = useQuery(projectByIdGql, {
	variables:{id},
  })
  
  return {
	data:projectById || {},
	error,
	loading,
	refetch,
  }
}


export const useUpdateProjectByIdService = () => {
  const [mutation] = useMutation(updateProjectByIdGql)
  const updateProjectById = async (id: any, input: createProjectType): Promise<{success: boolean}> => {
	const {data:{project}} = await mutation({
	  variables:{
		id, input
	  }
	})
	return project
  }
  
  return [updateProjectById]
  
}

export const useDeleteProjectByIdService = () => {
  const [mutation] = useMutation(deleteProjectByIdGql)
  
  const deleteProjectById = async (id: string): Promise<{message: string; success: boolean}> => {
	const {
	  data:{deleteProject},
	} = await mutation({variables:{id}})
	return deleteProject
  }
  return [deleteProjectById]
  
}


