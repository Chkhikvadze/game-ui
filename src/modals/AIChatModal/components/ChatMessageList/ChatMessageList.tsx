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
      }, 0)
    }
    // eslint-disable-next-line
  }, [thinking])

  useEffect(() => {
    if (data.length > 0) {
      scrollToBottom()
      setTimeout(() => {
        scrollToBottom()
      }, 0)
    }
  }, [])

  const initialChat = data?.map((chat: any) => {
    const chatDate = moment(chat?.created_on).format('HH:mm')
    return {
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chatDate,
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

    if (chat?.type === 'human')
      return (
        <div style={style}>
          <StyledWrapper ref={rowRef}>
            <HumanMessage avatarImg={Avatar_3} messageDate={chat.date} messageText={chat.message} />
          </StyledWrapper>
        </div>
      )

    if (chat?.type === 'ai')
      return (
        <div style={style}>
          <StyledWrapper ref={rowRef}>
            <AiMessage avatarImg={l3} messageDate={chat.date} messageText={chat.message} />

            {index === initialChat.length - 1 && (
              <ChatNewMessage
                newMessage={newMessage}
                thinking={thinking}
                chatResponse={chatResponse}
                handleResponse={handleResponse}
                afterTypingChatResponse={afterTypingChatResponse}
              />
            )}
          </StyledWrapper>
        </div>
      )
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
