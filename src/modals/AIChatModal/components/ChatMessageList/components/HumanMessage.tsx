import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import UploadedFile from 'components/UploadedFile'

type HumanMessageProps = {
  avatarImg: string
  messageDate: string
  messageText: string
}

const HumanMessage = ({ avatarImg, messageDate, messageText }: HumanMessageProps) => {
  const urlRegex = /https.*\.csv/ // Regex pattern to match "https" followed by any characters until ".csv"
  const urlMatch = messageText.match(urlRegex)

  let url = ''
  let fileName = ''
  let messageWithoutUrl = messageText

  if (urlMatch) {
    url = urlMatch[0]
    fileName = messageText.substring(0, urlMatch.index)
    messageWithoutUrl = messageText.replace(url, '').replace(fileName, '')
  }

  const handleClick = () => {
    window.location.href = url
  }

  return (
    <StyledMessageWrapper>
      <StyledMessageInfo>
        <Avatar size={Avatar.sizes.SMALL} src={avatarImg} type={Avatar.types.IMG} rectangle />
        <Typography
          value={messageDate}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'rgba(255, 255, 255, 0.60)'}
        />
      </StyledMessageInfo>

      <StyledMessageText>
        {urlMatch && <UploadedFile name={fileName} onClick={handleClick} />}
        <Typography
          value={messageWithoutUrl}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor={'rgba(255, 255, 255)'}
        />
      </StyledMessageText>
    </StyledMessageWrapper>
  )
}

export default HumanMessage

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
  color: #fff;
  display: flex;
  padding: 16px 16px 18px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
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
