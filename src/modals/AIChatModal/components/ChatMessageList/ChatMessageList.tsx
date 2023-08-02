import { useCallback, useEffect, useRef } from 'react'

import styled from 'styled-components'

import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'

import moment from 'moment'

import l3 from '../../assets/l3.png'
import { Avatar_3 } from 'assets/avatars'

import ChatNewMessage from './ChatNewMessage'
import HumanMessage from './components/HumanMessage'
import AiMessage from './components/AiMessage'
import ChatMessage from '../ChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { MessageTypeEnum } from 'modals/AIChatModal/types'

type ChatMessageListProps = {
  data: any
  thinking: boolean
  newMessage: string | null | undefined
  chatResponse: string | null | undefined
  afterTypingChatResponse: string | null | undefined
  handleResponse: () => void
}

const ChatMessageList = ({
  data,
  newMessage,
  thinking,
  chatResponse,
  handleResponse,
  afterTypingChatResponse,
}: ChatMessageListProps) => {
  const listRef = useRef<any>(null)
  const rowHeights = useRef<Record<number, number>>({})

  const scrollToBottom = () => {
    listRef.current?.scrollToItem(data.length)
    requestAnimationFrame(() => {
      listRef.current?.scrollToItem(data.length)
    })
  }

  const getRowHeight = useCallback((index: number) => {
    return rowHeights.current[index] + 20 || 60
  }, [])

  const setRowHeight = useCallback((index: number, size: number) => {
    listRef.current?.resetAfterIndex(0)
    rowHeights.current = { ...rowHeights.current, [index]: size }
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      scrollToBottom()
      setTimeout(() => {
        scrollToBottom()
      }, 500)
    }
    // eslint-disable-next-line
  }, [thinking, data])

  // useEffect(() => {
  //   if (data.length > 0) {
  //     scrollToBottom()
  //     setTimeout(() => {
  //       scrollToBottom()
  //     }, 0)
  //   }
  // }, [])

  const initialChat = data?.map((chat: any) => {
    const chatDate = moment(chat?.created_on).format('HH:mm')
    return {
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chatDate,
      thoughts: chat?.thoughts,
    }
  })

  const Row = ({ index, style }: { index: number; style: any }) => {
    const chat = initialChat[index]
    const rowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight)
      }
      // eslint-disable-next-line
    }, [rowRef])

    if (chat?.type === 'human') {
      return (
        <div style={style} key={index}>
          <StyledWrapper ref={rowRef}>
            <HumanMessage avatarImg={Avatar_3} messageDate={chat.date} messageText={chat.message} />
            {index === initialChat.length - 1 && thinking && !chat.thoughts && (
              <StyledLoaderWrapper>
                <ChatMessage
                  message={{
                    id: uuidv4(),
                    ai: true,
                    createdOn: Date.now(),
                    text: 'Thinking ...',
                    loader_type: 'video',
                    type: MessageTypeEnum.AI_MANUAL,
                  }}
                />
              </StyledLoaderWrapper>
            )}
          </StyledWrapper>
        </div>
      )
    }

    if (chat?.type === 'ai') {
      return (
        <div style={style}>
          <StyledWrapper ref={rowRef}>
            <AiMessage
              avatarImg={l3}
              messageDate={chat.date}
              messageText={chat.message}
              thoughts={chat.thoughts}
            />

            {!chat.thoughts && index === initialChat.length - 1 && (
              <>
                <ChatNewMessage
                  newMessage={newMessage}
                  thinking={thinking}
                  chatResponse={chatResponse}
                  handleResponse={handleResponse}
                  afterTypingChatResponse={afterTypingChatResponse}
                />
              </>
            )}
          </StyledWrapper>
        </div>
      )
    }
  }

  return (
    <>
      <AutoSizer>
        {({ height, width }: any) => (
          <List
            className='List'
            height={height}
            itemCount={data.length}
            itemSize={getRowHeight}
            width={width}
            ref={listRef}
          >
            {Row as any}
          </List>
        )}
      </AutoSizer>
      {data.length === 0 && (
        <>
          <StyledWrapper>
            <ChatNewMessage
              newMessage={newMessage}
              thinking={thinking}
              chatResponse={chatResponse}
              handleResponse={handleResponse}
              afterTypingChatResponse={afterTypingChatResponse}
            />
          </StyledWrapper>
        </>
      )}
    </>
  )
}

export default ChatMessageList

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const StyledLoaderWrapper = styled.div`
  width: 750px;
  display: flex;
  margin-top: 42px;
`
