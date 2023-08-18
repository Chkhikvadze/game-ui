import { useContext, useMemo } from 'react'
import { AuthContext } from 'contexts'
import styled, { css } from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import UploadedFile from 'components/UploadedFile'
import { useAssignedUserListService } from 'services'
import HumanMessageText from './HumanMessageText'
import HumanReply from './HumanReply'
import MessageActions from './MessageActions'

type HumanMessageProps = {
  avatarImg: string
  messageDate: string
  messageText: string
  userId: string
  isReply?: boolean
  onReplyClick?: () => void
}

const getAuthorName = (userId: string, assignedUserList: any, user: any) => {
  if (userId === user.id) {
    return user.first_name
  }

  const assignedUser = assignedUserList?.find((user: any) => user.assigned_user_id === userId)
  const creatorUser = assignedUserList?.find((user: any) => user.creator_user_id === userId)

  if (assignedUser) {
    return assignedUser.assigned_user_first_name
  }

  if (creatorUser) {
    return creatorUser.creator_user
  }

  return user.first_name
}

const HumanMessage = ({
  avatarImg,
  messageDate,
  messageText,
  userId,
  isReply,
  onReplyClick,
}: HumanMessageProps) => {
  const { data: assignedUserList } = useAssignedUserListService()
  const { user } = useContext(AuthContext)

  const authorName = useMemo(
    () => getAuthorName(userId, assignedUserList, user),
    [userId, assignedUserList, user],
  )

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
    <>
      {isReply ? (
        <HumanReply textArray={wordArray} avatarImg={avatarImg} authorName={authorName} />
      ) : (
        <StyledMessageWrapper>
          <StyledAvatarWrapper>
            <Avatar size={Avatar.sizes.MEDIUM} src={avatarImg} type={Avatar.types.IMG} rectangle />
          </StyledAvatarWrapper>

          <StyledMainContent>
            <StyledMessageTop>
              <StyledMessageInfo>
                <Typography
                  value={authorName}
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

              <StyledMessageActionsWrapper className='actions'>
                {onReplyClick && <MessageActions onReplyClick={onReplyClick} />}
              </StyledMessageActionsWrapper>
            </StyledMessageTop>
            <StyledMessageText>
              {fileUrlMatch && <UploadedFile name={fileName} onClick={handleFileClick} />}

              <HumanMessageText textArray={wordArray} />
            </StyledMessageText>
          </StyledMainContent>
        </StyledMessageWrapper>
      )}
    </>
  )
}

export default HumanMessage

export const StyledMessageWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* flex-direction: row-reverse; */
  align-items: flex-start;
  /* margin-top: 38px;
  margin-right: 50px; */
  gap: 12px;
  padding-right: 10px;
  min-width: 400px;
  width: 850px;

  :hover {
    .actions {
      opacity: 1;
    }
  }

  ${props =>
    props.secondary &&
    css`
      flex-direction: row-reverse;
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
  overflow-x: auto;

  width: 100%;

  border-radius: 4px 18px 18px 18px;
  background: var(--basic-foreground-white-1, rgba(255, 255, 255, 0.1));
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);

  ${props =>
    props.secondary &&
    css`
      /* border-radius: 18px 4px 18px 18px; */
      background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    `};
`

export const StyledMessageTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledMainContent = styled.div<{ secondary?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: calc(100% - 60px);
  height: 100%;

  ${props =>
    props.secondary &&
    css`
      align-items: flex-end;
    `};
`
export const StyledAvatarWrapper = styled.div`
  margin-top: 5px;
`

export const StyledMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const StyledMessageActionsWrapper = styled.div`
  opacity: 0;
`
