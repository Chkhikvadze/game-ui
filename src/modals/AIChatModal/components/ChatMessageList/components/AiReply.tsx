import {
  StyledReplyInfoWrapper,
  StyledReplyLine,
  StyledReplyLineWrapper,
  StyledReplyTextWrapper,
  StyledReplyWrapper,
  StyledSmallAvatarWrapper,
} from './HumanReply'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import AiMessageMarkdown from './AiMessageMarkdown'
import { ChatMessageVersionEnum } from 'services'

const AiReply = ({
  avatarImg,
  messageText,
  thoughts,
  version,
}: {
  avatarImg: string
  messageText: string
  thoughts?: any[]
  version: ChatMessageVersionEnum
}) => {
  const VERSION_TO_AGENT_NAME = {
    [ChatMessageVersionEnum.ChatConversational]: 'L3-GPT',
    [ChatMessageVersionEnum.PlanAndExecuteWithTools]: 'L3-Planner',
    [ChatMessageVersionEnum.AUTHORITARIAN_SPEAKER]: 'L3-Authoritarian-Speaker',
    [ChatMessageVersionEnum.AGENT_DEBATES]: 'L3-Agent-Debates',
  }

  const name = VERSION_TO_AGENT_NAME[version]

  return (
    <StyledReplyWrapper>
      <StyledReplyLineWrapper>
        <StyledReplyLine />
      </StyledReplyLineWrapper>
      <StyledReplyInfoWrapper>
        <StyledSmallAvatarWrapper>
          <Avatar size={Avatar.sizes.XXS} src={avatarImg} type={Avatar.types.IMG} rectangle />
        </StyledSmallAvatarWrapper>
        <Typography
          value={`@${name}`}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <AiMessageMarkdown
          children={thoughts?.length ? thoughts[thoughts.length - 1].result : messageText}
        />
      </StyledReplyTextWrapper>
    </StyledReplyWrapper>
  )
}

export default AiReply
