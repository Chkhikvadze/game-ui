import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

const createCollectionGql = loader("../gql/collection/createCollection.gql")
const collectionsGql = loader("../gql/collection/collections.gql")
const collectionByIdGql = loader("../gql/collection/collectionById.gql")


// type createProjectType = {
//   name: String
//   category: String
//   description: String
// }

type collectionsType = {
  page: number
  limit: number
  search_text: string
  project_id: string
}


export const useCreateCollectionService = () => {
  const [mutation] = useMutation(createCollectionGql)
  const createCollectionService = async (input: any, callback: any) => {
	const {
	  data:{createCollection},
	} = await mutation({
	  variables:{input},
	})
	if (callback) {
	  callback()
	}
	
	return createCollection
  }
  
  return [createCollectionService]
}


export const useCollectionsService = ({
  page,
  limit,
  search_text,
  project_id,
}: collectionsType) => {
  const {
	data:{collections} = [],
	error,
	loading,
	refetch,
  } = useQuery(collectionsGql, {
	variables:{
	  filter:{
		project_id,
		search_text,
		page,
		limit,
		"sort":"name",
		"order":"ASC"
	  }
	},
	fetchPolicy:'cache-first',
  })
  
  return {
	data:collections || [],
	error,
	loading,
	refetch,
  }
}


export const useCollectionByIdService = ({id}: {id: any}) => {
  const {
	data:{collectionById} = [],
	error,
	loading,
	refetch,
  } = useQuery(collectionByIdGql, {
	variables:{id},
	fetchPolicy:'cache-first',
  })
  
  return {
	data:collectionById || {},
	error,
	loading,
	refetch,
  }
}

//
//
// export const useUpdateProjectByIdService = () => {
//   const [mutation] = useMutation(updateProjectByIdGql)
//   const updateProjectById = async (id: any, input: createProjectType): Promise<{success: boolean}> => {
// 	const {data:{project}} = await mutation({
// 	  variables:{
// 		id, input
// 	  }
// 	})
// 	return project
//   }
//
//   return [updateProjectById]
//
// }
//
// export const useDeleteProjectByIdService = () => {
//   const [mutation] = useMutation(deleteProjectByIdGql)
//
//   const deleteProjectById = async (id: string): Promise<{message: string; success: boolean}> => {
// 	const {
// 	  data:{deleteProject},
// 	} = await mutation({variables:{id}})
// 	return deleteProject
//   }
//   return [deleteProjectById]
//
// }
//
//
