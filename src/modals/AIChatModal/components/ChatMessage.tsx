/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-children-prop */
import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import user from '../assets/user.png'
import l3 from '../assets/l3.png'
import { IChatMessage, MessageTypeEnum } from '../types'
import styled from 'styled-components'

import ChatReport from './Report/ChatReport'
import loadingVideo from '../assets/sidebyside-s.mp4'
import GameMenu from './Report/GameMenu'
import GameCategory from './ChatMessageComponents/GameCategory'
import GameIdea from './ChatMessageComponents/GameIdea'
import Gameplay from './ChatMessageComponents/Gameplay'
import ChatCollections from './ChatMessageComponents/ChatCollections'
import ChatRewardsAchievements from './ChatMessageComponents/ChatRewardsAchievements'
import Media from './ChatMessageComponents/Media'
import CollectionMedias from './ChatMessageComponents/CollectionsMedias'

type ChatMessageProps = {
  message: IChatMessage
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, text, ai = false, type, loader_type } = message

  const isVideoLoader = loader_type === 'video'

  return (
    <StyledWrapper key={id} className='test_wrapper'>
      <StyledMessageWrapper>
        <StyledInnerGroupHeader>
          {/* <StyledMessagePicWrapper> */}
          {ai ? (
            <>
              {isVideoLoader ? (
                <StyledVideo autoPlay loop muted>
                  <source src={loadingVideo} type='video/mp4' />
                  <source src={loadingVideo} type='video/ogg' />
                  Your browser does not support the video tag.
                </StyledVideo>
              ) : (
                <img src={l3} alt='Page logo' />
              )}
            </>
          ) : (
            <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
          )}

          <StyledReactMarkdown
            isMessageByAi={ai}
            children={text}
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || 'language-js')

                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark as any}
                    language={match[1]}
                    PreTag='div'
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}{' '}
                  </code>
                )
              },
            }}
          />
        </StyledInnerGroupHeader>

        {type === MessageTypeEnum.GameCategory && (
          <>
            <GameCategory />
            <StyledSeparator />
          </>
        )}

        {type === MessageTypeEnum.SelectGameForReport && (
          <>
            <GameMenu message={message} />
            <StyledSeparator />
          </>
        )}

        {type === MessageTypeEnum.GameIdea && (
          <>
            <GameIdea message={message} />
            <StyledSeparator />
          </>
        )}

        {type === MessageTypeEnum.Gameplay && (
          <>
            <Gameplay message={message} />
            <StyledSeparator />
          </>
        )}

        {type === MessageTypeEnum.Collection && <ChatCollections message={message} />}
        {type === MessageTypeEnum.RewardAchievement && (
          <ChatRewardsAchievements message={message} />
        )}

        {/* <ChatReport message={message} /> */}

        {type === MessageTypeEnum.Report && <ChatReport message={message} />}
        {type === MessageTypeEnum.AssetsMedias && <CollectionMedias message={message} />}
        {type === MessageTypeEnum.GameMedias && <Media message={message} />}
        {type === MessageTypeEnum.Media && <Media message={message} />}
      </StyledMessageWrapper>
    </StyledWrapper>
  )
}

export default memo(ChatMessage)

const StyledSeparator = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  height: 1px;
  margin: 17px 0;
`

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 0.5rem;
  background-size: cover;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  padding: 0 8px;
`

const StyledMessageWrapper = styled.div`
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const StyledMessagePicWrapper = styled.div`
  height: 40px;
  width: 40px;
  margin-left: 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  img {
    width: 100%;
  }
`

export const StyledReactMarkdown = styled(ReactMarkdown)<{ isMessageByAi: boolean }>`
  text-align: left;
  font-size: 16px;
  color: #4a5568;
  color: #e5e7eb;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  a {
    color: #fff;
  }
`

const StyledInnerGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
`

const StyledVideo = styled.video`
  width: 36px;
  height: 36px;
  border-radius: 6px;
`
