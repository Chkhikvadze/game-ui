import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

import styled, { css } from 'styled-components'

import moment from 'moment'

import l3 from '../../assets/l3.png'
import { Avatar_3 } from 'assets/avatars'

import HumanMessage from './components/HumanMessage'
import AiMessage from './components/AiMessage'
import ChatMessage from '../ChatMessage'
import { v4 as uuidv4 } from 'uuid'
import { MessageTypeEnum } from 'modals/AIChatModal/types'

type ChatMessageListV2Props = {
  data: any
  thinking: boolean
  isNewMessage: boolean
  setIsNewMessage: (state: boolean) => void
}

const ChatMessageListV2 = ({
  data,
  thinking,
  isNewMessage,
  setIsNewMessage,
}: ChatMessageListV2Props) => {
  const [listIsReady, setListIsReady] = useState(false)

  const virtuoso = useRef<VirtuosoHandle>(null)

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

  useEffect(() => {
    if (thinking) {
      setTimeout(() => {
        virtuoso.current?.scrollToIndex({
          index: data.length,
          align: 'end',
        })
      }, 100)
      setListIsReady(true)

      return
    }

    if (!data.length) return

    // TODO: why do we need to scroll three times?
    // setTimeout(() => {
    //   virtuoso.current?.scrollToIndex({
    //     index: data.length,
    //     align: 'end',
    //   })

    setTimeout(() => {
      virtuoso.current?.scrollToIndex({
        index: data.length,
        align: 'end',
      })

      if (!listIsReady) {
        setTimeout(() => {
          setListIsReady(true)

          virtuoso.current?.scrollToIndex({
            index: data.length,
            align: 'end',
          })
        }, 1000)
      }
    }, 100)
    // }, 100)

    // eslint-disable-next-line
  }, [thinking, data])

  return (
    <StyledRoot show={listIsReady}>
      <Virtuoso
        ref={virtuoso}
        style={{ height: '100%' }}
        data={initialChat}
        totalCount={data.length}
        overscan={20}
        components={{
          Footer: () => {
            return (
              <>
                <StyledWrapper isHidden={!thinking}>
                  <StyledLoaderWrapper>{loader}</StyledLoaderWrapper>
                </StyledWrapper>
              </>
            )
          },
        }}
        itemContent={(index, chat) => (
          <>
            {chat?.type === 'human' && (
              <StyledWrapper>
                <HumanMessage
                  avatarImg={Avatar_3}
                  userId={chat.user_id}
                  messageDate={chat.date}
                  messageText={chat.message}
                />
              </StyledWrapper>
            )}
            {chat?.type === 'ai' && (
              <StyledWrapper>
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
            )}
          </>
        )}
      />
    </StyledRoot>
  )
}

export default memo(ChatMessageListV2)

const StyledRoot = styled.div<{ show: boolean }>`
  opacity: 0;
  width: 100%;
  height: 100%;
  ${p =>
    p.show &&
    css`
      opacity: 1;
    `};
`

const StyledWrapper = styled.div<{ isHidden?: boolean }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  margin-top: 38px;
  margin-right: 50px;

  ${p =>
    p.isHidden &&
    css`
      opacity: 0;
      height: 0px;
      overflow: hidden;
    `};
`

const StyledLoaderWrapper = styled.div`
  width: 850px;
  display: flex;
`
