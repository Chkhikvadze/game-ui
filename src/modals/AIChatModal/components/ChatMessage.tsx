/* eslint-disable react/no-children-prop */
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import Image from './Image'
import user from '../assets/user.png'
import l3 from '../assets/l3.png'
import { IChatMessage, CHAT_MESSAGE_ENUM } from '../types'
import styled, { css } from 'styled-components'
import GameCategory from './GameCategory'
import GameIdea from './GameIdea'
import Gameplay from './Gameplay'
import Collections from './Collections'

type ChatMessageProps = {
  message: IChatMessage
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, created_on, text, ai = false, aiModel, type } = message

  return (
    <StyledWrapper key={id}>
      <StyledMessagePicWrapper>
        {ai ? (
          <img src={l3} alt='L3 logo' />
        ) : (
          <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
        )}
      </StyledMessagePicWrapper>

      {aiModel === 'DALL·E' && ai && <Image url={text} />}

      {!(aiModel === 'DALL·E' && ai) && (
        <StyledMessageWrapper>
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

          {CHAT_MESSAGE_ENUM.GameCategory === type && <GameCategory />}

          {CHAT_MESSAGE_ENUM.GameIdea === type && <GameIdea message={message} />}
          {CHAT_MESSAGE_ENUM.Gameplay === type && <Gameplay message={message} />}
          {CHAT_MESSAGE_ENUM.Collection === type && <Collections message={message} />}
          {/* <StyledDate isMessageByAi={ai}>{moment(created_on).calendar()}</StyledDate> */}
        </StyledMessageWrapper>
      )}
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
