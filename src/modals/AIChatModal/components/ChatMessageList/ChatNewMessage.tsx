import { v4 as uuidv4 } from 'uuid'
import { Avatar_3 } from 'assets/avatars'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import moment from 'moment'
import { StyledMessageInfo, StyledMessageText, StyledMessageWrapper } from './ChatMessageList'
import Typography from '@l3-lib/ui-core/dist/Typography'
import ChatMessage from '../ChatMessage'
import { MessageTypeEnum } from '../../types'
import ChatTypingEffect from 'components/ChatTypingEffect'

type ChatNewMessageProps = {
  newMessage?: string
  thinking?: boolean
}

const ChatNewMessage = ({ newMessage, thinking }: ChatNewMessageProps) => {
  const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSS')
  const formattedCurrentDate = moment(currentDate).format('HH:mm')

  return (
    <>
      {newMessage && (
        <StyledMessageWrapper>
          <StyledMessageInfo>
            <Avatar size={Avatar.sizes.SMALL} src={Avatar_3} type={Avatar.types.IMG} rectangle />
            <Typography
              value={formattedCurrentDate}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              customColor={'rgba(255, 255, 255, 0.60)'}
            />
          </StyledMessageInfo>

          <StyledMessageText>
            <Typography
              value={newMessage}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255)'}
            />
          </StyledMessageText>
        </StyledMessageWrapper>
      )}
      {/* {chatResponse && (
              <StyledMessageWrapper secondary>
                <StyledMessageInfo>
                  <Typography
                    value={formattedCurrentDate}
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
                  <ChatTypingEffect
                    value={chatResponse}
                    callFunction={handleResponse}
                    show={chatResponse ? true : false}
                    typeSpeed={0}
                  />
                </StyledMessageText>
              </StyledMessageWrapper>
            )} */}
      {thinking && (
        <div style={{ marginTop: '32px' }}>
          <ChatMessage
            message={{
              id: uuidv4(),
              ai: true,
              createdOn: Date.now(),
              text: 'Generating...',
              loader_type: 'video',
              type: MessageTypeEnum.AI_MANUAL,
            }}
          />
        </div>
      )}
    </>
  )
}

export default ChatNewMessage
