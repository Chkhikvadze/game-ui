import { v4 as uuidv4 } from 'uuid'
import { Avatar_3 } from 'assets/avatars'

import moment from 'moment'

import ChatMessage from '../ChatMessage'
import { MessageTypeEnum } from '../../types'

import styled from 'styled-components'
import l3 from '../../assets/l3.png'
import AiMessage from './components/AiMessage'
import HumanMessage from './components/HumanMessage'
import AiMessageTypingEffect from './components/AiMessageTypingEffect'

type ChatNewMessageProps = {
  thinking?: boolean
  newMessage?: string | null | undefined
  chatResponse?: string | null | undefined
  afterTypingChatResponse: string | null | undefined
  handleResponse: () => void
}

const ChatNewMessage = ({
  newMessage,
  thinking,
  chatResponse,
  handleResponse,
  afterTypingChatResponse,
}: ChatNewMessageProps) => {
  const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSS')
  const formattedCurrentDate = moment(currentDate).format('HH:mm')

  return (
    <>
      {newMessage && (
        <HumanMessage
          avatarImg={Avatar_3}
          messageDate={formattedCurrentDate}
          messageText={newMessage}
        />
      )}
      {chatResponse && (
        <AiMessageTypingEffect
          avatarImg={l3}
          messageDate={formattedCurrentDate}
          messageText={chatResponse}
          handleResponse={handleResponse}
        />
      )}
      {afterTypingChatResponse && (
        <AiMessage
          avatarImg={l3}
          messageDate={formattedCurrentDate}
          messageText={afterTypingChatResponse}
        />
      )}
      {thinking && (
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
    </>
  )
}

export default ChatNewMessage

const StyledLoaderWrapper = styled.div`
  width: 750px;
  display: flex;
  margin-top: 42px;
`
