import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

const createCollectionGql = loader("../gql/collection/createCollection.gql")
const collectionsGql = loader("../gql/collection/collections.gql")
const collectionByIdGql = loader("../gql/collection/collectionById.gql")
const updateCollectionByIdGql = loader("../gql/collection/updateCollectionById.gql")
const deleteCollectionByIdGql = loader("../gql/collection/deleteCollectionById.gql")


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
        "order":"ASC",
	  },
    },
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
  })
  
  return {
    data:collectionById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateCollectionByIdService = () => {
  const [mutation] = useMutation(updateCollectionByIdGql)
  const updateCollectionById = async (id: any, input: any): Promise<{success: boolean}> => {
    const {data:{collection}} = await mutation({
	  variables:{
        id, input,
	  },
    })
    return collection
  }
  
  return [updateCollectionById]
  
}

export const useDeleteCollectionByIdService = () => {
  const [mutation] = useMutation(deleteCollectionByIdGql)
  
  const deleteCollectionById = async (id: string): Promise<{message: string; success: boolean}> => {
    const {
	  data:{deleteCollection},
    } = await mutation({variables:{id}})
    return deleteCollection
  }
  return [deleteCollectionById]
  
}


