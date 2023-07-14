import { useContext, useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { AuthContext } from 'contexts'
import { useApolloClient } from '@apollo/client'
import CHAT_MESSAGES_GQL from '../../../gql/chat/messageByGame.gql'
import { ChatMessageVersionEnum } from 'services'
import { isUndefined, omitBy } from 'lodash'

interface ChatEvent {
  type: string
  message_id: string
  version: ChatMessageVersionEnum
  thoughts: { id: number; title: string; result: string | null; loading: boolean }[]
  game_id?: string
}

const useChatSocket = (addMessage: any, addNotifyMessage: any) => {
  const [ws, setWs] = useState<ReconnectingWebSocket>()
  const { user, account } = useContext(AuthContext)

  const client = useApolloClient()

  const setMessage = (message: any) => {
    addMessage(message)
    // addNotifyMessage(message)
  }

  const sendWebSocketMessage = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          from: 'test Giga',
          message: 'Test message from button click',
        }),
      )
    } else {
      console.log('WebSocket is not connected')
    }
  }

  const requestMessageHistory = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'request_message_history',
          from: 'test Giga',
        }),
      )
    } else {
      console.log('WebSocket is not connected')
    }
  }

  const requestMessagesByGame = (gameId: any) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'request_messages_by_game',
          from: 'test Giga',
          gameId: gameId,
        }),
      )
    } else {
      console.log('WebSocket is not connected')
    }
  }

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

  useEffect(() => {
    //todo need refactor, even we can use apollo for this
    fetch(`${import.meta.env.REACT_APP_AI_SERVICES_URL}/negotiate?id=${user.id}`)
      .then(response => response.json())
      .then(data => {
        console.log('Get socket url:', data[0].url)

        const url = data[0].url
        const ws = new ReconnectingWebSocket(url)
        // Initialize the ReconnectingWebSocket

        // const ws = new ReconnectingWebSocket(url)

        ws.onopen = () => {
          console.log('connected to the websocket server')
          // ws.send(
          //   JSON.stringify({
          //     from: 'test Giga',
          //     message: 'Test message from client',
          //   }),
          // )
        }

        ws.onmessage = event => {
          const message = JSON.parse(event.data)

          if (message.type === 'THOUGHTS') {
            onMessageThoughtsEvent(message)
          }

          // setMessage({
          //   id: uuidv4(),
          //   type: MessageTypeEnum.AI_MANUAL,
          // })
        }

        ws.onerror = error => {
          console.error('WebSocket error:', error)
        }

        ws.onclose = () => {
          console.log('disconnected from the websocket server')
        }

        setWs(ws) // Save the websocket reference in state
      })
      .catch(error => {
        console.error('Error:', error)
      })

    return () => {
      ws?.close()
    }
  }, [])

  return {
    sendWebSocketMessage,
  }
}

export { useChatSocket }
