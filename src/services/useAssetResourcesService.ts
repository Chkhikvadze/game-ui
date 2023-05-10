import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createAttributeGql from '../gql/assetResources/createAttribute.gql'
import createAchievementGql from '../gql/assetResources/createAchievement.gql'
import attributesGql from '../gql/assetResources/attributes.gql'
import achievementsGql from '../gql/assetResources/achievements.gql'
import attributeByIdGql from '../gql/assetResources/attributeById.gql'
import achievementByIdGql from '../gql/assetResources/achievementById.gql'
import updateAttributeByIdGql from '../gql/assetResources/updateAttributeById.gql'
import updateAchievementByIdGql from '../gql/assetResources/updateAchievementById.gql'
// import deletePropertyByIdGql from '../gql/property/deletePropertyById.gql'
// import updatePropertyMediaGql from '../gql/property/updatePropertyMedia.gql'

export const useCreateAttributeService = () => {
  const [mutation] = useMutation(createAttributeGql)
  const createAttributeService = async (input: any, callback: any) => {
    const {
      data: { createAttribute },
    } = await mutation({
      variables: { input },
    })

    if (callback) {
      callback()
    }

    return createAttribute
  }

  return [createAttributeService]
}

export const useCreateAchievementService = () => {
  const [mutation] = useMutation(createAchievementGql)
  const createAchievementService = async (input: any, callback: any) => {
    const {
      data: { createAchievement },
    } = await mutation({
      variables: { input },
    })

    if (callback) {
      callback()
    }

    return createAchievement
  }

  return [createAchievementService]
}

export const useAttributesService = ({ page, limit, game_id }: any) => {
  const {
    data: { attributes } = [],
    error,
    loading,
    refetch,
  } = useQuery(attributesGql, {
    variables: {
      filter: {
        game_id,

        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
    skip: !game_id,
  })

  return {
    data: attributes || [],
    error,
    loading,
    refetch,
  }
}

export const useAchievementsService = ({ page, limit, game_id }: any) => {
  const {
    data: { achievements } = [],
    error,
    loading,
    refetch,
  } = useQuery(achievementsGql, {
    variables: {
      filter: {
        game_id,

        page,
        limit,
        sort: 'name',
        order: 'ASC',
      },
    },
    skip: !game_id,
  })

  return {
    data: achievements || [],
    error,
    loading,
    refetch,
  }
}

export const useAttributeIdService = ({ id }: { id?: any }) => {
  const {
    data: { attributeById } = [],
    error,
    loading,
    refetch,
  } = useQuery(attributeByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: attributeById || {},
    error,
    loading,
    refetch,
  }
}
export const useAchievementIdService = ({ id }: { id?: any }) => {
  const {
    data: { achievementById } = [],
    error,
    loading,
    refetch,
  } = useQuery(achievementByIdGql, {
    variables: { id },
    skip: !id,
  })

  return {
    data: achievementById || {},
    error,
    loading,
    refetch,
  }
}

export const useUpdateCacheThenServerAttribute = () => {
  const [updateCacheThenServer] = useMutation(updateAttributeByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateAttributeByIdGql,
        data: {
          updateAttribute: {
            ...data.updateAttribute,
          },
        },
        variables: {
          id: data.updateAttribute.id,
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
          game_id: params.data.game_id,
        },
      },
      optimisticResponse: {
        updateAttribute: {
          ...params.data,
          id: params.data.id,
          [field]: newValue,
        },
      },
    })
  }

  return updateFn
}

export const useUpdateCacheThenServerAchievement = () => {
  const [updateCacheThenServer] = useMutation(updateAchievementByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateAchievementByIdGql,
        data: {
          updateAchievement: {
            ...data.updateAchievement,
          },
        },
        variables: {
          id: data.updateAchievement.id,
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
          game_id: params.data.game_id,
        },
      },
      optimisticResponse: {
        updateAchievement: {
          ...params.data,
          id: params.data.id,
          [field]: newValue,
        },
      },
    })
  }

  return updateFn
}

export const useUpdateAttributeByIdService = () => {
  const [mutation] = useMutation(updateAttributeByIdGql)
  const updateAttributeById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { attribute },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return attribute
  }

  return [updateAttributeById]
}
export const useUpdateAchievementByIdService = () => {
  const [mutation] = useMutation(updateAchievementByIdGql)
  const updateAchievementById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { achievement },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return achievement
  }

  return [updateAchievementById]
}
