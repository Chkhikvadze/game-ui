import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createNftGql from '../gql/nft/createNft.gql'
import nftsGql from '../gql/nft/nfts.gql'
import deleteNftByIdGql from '../gql/nft/deleteNftById.gql'
import nftByIdGql from '../gql/nft/nftById.gql'
import updateNftByIdGql from '../gql/nft/updateNftById.gql'
import insertNftsGql from '../gql/nft/insertNfts.gql'
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
      data: { createNft },
    } = await mutation({
      variables: { input },
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
  collection_id,
}: nftsType) => {
  const {
    data: { nfts } = [],
    error,
    loading,
    refetch,
  } = useQuery(nftsGql, {
    variables: {
      filter: {
        project_id,
        collection_id,
        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
  })

  return {
    data: nfts || [],
    error,
    loading,
    refetch,
  }
}

export const useNftByIdService = ({ id }: { id: any }) => {
  const {
    data: { nftById } = [],
    error,
    loading,
    refetch,
  } = useQuery(nftByIdGql, {
    variables: { id },
  })

  return {
    data: nftById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateNftByIdGql = () => {
  const [mutation] = useMutation(updateNftByIdGql)
  const updateNftById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { nft },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return nft
  }

  return [updateNftById]
}

export const useUpdateCacheThenServerNft = () => {
  const [updateCacheThenServer] = useMutation(updateNftByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateNftByIdGql,
        data: {
          updateNft: {
            nft: {
              ...data.updateNft.nft,
            },
            success: true,
            message: 'The nft was successfully updated',
          },
        },
        variables: {
          id: data.updateNft.nft.id,
        },
      })
    },
  })

  const updateFn = ({ field, newValue, params }: { field: string; newValue: any; params: any }) => {
    updateCacheThenServer({
      variables: {
        id: params.data.id,
        input: {
          [field]: newValue,
          collection_id: params.data.collection_id,
          project_id: params.data.project_id,
        },
      },
      optimisticResponse: {
        updateNft: {
          nft: {
            ...params.data,
            id: params.data.id,
            [field]: newValue,
          },
          success: true,
          message: 'The nft was successfully updated',
        },
      },
    })
  }

  return updateFn
}

export const useDeleteNftByIdService = () => {
  const [mutation] = useMutation(deleteNftByIdGql)

  const deleteNftById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteNft },
    } = await mutation({ variables: { id } })
    return deleteNft
  }
  return [deleteNftById]
}

export const useInsertNftsService = () => {
  const [mutation] = useMutation(insertNftsGql)
  const insertNftsService = async (input: any, project_id: string, collection_id: string) => {
    const {
      data: { insertNfts },
    } = await mutation({
      variables: { input, project_id, collection_id },
    })

    return insertNfts
  }

  return { insertNftsService }
}
