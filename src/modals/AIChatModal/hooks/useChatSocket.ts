import { useContext, useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { AuthContext } from 'contexts'
import { useApolloClient } from '@apollo/client'
import CHAT_MESSAGES_GQL from '../../../gql/chat/messageByGame.gql'
import { ChatMessageVersionEnum } from 'services'
import { isUndefined, omitBy } from 'lodash'
import { WebPubSubClient } from '@azure/web-pubsub-client'

interface ChatEvent {
  type: string
  message_id: string
  version: ChatMessageVersionEnum
  thoughts: { id: number; title: string; result: string | null; loading: boolean }[]
  game_id?: string
}

const useChatSocket = (addMessage: any, addNotifyMessage: any) => {
  const groupId = 'game_id' // need game id or game_id_private, game_id_team, or collection_id
  const [connected, setConnected] = useState(false)
  const [psClient, setPSClient] = useState<WebPubSubClient | null>(null)
  const { user, account } = useContext(AuthContext)
  const client = useApolloClient()

  console.log(connected, 'is it connected?')
  const [typingUsersData, setTypingUsersData] = useState<any>([])

  const userIds = typingUsersData.map((typingUser: any) => {
    return typingUser.userId
  })

  const connect = async () => {
    const getUrl = async () => {
      const url = `${import.meta.env.REACT_APP_AI_SERVICES_URL}/negotiate?id=${user.id}`
      return fetch(url)
        .then(response => response.json())
        .then(data => data[0].url)
    }
    const cl = new WebPubSubClient({
      getClientAccessUrl: async () => await getUrl(),
    })
    cl.on('group-message', (e: any) => {
      // console.log('group-message sss', e)

      if (e?.message.data.message.data.content === 'undefined stop typing') {
        const filteredData = typingUsersData.filter(
          (typingUser: any) => typingUser.userId !== e?.message.fromUserId,
        )
        setTypingUsersData(filteredData)
      } else if (userIds.includes(e?.message.fromUserId)) {
        return
      } else {
        setTypingUsersData([
          ...typingUsersData,
          { userId: e?.message.fromUserId, text: e?.message.data.message.data.content },
        ])
      }

      const data: any = e.message.data

      //todo Thougts
      if (data.type === 'THOUGHTS') {
        onMessageThoughtsEvent(data)
      }
      // appendMessage(data)
    })
    cl.on('error', e => {
      console.log('Socket error', e)
    })
    await cl.start()
    cl.joinGroup(groupId)
    setConnected(true)
    setPSClient(cl)
  }

  const send = async (eventName: string, data: any) => {
    try {
      const chat = {
        from: user,
        message: {
          data: data,
        },
      }

      // appendMessage(chat);
      const response = await psClient?.sendToGroup(groupId, chat, 'json', {
        noEcho: true,
        fireAndForget: false,
      })
      console.log(response, 'sendToGroup response')
      await psClient?.sendEvent(eventName, chat, 'json')
      // if (chat.message.startsWith('@chatgpt ')) {
      //   await client.sendEvent('invokegpt', chat, 'json')
      // }
    } catch (error) {
      // console.error(error)
    }
  }

  const sendUserTyping = async (chat_id: string) => {
    const type = 'user_typing'

    await send(type, {
      content: `${user.first_name} is typing`,
      example: false,
      additional_kwargs: {
        chat_id: chat_id,
        user_id: user.id,
      },
    })
  }

  const sendUserStopTyping = async (chat_id: string) => {
    const type = 'user_stop_typing'
    await send(type, {
      content: `${user.name} stop typing`,
      example: false,
      additional_kwargs: {
        chat_id: chat_id,
        user_id: user.id,
      },
    })
  }

  const sendUserLikeDislike = async (message_id: string, type: string) => {
    await send(type, {
      content: `${user.name} like`,
      example: false,
      additional_kwargs: {
        message_id,
      },
    })
  }

  const sendUserShare = async (message_id: string) => {
    const type = 'user_share'
    await send(type, {
      content: `${user.name} share`,
      example: false,
      additional_kwargs: {
        message_id,
      },
    })
  }

  const sendMessage = async (message: string) => {
    const type = 'user_send_message'
    await send(type, {
      content: message,
      example: false,
      additional_kwargs: {
        user_id: user.id,
        account_id: account.id,
      },
    })
  }

  useEffect(() => {
    connect()
  }, [])

  const onMessageThoughtsEvent = (message: ChatEvent) => {
    console.log(message)

    const { thoughts, game_id, version, message_id } = message

    const variables = omitBy(
      {
        game_id,
        version,
      },
      isUndefined,
    )

    const result = client.readQuery({
      query: CHAT_MESSAGES_GQL,
      variables,
    })

    console.log('READ QUERY', { result })

    const messageByGame = result?.messageByGame || []

    const newMessages = messageByGame.map((message: any, index: number) => {
      if (message.id === message_id) {
        return {
          ...message,
          thoughts,
        }
      }

      return message
    })

    const currentMessage = messageByGame.find((item: any) => item.id === message_id)

    if (!currentMessage) {
      newMessages.push({
        id: message_id,
        thoughts,
        version,
        game_id: game_id || null,
        user_id: user.id,
        account_id: account.id,
        message: {
          data: { content: 'Thoughts', example: false, additional_kwargs: {} },
          type: 'ai',
        },
        chat_id: null,
        created_on: new Date().toISOString(),
      })
    }

    console.log({ newMessages })

    client.writeQuery({
      query: CHAT_MESSAGES_GQL,
      variables,
      data: {
        messageByGame: newMessages,
      },
    })
  }

  return {
    sendUserTyping,
    sendUserStopTyping,
    sendUserLikeDislike,
    sendUserShare,
    sendMessage,
    typingUsersData,
  }
}

export { useChatSocket }
