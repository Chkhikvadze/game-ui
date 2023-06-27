import { gql, useQuery } from '@apollo/client'

import messageByGameGql from '../../gql/chat/messageByGame.gql'

// const GET_MESSAGES = gql`
//   query messageByGame($chat_id: ID!, $game_id: ID!, $account_id: ID!, $user_id: ID!)
//   @api(name: ai) {
//     messageByGame(chat_id: $chat_id, game_id: $game_id, account_id: $account_id, user_id: $user_id)
//   }
// `

export const useMessageByGameService = () => {
  const {
    data: { messageByGame } = [],
    error,
    loading,
    refetch,
  } = useQuery(messageByGameGql, {
    variables: {
      chat_id: '1cca3976-9b05-49db-952e-9848e7535266',
      game_id: '77453f60-e0d6-4c34-82fc-42a81b583566',
      account_id: 'ebd02d5f-1fcc-495e-92a4-84f79095307e',
      user_id: '0ce585de-483a-4ef0-939d-4283434e8649',
    },
    fetchPolicy: 'no-cache',
  })

  return {
    data: messageByGame || [],
    error,
    loading,
    refetch,
  }
}
