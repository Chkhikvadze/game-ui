import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createAttributeGql from '../gql/assetResources/createAttribute.gql'
import createAchievementGql from '../gql/assetResources/createAchievement.gql'
import createRewardGql from '../gql/assetResources/createReward.gql'

import attributesGql from '../gql/assetResources/attributes.gql'
import achievementsGql from '../gql/assetResources/achievements.gql'
import rewardsGql from '../gql/assetResources/rewards.gql'

import attributeByIdGql from '../gql/assetResources/attributeById.gql'
import achievementByIdGql from '../gql/assetResources/achievementById.gql'

import updateAttributeByIdGql from '../gql/assetResources/updateAttributeById.gql'
import updateAchievementByIdGql from '../gql/assetResources/updateAchievementById.gql'
import updateRewardByIdGql from '../gql/assetResources/updateRewardById.gql'

// import deletePropertyByIdGql from '../gql/property/deletePropertyById.gql'
// import updatePropertyMediaGql from '../gql/property/updatePropertyMedia.gql'
import deleteAchievementGql from '../gql/assetResources/deleteAchievement.gql'
import deleteAttributeGql from '../gql/assetResources/deleteAttribute.gql'
import deleteRewardGql from '../gql/assetResources/deleteReward.gql'

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

export const useCreateRewardService = () => {
  const [mutation] = useMutation(createRewardGql)
  const createRewardService = async (input: any, callback: any) => {
    const {
      data: { createReward },
    } = await mutation({
      variables: { input },
    })

    if (callback) {
      callback()
    }

    return createReward
  }

  return [createRewardService]
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
export const useRewardsService = ({ page, limit, game_id }: any) => {
  const {
    data: { rewards } = [],
    error,
    loading,
    refetch,
  } = useQuery(rewardsGql, {
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
    data: rewards || [],
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

export const useUpdateCacheThenServerReward = () => {
  const [updateCacheThenServer] = useMutation(updateRewardByIdGql, {
    update(cache, { data }) {
      cache.writeQuery({
        query: updateRewardByIdGql,
        data: {
          updateReward: {
            ...data.updateReward,
          },
        },
        variables: {
          id: data.updateReward.id,
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
        updateReward: {
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

export const useUpdateRewardByIdService = () => {
  const [mutation] = useMutation(updateRewardByIdGql)
  const updateRewardById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { reward },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return reward
  }

  return [updateRewardById]
}

export const useDeleteAchievementService = () => {
  const [mutation] = useMutation(deleteAchievementGql)
  const deleteAchievementService = async (id: string) => {
    try {
      await mutation({
        variables: { id },
      })
      return { success: true, message: 'Achievement deleted successfully' }
    } catch (error) {
      return { success: false, message: 'Delete Achievement mutation failed' }
    }
  }
  return [deleteAchievementService]
}

export const useDeleteAttributeService = () => {
  const [mutation] = useMutation(deleteAttributeGql)
  const deleteAttributeService = async (id: string) => {
    try {
      await mutation({
        variables: { id },
      })
      return { success: true, message: 'Attribute deleted successfully' }
    } catch (error) {
      return { success: false, message: 'Delete Attribute mutation failed' }
    }
  }

  return [deleteAttributeService]
}

export const useDeleteRewardService = () => {
  const [mutation] = useMutation(deleteRewardGql)
  const deleteRewardService = async (id: string) => {
    try {
      await mutation({
        variables: { id },
      })
      return { success: true, message: 'Reward deleted successfully' }
    } catch (error) {
      return { success: false, message: 'Delete Reward mutation failed' }
    }
  }

  return [deleteRewardService]
}
