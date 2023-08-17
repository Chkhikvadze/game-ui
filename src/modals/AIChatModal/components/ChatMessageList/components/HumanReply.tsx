import styled from 'styled-components'
import HumanMessageText from './HumanMessageText'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

const HumanReply = ({
  textArray,
  avatarImg,
  authorName,
}: {
  textArray: string[]
  avatarImg: string
  authorName: string
}) => {
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
          value={`@${authorName}`}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
      </StyledReplyInfoWrapper>
      <StyledReplyTextWrapper>
        <HumanMessageText textArray={textArray} />
      </StyledReplyTextWrapper>
    </StyledReplyWrapper>
  )
}

export default HumanReply

const StyledReplyWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  /* padding-left: 50px; */
  font-size: 14px;

  width: 100%;

  width: 850px;
  height: 30px;

  gap: 10px;
`

const StyledReplyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
`
const StyledReplyTextWrapper = styled.div`
  overflow: hidden;
  margin-top: 4px;
`
const StyledReplyLine = styled.div`
  width: 24px;
  height: 15px;

  border-top: 2px solid var(--primitives-gray-500, #a8bee2);
  border-left: 2px solid var(--primitives-gray-500, #a8bee2);

  border-top-left-radius: 10px;

  margin-top: 10px;
  margin-left: 24px;
`
const StyledReplyLineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
`
const StyledSmallAvatarWrapper = styled.div`
  margin-bottom: 15px;
`
