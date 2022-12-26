import { IApiKeyQuery, IApiKeysQuery } from './interfaces'
import { useMutation, useQuery } from '@apollo/client'
// import { loader } from 'graphql.macro'

import apikeysGql from '../gql/apiKey/apiKeys.gql'
import createApiKeygql from '../gql/apiKey/createApiKey.gql'
import apiKeyByIdGql from '../gql/apiKey/apiKeyById.gql'
import updateApiKeyGql from '../gql/apiKey/updateApiKey.gql'

type apiKeyType = {
  page: number
  limit: number
  search_text: string
}

export const useApiKeysService = ({ page, limit, search_text }: apiKeyType): IApiKeysQuery => {
  const {
    data: { apiKeys } = [],
    error,
    loading,
    refetch,
  } = useQuery(apikeysGql, {
    variables: { filter: { page, limit, search_text } },
    fetchPolicy: 'cache-first',
  })

  return {
    data: apiKeys || [],
    error,
    loading,
    refetch,
  }
}

export const useCreateApiKeyService = () => {
  const [mutation] = useMutation(createApiKeygql)

  const createApiKeyService = async (input: any, callback: any) => {
    const {
      data: { createApiKey },
    } = await mutation({
      variables: { input },
    })
    if (callback) {
      callback()
    }

    return createApiKey
  }

  return [createApiKeyService]
}

export const useApiKeyByIdService = ({ id }: { id: string }): IApiKeyQuery => {
  const {
    data: { apiKeyById } = [],
    error,
    loading,
    refetch,
  } = useQuery(apiKeyByIdGql, {
    variables: { id },
    fetchPolicy: 'cache-first',
  })

  return {
    data: apiKeyById || {},
    error,
    loading,
    refetch,
  }
}

// export const useUpdateApiKeyService = () => useMutation(updateApiKeyGql)
export const useUpdateApiKeyService = () => {
  const [mutation] = useMutation(updateApiKeyGql)
  const updateApiKeyById = async (id: any, input: any): Promise<{ success: boolean }> => {
    const {
      data: { apiKey },
    } = await mutation({
      variables: {
        id,
        input,
      },
    })
    return apiKey
  }

  return [updateApiKeyById]
}
