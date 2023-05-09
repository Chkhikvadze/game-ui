import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import createAttributeGql from '../gql/assetResources/createAttribute.gql'
import createAchievementGql from '../gql/assetResources/createAchievement.gql'
import attributesGql from '../gql/assetResources/attributes.gql'
import achievementsGql from '../gql/assetResources/achievements.gql'
// import propertyByIdGql from '../gql/property/propertyById.gql'
// import updatePropertyByIdGql from '../gql/property/updatePropertyById.gql'
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
