import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Close from '@l3-lib/ui-core/dist/icons/Close'

import { useHumanMessage } from './ChatMessageList/components/useHumanMessage'
import HumanMessageText from './ChatMessageList/components/HumanMessageText'
import { useAiMessage } from './ChatMessageList/components/useAiMessage'
import { ChatMessageVersionEnum } from 'services'
import AiMessageMarkdown from './ChatMessageList/components/AiMessageMarkdown'

type ReplyBoxProps = {
  reply: ReplyStateProps
  onClose: () => void
}

export type ReplyStateProps = {
  isReply: boolean
  messageId?: string
  userId?: string
  version?: ChatMessageVersionEnum
  messageText?: string
  isHuman?: boolean
}
export const defaultReplyState = {
  isReply: false,
}

const ReplyBox = ({ onClose, reply }: ReplyBoxProps) => {
  const { wordArray, authorName } = useHumanMessage({
    messageText: reply.messageText || '',
    userId: reply.userId || '',
  })

  const { name } = useAiMessage(reply.version || ChatMessageVersionEnum.ChatConversational)

  return (
    <StyledReplyBox>
      <StyledReplyText>
        <StyledWidth>
          <Typography
            value={'Replying to'}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </StyledWidth>
        <StyledWidth>
          <Typography
            value={reply.isHuman ? `@${authorName}:` : `@${name}:`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 1)'}
          />
        </StyledWidth>
        {reply.isHuman ? (
          <StyledTextWrapper>
            <HumanMessageText textArray={wordArray} />
          </StyledTextWrapper>
        ) : (
          <StyledTextWrapper>
            <AiMessageMarkdown children={reply.messageText} />
          </StyledTextWrapper>
        )}
      </StyledReplyText>
      <IconButton
        size={IconButton.sizes.SMALL}
        icon={() => <Close size='22' />}
        kind={IconButton.kinds.TERTIARY}
        onClick={onClose}
      />
    </StyledReplyBox>
  )
}

export default ReplyBox

const StyledReplyBox = styled.div`
  position: absolute;
  /* z-index: 100000000; */
  /* background: var(--primitives-gray-800, #383f4b); */
  width: 100%;
  height: 40px;
  top: -40px;
  left: 0;

  /* overflow: hidden; */

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(100px);
  /* box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25); */

  display: flex;

  justify-content: space-between;
  padding: 2px 10px;
  padding-left: 15px;

  border-radius: 8px;
  overflow: hidden;
`
const StyledReplyText = styled.div`
  display: flex;
  margin-top: 6px;
  gap: 5px;
  width: 100%;
`
const StyledTextWrapper = styled.div`
  font-size: 16px;
  opacity: 0.8;
  line-height: 26px;
`
const StyledWidth = styled.div`
  min-width: fit-content;
  margin-top: 1px;
`
