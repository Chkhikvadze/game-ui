import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

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
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
}

const ChatMessageList = ({
  data,
  thinking,
  isNewMessage,
  setIsNewMessage,
}: ChatMessageListProps) => {
  const listRef = useRef<any>(null)
  const rowHeights = useRef<Record<number, number>>({})

  const [listIsReady, setListIsReady] = useState(false)

  const scrollToBottom = () => {
    listRef.current?.scrollToItem(data.length)
    requestAnimationFrame(() => {
      listRef.current?.scrollToItem(data.length)
    })
  }

  const getRowHeight = useCallback((index: number) => {
    return rowHeights?.current[index] + 20 || 100
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
        if (!listIsReady) {
          setTimeout(() => {
            setListIsReady(true)
            setTimeout(() => {
              scrollToBottom()
            }, 100)
          }, 100)
        }
      }, 100)
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
      id: chat?.id,
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chatDate,
      thoughts: chat?.thoughts,
      user_id: chat?.user_id,
      version: chat?.version,
      notConvertedDate: chat.created_on,
    }
  })

  const loader = useMemo(() => {
    return (
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
    )
  }, [])

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
        <div style={style} key={chat.id}>
          <StyledWrapper ref={rowRef}>
            <HumanMessage
              avatarImg={Avatar_3}
              userId={chat.user_id}
              messageDate={chat.date}
              messageText={chat.message}
            />

            {index === initialChat.length - 1 && thinking && !chat.thoughts && (
              <StyledLoaderWrapper>{loader}</StyledLoaderWrapper>
            )}
          </StyledWrapper>
        </div>
      )
    }

    if (chat?.type === 'ai') {
      return (
        <div style={style} key={chat.id}>
          <StyledWrapper ref={rowRef}>
            <AiMessage
              avatarImg={l3}
              messageDate={chat.date}
              messageText={chat.message}
              thoughts={chat.thoughts}
              version={chat.version}
              isNewMessage={initialChat.length - 1 === index && isNewMessage}
              setIsNewMessage={setIsNewMessage}
            />
          </StyledWrapper>
        </div>
      )
    }

    return <div />
  }

  return (
    <>
      <StyledAutoSized show={listIsReady}>
        {({ height, width }: any) => (
          <List
            ref={listRef}
            className='List'
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={getRowHeight}
            overscanCount={10}
            initialScrollOffset={400}
          >
            {({ index, style }) => <Row index={index} style={style} />}
          </List>
        )}
      </StyledAutoSized>
    </>
  )
}

export default ChatMessageList

const StyledAutoSized = styled(AutoSizer)<{ show: boolean }>`
  opacity: 0;
  height: 100%;
  ${p =>
    p.show &&
    css`
      opacity: 1;
    `};
`

const StyledWrapper = styled.div`
  width: 100%;
  height: fit-content;
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
