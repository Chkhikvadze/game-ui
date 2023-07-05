import { gql, useQuery } from '@apollo/client'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import messageByGameGql from '../../gql/chat/messageByGame.gql'

type UseMessageByGameService = {
  gameId?: string
}

export const useMessageByGameService = ({ gameId }: UseMessageByGameService) => {
  const {
    data: { messageByGame } = [],
    error,
    loading,
    refetch,
  } = useQuery(messageByGameGql, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        game_id: gameId,
      },
      isUndefined,
    ),
  })

  return {
    data: messageByGame || [],
    error,
    loading,
    refetch,
  }
}
