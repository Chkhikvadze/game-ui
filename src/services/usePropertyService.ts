import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

const createPropertyGql = loader("../gql/property/createProperty.gql")
const propertiesGql = loader("../gql/property/properties.gql")
const propertyByIdGql = loader("../gql/property/propertyById.gql")
const updatePropertyByIdGql = loader("../gql/property/updatePropertyById.gql")
const deletePropertyByIdGql = loader("../gql/property/deletePropertyById.gql")


// type createProjectType = {
//   name: String
//   category: String
//   description: String
// }

type propertiesType = {
  page: number
  limit: number
  search_text: string
  project_id: string
  collection_id: string
}


export const useCreatePropertyService = () => {
  const [mutation] = useMutation(createPropertyGql)
  const createPropertyService = async (input: any, callback: any) => {
    const {
	  data:{createProperty},
    } = await mutation({
	  variables:{input},
    })
    if (callback) {
	  callback()
    }
	
    return createProperty
  }
  
  return [createPropertyService]
}


export const usePropertiesService = ({
  page,
  limit,
  search_text,
  project_id,
  collection_id,
}: propertiesType) => {
  const {
    data:{properties} = [],
    error,
    loading,
    refetch,
  } = useQuery(propertiesGql, {
    variables:{
	  filter:{
        project_id,
        collection_id,
        search_text,
        page,
        limit,
        "sort":"name",
        "order":"ASC",
	  },
    },
  })
  
  return {
    data:properties || [],
    error,
    loading,
    refetch,
  }
}


export const usePropertyIdService = ({id}: {id: any}) => {
  const {
    data:{propertyById} = [],
    error,
    loading,
    refetch,
  } = useQuery(propertyByIdGql, {
    variables:{id},
  })
  
  return {
    data:propertyById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdatePropertyByIdService = () => {
  const [mutation] = useMutation(updatePropertyByIdGql)
  const updatePropertyById = async (id: any, input: any): Promise<{success: boolean}> => {
    const {data:{nft}} = await mutation({
	  variables:{
        id, input,
	  },
    })
    return nft
  }
  
  return [updatePropertyById]
  
}

export const useDeletePropertyByIdService = () => {
  const [mutation] = useMutation(deletePropertyByIdGql)
  
  const deletePropertyById = async (id: string): Promise<{message: string; success: boolean}> => {
    const {
	  data:{deleteProperty},
    } = await mutation({variables:{id}})
    return deleteProperty
  }
  return [deletePropertyById]
  
}


