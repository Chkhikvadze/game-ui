import { useQuery } from '@apollo/client'

import PLAYER_ASSETS_GQL from '../gql/playerAssets/playerAssets.gql'
import PLAYER_ASSETS_BY_COLLECTIONS_GQL from '../gql/playerAssets/playerAssetsByCollections.gql'

type playerAssetType = {
  page: number
  limit: number
  game_id?: string
  player_id?: any
}

export const usePlayerAssetsService = ({ page, limit, player_id, game_id }: playerAssetType) => {
  const {
    data: { playerAssets } = [],
    error,
    loading,
    refetch,
  } = useQuery(PLAYER_ASSETS_GQL, {
    variables: { filter: { page, limit, player_id, game_id } },
    fetchPolicy: 'cache-first',
    skip: !game_id,
  })

  return {
    data: playerAssets || [],
    error,
    loading,
    refetch,
  }
}

export const usePlayerAssetsByCollectionsService = ({
  game_id,
  player_id,
}: {
  game_id?: string
  player_id?: string
}) => {
  const {
    data: { playerAssetsByCollections } = {},
    error,
    loading,
    refetch,
  } = useQuery(PLAYER_ASSETS_BY_COLLECTIONS_GQL, {
    variables: { filter: { game_id, player_id } },
    skip: !game_id || !player_id,
  })

  return {
    data: playerAssetsByCollections || [],
    error,
    loading,
    refetch,
  }
}
