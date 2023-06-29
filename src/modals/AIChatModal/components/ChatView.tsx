import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useMemo, FormEvent } from 'react'
import ChatMessage from 'modals/AIChatModal/components/ChatMessage'
// TODO: remove react icons after adding our icons
import Typography from '@l3-lib/ui-core/dist/Typography'

import Filter from 'bad-words'
import { MessageTypeEnum, ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'
import { v4 as uuidv4 } from 'uuid'
import ArrowRightLongIcon from '../assets/arrow_long_right.svg'
import ReloadIcon from '../assets/reload_icon.svg'
import user from '../assets/user.png'
import SendIconSvg from '../assets/send_icon.svg'
import { useCreateChatMassageService } from 'services/chat/useCreateChatMessage'
import { useMessageByGameService } from 'services/chat/useMassageByGameService'

import l3 from '../assets/l3.png'

type ChatViewProps = {
  text: string
}

const ChatView = ({ text }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [formValue, setFormValue] = useState(text || '')
  const [newMessage, setNewMessage] = useState<string | null>()

  const {
    currentChat,
    handleGoToNextStep,
    handleUserInput,
    handleRegenerate,
    apiVersions,
    apiVersion,
    setAPIVersion,
    thinking,
    setThinking,
  } = useChatState()

  const messages = useMemo(() => currentChat?.messages || [], [currentChat])

  /**
   * Scrolls the chat area to the bottom.
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Sends our prompt to our API and get response to our request from openai.
   *
   * @param {Event} e - The submit event of the form.
   */
  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()

    const filter = new Filter()
    const cleanPrompt = filter.isProfane(formValue) ? filter.clean(formValue) : formValue

    setThinking(true)

    await handleUserInput(cleanPrompt, apiVersion)

    setFormValue('')
    setThinking(false)
  }
  const { data: chatMessages, refetch: messageRefetch } = useMessageByGameService()
  const [createMessageService] = useCreateChatMassageService()

  const initialChat = chatMessages.map((chat: any) => {
    return { message: chat?.message?.data?.content, type: chat?.message?.type }
  })

  const createMessage = async () => {
    // scrollToBottom()

    const message = formValue

    setNewMessage(message)
    setThinking(true)
    setFormValue('')

    await createMessageService({ message: message })
    await messageRefetch()

    setNewMessage(null)
    setThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      if (apiVersion === 'l3-v2') {
        createMessage()
      } else {
        sendMessage(e)
      }
    }
  }

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    if (text) {
      messagesEndRef.current?.scrollIntoView()
    } else {
      scrollToBottom()
    }
    console.log('runs')
  }, [messages, thinking])

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */

  useEffect(() => {
    inputRef.current?.focus()

    // setTimeout(() => {
    //   scrollToBottom()
    // }, 1)

    if (text && formValue !== '') {
      setAPIVersion('l3-v2' as ApiVersionEnum)
      createMessage()
    }
  }, [])

  return (
    <StyledWrapper>
      <StyledMessages>
        <StyledChatHeader>
          <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
          <h2>Game AI: {currentChat.name}</h2>
        </StyledChatHeader>
        <StyledSeparator />

        {apiVersion === 'l3-v2' ? (
          <>
            <Typography
              value={'AI Chat'}
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor={'rgba(255, 255, 255)'}
            />

            <StyledChatWrapper>
              {initialChat.slice(-15).map((chat: any) => {
                if (chat?.type === 'human')
                  return (
                    <StyledMessageWrapper>
                      <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
                      <Typography
                        value={chat.message}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.md}
                        customColor={'rgba(255, 255, 255)'}
                      />
                    </StyledMessageWrapper>
                  )

                if (chat?.type === 'ai')
                  return (
                    <StyledMessageWrapper>
                      <img src={l3} alt='Page logo' />

                      <Typography
                        value={chat.message}
                        type={Typography.types.LABEL}
                        size={Typography.sizes.md}
                        customColor={'rgba(255, 255, 255)'}
                      />
                    </StyledMessageWrapper>
                  )
              })}

              {newMessage && (
                <StyledMessageWrapper>
                  <img className='rounded-full' loading='lazy' src={user} alt='profile pic' />
                  <Typography
                    value={newMessage}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                    customColor={'rgba(255, 255, 255)'}
                  />
                </StyledMessageWrapper>
              )}
              {thinking && (
                <ChatMessage
                  message={{
                    id: uuidv4(),
                    ai: true,
                    createdOn: Date.now(),
                    text: 'Generating...',
                    loader_type: 'video',
                    type: MessageTypeEnum.AI_MANUAL,
                  }}
                />
              )}
            </StyledChatWrapper>
          </>
        ) : (
          <>
            {messages.map(message => (
              <>
                {/* <ChatMessage key={index} message={{ ...message }} /> */}
                <ChatMessage key={message.id} message={message} />
                {/* <  /> */}
              </>
            ))}
          </>
        )}
        {thinking && apiVersion !== 'l3-v2' && (
          <ChatMessage
            message={{
              id: uuidv4(),
              ai: true,
              createdOn: Date.now(),
              text: 'Generating...',
              loader_type: 'video',
              type: MessageTypeEnum.AI_MANUAL,
            }}
          />
        )}
        <span ref={messagesEndRef}></span>
      </StyledMessages>
      {/* <StyledSeparator /> */}
      <StyledChatFooter>
        <StyledButtonGroup>
          {apiVersion !== 'l3-v2' && (
            <>
              <StyledNextBtn onClick={() => handleGoToNextStep()}>
                <img src={ArrowRightLongIcon} alt='next' />
                <span>Next</span>
              </StyledNextBtn>
              <StyledReloadBtn onClick={() => handleRegenerate()}>
                <img src={ReloadIcon} alt='reload' />
                <span>Regenerate</span>
              </StyledReloadBtn>
            </>
          )}
        </StyledButtonGroup>
        <StyledForm onSubmit={sendMessage}>
          <StyledTextareaWrapper>
            <StyledSelect
              value={apiVersion}
              onChange={e => {
                if (thinking) {
                  setThinking(false)
                }
                setAPIVersion(e.target.value as ApiVersionEnum)
              }}
            >
              {apiVersions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </StyledSelect>
            <StyledTextarea
              disabled={thinking}
              ref={inputRef}
              value={formValue}
              onKeyDown={handleKeyDown}
              onChange={e => setFormValue(e.target.value)}
              placeholder='Type a message...'
              rows={1}
            />
            <StyledButton type='submit' disabled={!formValue || thinking}>
              <img src={SendIconSvg} alt='sen' />
            </StyledButton>
          </StyledTextareaWrapper>
        </StyledForm>
      </StyledChatFooter>
    </StyledWrapper>
  )
}

export default ChatView

const StyledWrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  height: calc(100vh - 65px);
  overflow: hidden;
  transition: background-color 300ms ease-in-out;
  position: relative;
  width: 100%;
  margin: 0 auto;
`

const StyledMessages = styled.main`
  // flex-grow: 1;
  // width: 100%;
  // display: flex;
  overflow-y: auto;
  flex-direction: column;
  // margin-bottom: 80px; // To make space for input
  height: calc(100% - 145px);
  ::-webkit-scrollbar {
    display: none;
  }
`

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 10px;
  // position: absolute;
  // margin: 8px;
  bottom: 0;
  left: 0;
  right: 0;
  color: black;
  transition-duration: 300ms;
`

const StyledSelect = styled.select`
  // background: rgba(255, 255, 255, 0.2);
  // height: 4rem;
  // padding-left: 15px;
  // padding-right: 15px;
  // border-radius: 100px;
  // color: white;
  // transition: all 0.3s ease-in-out;
  // text-align: center;
  // font-size: 14px;
  // font-weight: 600;
  // outline: none;
  // position: absolute;
  // option {
  //   color: black;
  // }
  outline: none;
  border: none;
  padding-left: 24px;
  height: 100%;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`

const StyledTextareaWrapper = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto;

  min-width: 320px;
  width: 800px;
  height: 48px;
`

const StyledTextarea = styled.textarea`
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.8);
  resize: none;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  padding: 18px 14px;
  &::placeholder {
    color: #c7c5c5;
  }
`

const StyledButton = styled.button`
  height: 100%;
  padding-right: 24px;
  padding-left: 24px;
  width: 100%;
  color: white;
  border: 0;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`

const StyledChatFooter = styled.div``

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 16px 0;
`

const StyledSeparator = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  height: 1px;
  margin: 17px 0;
`

const StyledNextBtn = styled.button`
  background: linear-gradient(180deg, #e332e6 0%, #a822f3 100%);
  border-radius: 60px;
  display: flex;
  align-items: center;
  padding: 10px 18px;
  gap: 11px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }
`
const StyledReloadBtn = styled.button`
  background: linear-gradient(180deg, #e332e6 0%, #a822f3 100%);
  border-radius: 60px;
  display: flex;
  align-items: center;
  padding: 10px 18px;
  gap: 11px;
  background: rgba(255, 255, 255, 0.6);
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.7);
  }
`

const StyledChatHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
`
const StyledChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  margin-top: 20px;
`
const StyledMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
