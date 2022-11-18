import { useMutation, useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

const createNftGql = loader("../gql/nft/createNft.gql")
const nftsGql = loader("../gql/nft/nfts.gql")
// const collectionsGql = loader("../gql/collection/collections.gql")
// const collectionByIdGql = loader("../gql/collection/collectionById.gql")
// const updateCollectionByIdGql = loader("../gql/collection/updateCollectionById.gql")
// const deleteCollectionByIdGql = loader("../gql/collection/deleteCollectionById.gql")


// type createProjectType = {
//   name: String
//   category: String
//   description: String
// }

type nftsType = {
  page: number
  limit: number
  search_text: string
  project_id: string
  collection_id: string
}


export const useCreateNftService = () => {
  const [mutation] = useMutation(createNftGql)
  const createNftService = async (input: any, callback: any) => {
	const {
	  data:{createNft},
	} = await mutation({
	  variables:{input},
	})
	if (callback) {
	  callback()
	}
	
	return createNft
  }
  
  return [createNftService]
}


export const useNftsService = ({
  page,
  limit,
  search_text,
  project_id,
  collection_id
}: nftsType) => {
  const {
	data:{nfts} = [],
	error,
	loading,
	refetch,
  } = useQuery(nftsGql, {
	variables:{
	  filter:{
		project_id,
		collection_id,
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
	data:nfts || [],
	error,
	loading,
	refetch,
  }
}
//
//
// export const useCollectionByIdService = ({id}: {id: any}) => {
//   const {
// 	data:{collectionById} = [],
// 	error,
// 	loading,
// 	refetch,
//   } = useQuery(collectionByIdGql, {
// 	variables:{id},
// 	fetchPolicy:'cache-first',
//   })
//
//   return {
// 	data:collectionById || {},
// 	error,
// 	loading,
// 	refetch,
//   }
// }
//
// export const useUpdateCollectionByIdService = () => {
//   const [mutation] = useMutation(updateCollectionByIdGql)
//   const updateCollectionById = async (id: any, input: any): Promise<{success: boolean}> => {
// 	const {data:{collection}} = await mutation({
// 	  variables:{
// 		id, input
// 	  }
// 	})
// 	return collection
//   }
//
//   return [updateCollectionById]
//
// }
//
// export const useDeleteCollectionByIdService = () => {
//   const [mutation] = useMutation(deleteCollectionByIdGql)
//
//   const deleteCollectionById = async (id: string): Promise<{message: string; success: boolean}> => {
// 	const {
// 	  data:{deleteCollection},
// 	} = await mutation({variables:{id}})
// 	return deleteCollection
//   }
//   return [deleteCollectionById]
//
// }
//
//
