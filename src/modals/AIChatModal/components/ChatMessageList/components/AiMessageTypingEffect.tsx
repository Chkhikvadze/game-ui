import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import ChatTypingEffect from 'components/ChatTypingEffect'

import { StyledMessageInfo, StyledMessageText, StyledMessageWrapper } from './HumanMessage'

type AiMessageTypingEffectProps = {
  avatarImg: string
  messageDate: string
  messageText: string
  handleResponse: () => void
}

const AiMessageTypingEffect = ({
  avatarImg,
  messageDate,
  messageText,
  handleResponse,
}: AiMessageTypingEffectProps) => {
  return (
    <StyledMessageWrapper secondary>
      <StyledMessageInfo>
        <Typography
          value={messageDate}
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
        <Avatar size={Avatar.sizes.SMALL} src={avatarImg} type={Avatar.types.IMG} rectangle />
      </StyledMessageInfo>
      <StyledMessageText secondary>
        <ChatTypingEffect value={messageText} callFunction={handleResponse} typeSpeed={20} />
      </StyledMessageText>
    </StyledMessageWrapper>
  )
}

export default AiMessageTypingEffect
