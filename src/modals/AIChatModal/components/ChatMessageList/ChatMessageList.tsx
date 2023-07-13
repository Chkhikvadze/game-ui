import { useCallback, useEffect, useRef } from 'react'

import styled, { css } from 'styled-components'

import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { v4 as uuidv4 } from 'uuid'
import remarkGfm from 'remark-gfm'
import moment from 'moment'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import ChatMessage from '../ChatMessage'

import { MessageTypeEnum } from '../../types'

import l3 from '../../assets/l3.png'
import { Avatar_3 } from 'assets/avatars'
import ChatTypingEffect from 'components/ChatTypingEffect'
import ChatNewMessage from './ChatNewMessage'

type ChatMessageListProps = {
  data: any
  newMessage: any
  thinking: boolean
  chatResponse: any
}

const ChatMessageList = ({ data, newMessage, thinking, chatResponse }: ChatMessageListProps) => {
  const listRef = useRef<any>(null)
  const rowHeights = useRef<Record<number, number>>({})

  const scrollToBottom = () => {
    listRef.current?.scrollToItem(data.length)
    requestAnimationFrame(() => {
      listRef.current?.scrollToItem(data.length)
    })
  }

  const getRowHeight = useCallback((index: number) => {
    return rowHeights.current[index] + 40 || 60
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
  }, [data, thinking])

  // useEffect(() => {
  //   setTimeout(() => {
  //     scrollToBottom()
  //   }, 1)
  // }, [data])

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
            <StyledMessageWrapper>
              <StyledMessageInfo>
                <Avatar
                  size={Avatar.sizes.SMALL}
                  src={Avatar_3}
                  type={Avatar.types.IMG}
                  rectangle
                />
                <Typography
                  value={chat.date}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'rgba(255, 255, 255, 0.60)'}
                />
              </StyledMessageInfo>

              <StyledMessageText>
                <Typography
                  value={chat.message}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(255, 255, 255)'}
                />
              </StyledMessageText>
            </StyledMessageWrapper>
          </StyledWrapper>
        </div>
      )

    if (chat?.type === 'ai')
      return (
        <div style={style}>
          <StyledWrapper ref={rowRef}>
            <StyledMessageWrapper secondary>
              <StyledMessageInfo>
                <Typography
                  value={chat.date}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor={'rgba(255, 255, 255, 0.60)'}
                />
                <Typography
                  value='L3'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'#FFF'}
                />
                <Avatar size={Avatar.sizes.SMALL} src={l3} type={Avatar.types.IMG} rectangle />
              </StyledMessageInfo>
              <StyledMessageText secondary>
                <StyledReactMarkdown
                  children={chat.message}
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                  components={{
                    table: ({ node, ...props }) => <StyledTable {...props} />,

                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || 'language-js')

                      return !inline && match ? (
                        <SyntaxHighlighter
                          children={String(children).replace(/\n$/, '')}
                          style={atomDark as any}
                          language={match[1]}
                          PreTag='div'
                          {...props}
                        />
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    },
                  }}
                />
              </StyledMessageText>
            </StyledMessageWrapper>
            {index === initialChat.length - 1 && (
              <ChatNewMessage newMessage={newMessage} thinking={thinking} />
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
            <ChatNewMessage newMessage={newMessage} thinking={thinking} />
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
`

export const StyledMessageWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 38px;
  gap: 8px;
  /* overflow-x: hidden; */
  padding-right: 10px;
  min-width: 400px;
  width: 750px;

  ${props =>
    props.secondary &&
    css`
      align-items: flex-end;
    `};
`
export const StyledMessageText = styled.div<{ secondary?: boolean }>`
  display: flex;
  padding: 16px 16px 18px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  overflow-x: hidden;

  width: 100%;

  border-radius: 4px 18px 18px 18px;
  background: var(--basic-foreground-white-1, rgba(255, 255, 255, 0.1));
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);

  ${props =>
    props.secondary &&
    css`
      border-radius: 18px 4px 18px 18px;
      background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    `};
`

export const StyledMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledReactMarkdown = styled(ReactMarkdown)`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledTable = styled.table`
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #fff;
    padding: 5px 30px;
    text-align: center;
  }
`
