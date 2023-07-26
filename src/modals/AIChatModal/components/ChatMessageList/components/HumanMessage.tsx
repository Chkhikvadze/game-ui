import React, { useContext } from 'react'
import { AuthContext } from 'contexts'
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
  const { user } = useContext(AuthContext)
  const { first_name } = user

  const mentionRegex = /@\[(.*?)\]\((.*?)__(.*?)\)__mention__/

  //code below checks if the message has an attached file to it
  const fileUrlRegex = /https.*\.(csv|pdf|doc|txt|xlsx|xls)/ // Regex pattern to match "https" followed by any characters until ".(csv|pdf|doc|txt|xlsx|xls)"
  const fileUrlMatch = messageText.match(fileUrlRegex)

  let fileUrl = ''
  let fileName = ''
  let messageWithoutUrl = messageText
  // let mentionString = ''

  if (fileUrlMatch) {
    fileUrl = fileUrlMatch[0]
    fileName = messageText.substring(0, fileUrlMatch.index)
    messageWithoutUrl = messageText.replace(fileUrl, '').replace(fileName, '')
  }

  const wordArray = messageWithoutUrl.split(/\s+(?![^[]*])/)

  const handleFileClick = () => {
    window.location.href = fileUrl
  }

  //@[Mario](game__3b141a56-9787-47b3-860b-9f4b006922b3)__mention__
  return (
    <StyledMessageWrapper>
      <StyledMessageInfo>
        <Avatar size={Avatar.sizes.SMALL} src={avatarImg} type={Avatar.types.IMG} rectangle />
        <Typography
          value={first_name}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
        <Typography
          value={messageDate}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'rgba(255, 255, 255, 0.60)'}
        />
      </StyledMessageInfo>

      <StyledMessageText>
        {fileUrlMatch && <UploadedFile name={fileName} onClick={handleFileClick} />}

        <StyledTextWrapper>
          {wordArray?.map((word: string, index: number) => {
            if (word.match(mentionRegex)) {
              const mentionMatch = word.match(mentionRegex)
              if (mentionMatch) {
                const mention = mentionMatch[1]
                return (
                  <React.Fragment key={index}>
                    <StyledMentionText>@{mention}</StyledMentionText>
                  </React.Fragment>
                )
              }
            }
            return (
              <React.Fragment key={index}>
                {word} {/* Add a space before each word */}
              </React.Fragment>
            )
          })}
        </StyledTextWrapper>
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

const StyledTextWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`
const StyledMentionText = styled.div`
  color: #fff;
  background: #4ca6f8;
  margin: 0 5px;
`
