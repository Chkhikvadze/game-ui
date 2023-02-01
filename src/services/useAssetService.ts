import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createAssetGql from '../gql/asset/createAsset.gql'
import assetsGql from '../gql/asset/assets.gql'
import deleteAssetByIdGql from '../gql/asset/deleteAssetById.gql'
import assetByIdGql from '../gql/asset/assetById.gql'
import updateAssetByIdGql from '../gql/asset/updateAssetById.gql'
import insertAssetsGql from '../gql/asset/insertAssets.gql'
import createAssetFromTokenIdGql from '../gql/asset/createAssetFromTokenId.gql'
import batchDeleteAssetGql from '../gql/asset/batchDeleteAsset.gql'
import batchUpdateAssetsGql from '../gql/asset/batchUpdateAssets.gql'
// const collectionsGql = loader("../gql/collection/collections.gql")
// const collectionByIdGql = loader("../gql/collection/collectionById.gql")
// const updateCollectionByIdGql = loader("../gql/collection/updateCollectionById.gql")
// const deleteCollectionByIdGql = loader("../gql/collection/deleteCollectionById.gql")

// type createProjectType = {
//   name: String
//   category: String
//   description: String
// }

type assetsType = {
  page: number
  limit: number
  search_text: string
  project_id: string
  collection_id: string
}

export const useCreateAssetService = () => {
  const [mutation] = useMutation(createAssetGql)
  const createAssetService = async (input: any, callback: any) => {
    const {
      data: { createAsset },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createAsset
  }

  return [createAssetService]
}

export const useAssetsService = ({
  page,
  limit,
  search_text,
  project_id,
  collection_id,
}: assetsType) => {
  const {
    data: { assets } = [],
    error,
    loading,
    refetch,
  } = useQuery(assetsGql, {
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
    data: assets || [],
    error,
    loading,
    refetch,
  }
}

export const useAssetByIdService = ({ id }: { id: any }) => {
  const {
    data: { assetById } = [],
    error,
    loading,
    refetch,
  } = useQuery(assetByIdGql, {
    variables: { id },
  })

  return {
    data: assetById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateAssetByIdGql = () => {
  const [mutation] = useMutation(updateAssetByIdGql)
  const updateAssetById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { asset },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return asset
  }

  return [updateAssetById]
}

export const useBatchUpdateAssetsService = () => {
  const [mutation] = useMutation(batchUpdateAssetsGql)
  const batchUpdateAssets = async (
    assets: any,
    collection_id: any,
    project_id: any,
  ): Promise<{ success: boolean }> => {
    const {
      data: { asset },
    } = await mutation({
      variables: {
        assets,
        collection_id,
        project_id,
      },
    })
    return asset
  }

  return [batchUpdateAssets]
}

export const useUpdateCacheThenServerAsset = () => {
  const [updateCacheThenServer] = useMutation(updateAssetByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateAssetByIdGql,
        data: {
          updateAsset: {
            asset: {
              ...data.updateAsset.asset,
            },
            success: true,
            message: 'The asset was successfully updated',
          },
        },
        variables: {
          id: data.updateAsset.asset.id,
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
        updateAsset: {
          asset: {
            ...params.data,
            id: params.data.id,
            [field]: newValue,
          },
          success: true,
          message: 'The asset was successfully updated',
        },
      },
    })
  }

  return updateFn
}

export const useDeleteAssetByIdService = () => {
  const [mutation] = useMutation(deleteAssetByIdGql)

  const deleteAssetById = async (id: string): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteAsset },
    } = await mutation({ variables: { id } })
    return deleteAsset
  }
  return [deleteAssetById]
}

export const useBatchDeleteAssetService = () => {
  const [mutation] = useMutation(batchDeleteAssetGql)

  const batchDeleteAsset = async (
    ids: [string],
    collection_id: any,
    project_id: any,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteAsset },
    } = await mutation({ variables: { ids, collection_id, project_id } })
    return deleteAsset
  }
  return [batchDeleteAsset]
}

export const useInsertAssetsService = () => {
  const [mutation] = useMutation(insertAssetsGql)
  const insertAssetsService = async (input: any, project_id: string, collection_id: string) => {
    const {
      data: { insertAssets },
    } = await mutation({
      variables: { input, project_id, collection_id },
    })

    return insertAssets
  }

  return { insertAssetsService }
}

export const useCreateAssetFromTokenIdService = () => {
  const [mutation] = useMutation(createAssetFromTokenIdGql)
  const createAssetFromTokenIdService = async (
    input: any,
    project_id: string,
    collection_id: string,
  ) => {
    const {
      data: { createAssetFromTokenId },
    } = await mutation({
      variables: { input, project_id, collection_id },
    })

    return createAssetFromTokenId
  }

  return { createAssetFromTokenIdService }
}
