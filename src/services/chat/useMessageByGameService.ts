import { useQuery } from '@apollo/client'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import MESSAGE_BY_GAME from '../../gql/chat/messageByGame.gql'
import { ChatMessageVersionEnum } from 'services/types'

type UseMessageByGameService = {
  gameId?: string
  version: ChatMessageVersionEnum
}

export const useMessageByGameService = ({ gameId, version }: UseMessageByGameService) => {
  const {
    data: { messageByGame } = [],
    error,
    loading,
    refetch,
  } = useQuery(MESSAGE_BY_GAME, {
    // Omit undefined variables to exclude in query params
    variables: omitBy(
      {
        version,
        game_id: gameId,
      },
      isUndefined,
    ),
    skip: !version,
  })

  return {
    data: messageByGame || [],
    error,
    loading,
    refetch,
  }
}
