import { useMutation, useQuery } from '@apollo/client'

import playerAssetsGql from '../gql/playerAssets/playerAssets.gql'

type playerAssetType = {
  page: number
  limit: number
  project_id: string
  player_id?: any
}

export const usePlayerAssetsService = ({ page, limit, player_id, project_id }: playerAssetType) => {
  const {
    data: { playerAssets } = [],
    error,
    loading,
    refetch,
  } = useQuery(playerAssetsGql, {
    variables: { filter: { page, limit, player_id, project_id } },
    fetchPolicy: 'cache-first',
  })

  return {
    data: playerAssets || [],
    error,
    loading,
    refetch,
  }
}
