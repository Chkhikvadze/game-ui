import { useApolloClient } from '@apollo/client'
import { useContext } from 'react'
import isNil from 'lodash/fp/isNil'
import omitBy from 'lodash/omitBy'
import CHAT_MESSAGES_GQL from '../../../gql/chat/messageByGame.gql'
import { AuthContext } from 'contexts'
import { Nullable } from 'types'

const useUpdateChatCache = () => {
  const apolloClient = useApolloClient()
  const { user } = useContext(AuthContext)

  const upsertChatMessageInCache = (
    newChatMessage: Record<string, unknown>,
    is_private_chat: boolean,
    { localChatMessageRefId }: { localChatMessageRefId?: Nullable<string> } = {},
  ) => {
    const queryVariables = omitBy(
      {
        game_id: newChatMessage.game_id,
        version: newChatMessage.version,
        is_private_chat: is_private_chat,
      },
      isNil,
    )

    apolloClient.cache.updateQuery(
      { query: CHAT_MESSAGES_GQL, variables: queryVariables },
      data => {
        const chatMessages = data?.messageByGame || []
        const newChatMessages = [...chatMessages]

        newChatMessage = { __typename: 'ChatMessage', ...newChatMessage }

        if (localChatMessageRefId && user.id === newChatMessage.user_id) {
          const index = newChatMessages.findIndex(
            (chatMessage: any) => chatMessage.id === localChatMessageRefId,
          )

          if (index !== -1) {
            newChatMessages[index] = newChatMessage
          }
        } else {
          const chatMessageIndex = newChatMessages.findIndex(
            (chatMessage: any) => chatMessage.id === newChatMessage.id,
          )

          if (chatMessageIndex !== -1) {
            newChatMessages[chatMessageIndex] = newChatMessage
          } else {
            newChatMessages.push(newChatMessage)
          }
        }

        newChatMessages.sort((a, b) => {
          return new Date(a.created_on).getTime() - new Date(b.created_on).getTime()
        })

        return {
          messageByGame: newChatMessages,
        }
      },
    )
  }

  return {
    upsertChatMessageInCache,
  }
}

export default useUpdateChatCache
