/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import user from '../assets/user.png'
import l3 from '../assets/l3.png'
import { IChatMessage, MESSAGE_TYPE_ENUM } from '../types'
import styled, { css } from 'styled-components'
import GameCategory from './GameCategory'
import GameIdea from './GameIdea'
import Gameplay from './Gameplay'
import ChatCollections from './ChatCollections'
import ChatReport from './ChatReport'
import ChatRewardsAchievements from './ChatRewardsAchievements'

import loadingVideo from '../assets/sidebyside-s.mp4'
import GameMedias from './GameMedias'

type ChatMessageProps = {
  message: IChatMessage
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, createdOn, text, ai = false, type, loader_type } = message

  const is_video_loader = loader_type === 'video'

  return (
    <StyledWrapper key={id} className='test_wrapper'>
      <StyledMessageWrapper>
        <StyledInnerGroupHeader>
          {/* <StyledMessagePicWrapper> */}
          {ai ? (
            <>
              {is_video_loader ? (
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
          {/* </StyledMessagePicWrapper> */}

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

        {MESSAGE_TYPE_ENUM.GameCategory === type && (
          <>
            <GameCategory />
            <StyledSeparator />
          </>
        )}

        {MESSAGE_TYPE_ENUM.GameIdea === type && (
          <>
            <GameIdea message={message} />
            <StyledSeparator />
          </>
        )}

        {MESSAGE_TYPE_ENUM.Gameplay === type && (
          <>
            <Gameplay message={message} />
            <StyledSeparator />
          </>
        )}
        {MESSAGE_TYPE_ENUM.Collection === type && <ChatCollections message={message} />}
        {MESSAGE_TYPE_ENUM.RewardAchievement === type && (
          <ChatRewardsAchievements message={message} />
        )}
        {MESSAGE_TYPE_ENUM.Report === type && <ChatReport message={message} />}
        {MESSAGE_TYPE_ENUM.GameMedias === type && <GameMedias message={message} />}

        {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {MESSAGE_TYPE_ENUM.GameMedias === type &&
            message.medias?.map((media, index) => {
              return (
                <div key={index} style={{ padding: '20px' }}>
                  <p>test images</p>
                  <img width={400} height={400} src={media} alt='media' />
                </div>
              )
            })}
        </div> */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {MESSAGE_TYPE_ENUM.AssetsMedias === type &&
            message?.collections?.map(collection => {
              return collection.assets?.map((asset, index) => {
                return (
                  <div key={index} style={{ padding: '20px' }}>
                    <p>
                      {collection.name} - {asset.name}
                    </p>
                    <img
                      width={200}
                      height={200}
                      src={asset?.medias?.length > 0 ? asset?.medias[0]?.url : undefined}
                      alt='media'
                    />
                  </div>
                )
              })
            })}
        </div>
        {/* <StyledDate isMessageByAi={ai}>{moment(createdOn).calendar()}</StyledDate> */}
      </StyledMessageWrapper>
    </StyledWrapper>
  )
}

export default ChatMessage

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

// const StyledDate = styled.div<{ isMessageByAi: boolean }>`
//   text-align: ${props => (props.isMessageByAi ? 'left' : 'right')};
//   font-size: 12px;
//   font-weight: 100;
//   color: white;

//   ${props =>
//     !props.isMessageByAi &&
//     `
//     color: #d1d5db;
//   `}
// `

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

const StyledReactMarkdown = styled(ReactMarkdown)<{ isMessageByAi: boolean }>`
  text-align: left;
  font-size: 16px;
  color: #4a5568;
  color: #e5e7eb;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
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
