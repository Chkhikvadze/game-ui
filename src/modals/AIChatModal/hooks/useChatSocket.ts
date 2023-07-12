import { useContext, useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { MessageTypeEnum, IChatMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'
import { AuthContext } from 'contexts'

const useChatSocket = (addMessage: any, addNotifyMessage: any) => {
  const [ws, setWs] = useState<ReconnectingWebSocket>()
  const { user } = useContext(AuthContext)

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

  useEffect(() => {
    fetch(`http://localhost:4002/negotiate?id=${user.id}`)
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

        let tasks: any[] = []
        let result = ''

        ws.onmessage = event => {
          // console.log('received data', event)
          const message = JSON.parse(event.data)
          // console.log(message)

          if (message.type === 'tasks') {
            tasks = [...tasks, message.data]
            console.log('THOUGHTS', message.data)
          } else if (message.type === 'task_result') {
            result += message.data + '\n'
            console.log('RESULT', message.data)
          } else if (message.type === 'next_task') {
            console.log('NEXT TASK', message.data)
          }

          // console.log(tasks)
          // console.log(result)

          // debugger
          setMessage({
            id: uuidv4(),
            type: MessageTypeEnum.AI_MANUAL,
          })
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
