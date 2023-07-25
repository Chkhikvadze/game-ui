import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useMemo, FormEvent } from 'react'
import ChatMessage from 'modals/AIChatModal/components/ChatMessage'
// TODO: remove react icons after adding our icons

import Filter from 'bad-words'
import { MessageTypeEnum, ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'
import { v4 as uuidv4 } from 'uuid'

import ArrowRightLongIcon from '../assets/arrow_long_right.svg'
import ReloadIcon from '../assets/reload_icon.svg'

import SendIconSvg from '../assets/send_icon.svg'

import { StyledInput } from 'components/Spotlight/Spotlight'

import { useNavigate } from 'react-router-dom'

const ChatView = () => {
  const navigate = useNavigate()

  const messagesEndRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [formValue, setFormValue] = useState('')

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

  // const params = useParams()
  // console.log(params)
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

    handleUserInput(cleanPrompt, apiVersion)

    setFormValue('')
    setThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !thinking) {
      e.preventDefault()
      // 👇 Get input value
      if (formValue) {
        sendMessage(e)
      }
    }
  }

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages, thinking])

  useEffect(() => {
    const versions = [
      ApiVersionEnum.L3_Conversational,
      // ApiVersionEnum.L3_PlanAndExecute,
      ApiVersionEnum.L3_PlanAndExecuteWithTools,
    ]

    if (versions.includes(apiVersion)) {
      navigate('/copilot', { state: { text: 'v2' } })
    }
  }, [apiVersion])

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */

  const adjustTextareaHeight = () => {
    const textarea: any = inputRef.current
    textarea.style.height = 'auto' // Reset the height to auto to recalculate the actual height based on content
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scrollHeight to fit the content
  }

  return (
    <StyledWrapper>
      <StyledMessages>
        <StyledChatWrapper>
          <>
            {messages.map(message => (
              <>
                {/* <ChatMessage key={index} message={{ ...message }} /> */}
                <ChatMessage key={message.id} message={message} />
                {/* <  /> */}
              </>
            ))}
          </>

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
        <span ref={messagesEndRef}></span>
      </StyledMessages>

      <StyledChatFooter>
        <StyledButtonGroup>
          <StyledButtonsWrapper>
            <StyledNextBtn onClick={() => handleGoToNextStep()}>
              <img src={ArrowRightLongIcon} alt='next' />
              <span>Next</span>
            </StyledNextBtn>
            <StyledReloadBtn onClick={() => handleRegenerate()}>
              <img src={ReloadIcon} alt='reload' />
              <span>Regenerate</span>
            </StyledReloadBtn>
          </StyledButtonsWrapper>
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

            <StyledInput
              expanded
              ref={inputRef}
              value={formValue}
              onKeyDown={handleKeyDown}
              onChange={e => {
                setFormValue(e.target.value)
                adjustTextareaHeight()
              }}
              placeholder='Ask or Generate anything'
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
  height: 100%;
  width: 100%;
  overflow-y: auto;
  transition: background-color 300ms ease-in-out;
  position: relative;
  margin: 0 auto;
  /* padding-bottom: 50px; */
  /* height: calc(100% - 80px); */
  /* margin-bottom: 100px; */
`

const StyledMessages = styled.main`
  // flex-grow: 1;
  width: 100%;
  display: flex;
  /* overflow-y: auto; */
  flex-direction: column;
  align-items: center;
  /* margin-bottom: 80px; // To make space for input */
  height: calc(100vh - 220px);
`

const StyledForm = styled.form`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 0px 23px 0px 16px;
  gap: 12px;

  background: rgba(0, 0, 0, 0.1);
  /* Style */

  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(100px);

  /* Note: backdrop-filter has minimal browser support */

  border-radius: 100px;

  /* cursor: pointer; */

  width: fit-content;
  min-height: 48px;
  height: fit-content;
  max-height: 150px;
`

const StyledSelect = styled.select`
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
  /* background: rgba(255, 255, 255, 0.2); */
  border-radius: 100px;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto;
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

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`

const StyledChatFooter = styled.div`
  /* display: flex;
  justify-content: center; */

  position: fixed;
  left: 50%;
  z-index: 120;
  bottom: 10px;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
`

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  padding: 16px 0;

  /* min-width: 400px;
  width: 700px; */
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

const StyledChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 750px;
  height: 100%;
  margin-top: 20px;
`

const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
