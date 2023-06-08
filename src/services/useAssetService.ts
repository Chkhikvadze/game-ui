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
import updateAssetMediaGql from '../gql/asset/updateAssetMedia.gql'
// const collectionsGql = loader("../gql/collection/collections.gql")
// const collectionByIdGql = loader("../gql/collection/collectionById.gql")
// const updateCollectionByIdGql = loader("../gql/collection/updateCollectionById.gql")
// const deleteCollectionByIdGql = loader("../gql/collection/deleteCollectionById.gql")

// type createGameType = {
//   name: String
//   category: String
//   description: String
// }

type assetsType = {
  page: number
  limit: number
  search_text: string
  game_id?: string
  collection_id?: string
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
  game_id,
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
        game_id,
        collection_id,
        search_text,
        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
    // skip: !game_id || !collection_id,
  })

  return {
    data: assets || [],
    error,
    loading,
    refetch,
  }
}

export const useAssetByIdService = ({ id }: { id?: string }) => {
  const {
    data: { assetById } = [],
    error,
    loading,
    refetch,
  } = useQuery(assetByIdGql, {
    variables: { id },
    skip: !id,
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
    game_id: any,
  ): Promise<{ success: boolean }> => {
    const {
      data: { asset },
    } = await mutation({
      variables: {
        assets,
        collection_id,
        game_id,
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
          game_id: params.data.game_id,
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

export const useUpdateMediaCacheThenServer = () => {
  const [updateCacheThenServer] = useMutation(updateAssetMediaGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateAssetMediaGql,
        data: {
          updateAssetMedia: {
            asset: {
              ...data.updateAssetMedia.asset,
            },
            success: true,
            message: 'The asset media was successfully updated',
          },
        },
        variables: {
          id: data.updateAssetMedia.asset.id,
        },
      })
    },
  })

  const updateFn = ({ newValue, asset }: { newValue: any; asset: any }) => {
    updateCacheThenServer({
      variables: {
        id: asset.id,
        input: newValue,
      },
      optimisticResponse: {
        updateAssetMedia: {
          asset: {
            ...asset,
            id: asset.id,
            medias: newValue,
          },
          success: true,
          message: 'The asset media was successfully updated',
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
    game_id: any,
  ): Promise<{ message: string; success: boolean }> => {
    const {
      data: { deleteAsset },
    } = await mutation({ variables: { ids, collection_id, game_id } })
    return deleteAsset
  }
  return [batchDeleteAsset]
}

export const useInsertAssetsService = () => {
  const [mutation] = useMutation(insertAssetsGql)
  const insertAssetsService = async (input: any, game_id: string, collection_id: string) => {
    const {
      data: { insertAssets },
    } = await mutation({
      variables: { input, game_id, collection_id },
    })

    return insertAssets
  }

  return { insertAssetsService }
}

export const useCreateAssetFromTokenIdService = () => {
  const [mutation] = useMutation(createAssetFromTokenIdGql)
  const createAssetFromTokenIdService = async (
    input: any,
    game_id: string,
    collection_id: string,
  ) => {
    const {
      data: { createAssetFromTokenId },
    } = await mutation({
      variables: { input, game_id, collection_id },
    })

    return createAssetFromTokenId
  }

  return { createAssetFromTokenIdService }
}

export const useUpdateAssetMedia = () => {
  const [mutation] = useMutation(updateAssetMediaGql)
  const updateAssetMedia = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { updateAssetMedia },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return updateAssetMedia
  }

  return [updateAssetMedia]
}
