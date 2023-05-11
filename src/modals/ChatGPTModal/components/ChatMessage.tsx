/* eslint-disable react/no-children-prop */
import React from 'react'
import { MdComputer } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import Image from './Image'
import person from '../assets/person.png'
import { ChatMessageType } from '../types'

type ChatMessageProps = {
  message: ChatMessageType
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { id, createdAt, text, ai = false, selected } = message

  return (
    <div key={id} className={`${ai && 'flex-row-reverse bg-light-white'} message`}>
      {selected === 'DALL·E' && ai ? (
        <Image url={text} />
      ) : (
        <div className='message__wrapper'>
          <ReactMarkdown
            className={`message__markdown ${ai ? 'text-left' : 'text-right'}`}
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

          <div className={`${ai ? 'text-left' : 'text-right'} message__createdAt`}>
            {moment(createdAt).calendar()}
          </div>
        </div>
      )}

      <div className='message__pic'>
        {ai ? (
          <MdComputer />
        ) : (
          <img className='rounded-full' loading='lazy' src={person} alt='profile pic' />
        )}
      </div>
    </div>
  )
}

export default ChatMessage
