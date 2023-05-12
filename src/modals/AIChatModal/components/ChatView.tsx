import styled from 'styled-components'
import { useState, useRef, useEffect, useContext, FormEvent } from 'react'
import ChatMessage from 'modals/AIChatModal/components/ChatMessage'
// TODO: remove react icons after adding our icons
import { MdSend } from 'react-icons/md'
import Filter from 'bad-words'
import { davinci } from 'modals/AIChatModal/utils/davinci'
import { dalle } from 'modals/AIChatModal/utils/dalle'
import { IChatMessage, CHAT_MESSAGE_ENUM } from '../types'
import { useChatState } from '../hooks/useChat'

type AiModelOption = 'ChatGPT' | 'DALL·E'

const options: AiModelOption[] = ['ChatGPT', 'DALL·E']

const ChatView = () => {
  const messagesEndRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [formValue, setFormValue] = useState('')
  const [thinking, setThinking] = useState(false)
  const [selected, setSelected] = useState(options[0])
  const { currentChat, addMessage, handleGoToNextStep, handleUserInput } = useChatState()
  const messages = currentChat?.messages || []

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

    const aiModel = selected

    setThinking(true)
    setFormValue('')

    await handleUserInput(cleanPrompt, aiModel)

    setThinking(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      sendMessage(e)
    }
  }

  /**
   * Scrolls the chat area to the bottom when the messages array is updated.
   */
  useEffect(() => {
    scrollToBottom()
  }, [messages, thinking])

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <StyledWrapper>
      <StyledMessages>
        <h3 style={{ color: 'white' }}>Game AI: {currentChat.name}</h3>
        {messages.map((message: any, index: number) => (
          <ChatMessage key={index} message={{ ...message }} />
        ))}

        {thinking && (
          <ChatMessage
            message={{
              id: 123456,
              ai: true,
              created_on: Date.now(),
              text: 'Generating answer...',
              type: CHAT_MESSAGE_ENUM.AI_MANUAL,
            }}
          />
        )}

        <span ref={messagesEndRef}></span>
        <button onClick={() => handleGoToNextStep()}>Next</button>
      </StyledMessages>

      <StyledForm onSubmit={sendMessage}>
        <StyledSelect value={selected} onChange={e => setSelected(e.target.value as AiModelOption)}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </StyledSelect>

        <StyledTextareaWrapper>
          <StyledTextarea
            disabled={thinking}
            ref={inputRef}
            value={formValue}
            onKeyDown={handleKeyDown}
            onChange={e => setFormValue(e.target.value)}
            placeholder='Type a message...'
          />
          <StyledButton type='submit' disabled={!formValue || thinking}>
            <MdSend size={30} />
          </StyledButton>
        </StyledTextareaWrapper>
      </StyledForm>
    </StyledWrapper>
  )
}

export default ChatView

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow: hidden;
  transition: background-color 300ms ease-in-out;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
`

const StyledMessages = styled.main`
  flex-grow: 1;
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  margin-bottom: 80px; // To make space for input
`

const StyledForm = styled.form`
  display: flex;
  gap: 10px;
  position: absolute;
  margin: 8px;
  bottom: 0;
  left: 0;
  right: 0;
  color: black;
  transition-duration: 300ms;
`

const StyledSelect = styled.select`
  background: rgba(255, 255, 255, 0.2);
  height: 4rem;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 100px;
  color: white;
  transition: all 0.3s ease-in-out;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  outline: none;

  option {
    color: black;
  }
`

const StyledTextareaWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 100%;
  position: relative;
  flex-grow: 1;
`

const StyledTextarea = styled.textarea`
  flex-grow: 1;
  margin-left: 0;
  font-size: 14px; /* xl in Tailwind */
  height: 64px; /* h-16 in Tailwind */
  padding: 0 15px; /* p-2 in Tailwind */
  overflow-y: hidden;
  resize: vertical; /* resize-y in Tailwind */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  color: white;
  line-height: 64px;

  &::placeholder {
    color: #c7c5c5;
  }
`

const StyledButton = styled.button`
  position: absolute;
  right: 10px;
  height: 64px;
  width: 64px;
  padding-left: 1rem;
  padding-right: 1rem;
  color: white;
  border: 0;
  transition-property: all;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`
