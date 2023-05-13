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

type ChatMessageProps = {
  message: IChatMessage
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, createdOn, text, ai = false, type } = message

  return (
    <StyledWrapper key={id}>
      <StyledMessagePicWrapper>
        {ai ? (
          <img src={l3} alt='L3 logo' />
        ) : (
          <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
        )}
      </StyledMessagePicWrapper>

      <StyledMessageWrapper>
        <StyledReactMarkdown
          isMessageByAi={ai}
          children={'test'}
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

        {MESSAGE_TYPE_ENUM.GameCategory === type && <GameCategory />}

        {MESSAGE_TYPE_ENUM.GameIdea === type && <GameIdea message={message} />}
        {MESSAGE_TYPE_ENUM.Gameplay === type && <Gameplay message={message} />}
        {MESSAGE_TYPE_ENUM.Collection === type && <ChatCollections message={message} />}
        {MESSAGE_TYPE_ENUM.Report === type && <ChatReport message={message} />}
        {/* <StyledDate isMessageByAi={ai}>{moment(createdOn).calendar()}</StyledDate> */}
      </StyledMessageWrapper>
    </StyledWrapper>
  )
}

export default ChatMessage

const StyledWrapper = styled.div`
  display: flex;
  gap: 10px;
  border-radius: 0.5rem;
  background-size: cover;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
  padding: 15px 10px;
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
`
