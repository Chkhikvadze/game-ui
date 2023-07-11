import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useMemo, FormEvent, useContext } from 'react'
import ChatMessage from 'modals/AIChatModal/components/ChatMessage'
// TODO: remove react icons after adding our icons

import Filter from 'bad-words'
import { MessageTypeEnum, ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

import { useCreateChatMassageService } from 'services/chat/useCreateChatMessage'
import { useMessageByGameService } from 'services/chat/useMassageByGameService'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Toast from '@l3-lib/ui-core/dist/Toast'

import ArrowRightLongIcon from '../assets/arrow_long_right.svg'
import ReloadIcon from '../assets/reload_icon.svg'
import user from '../assets/user.png'
import SendIconSvg from '../assets/send_icon.svg'
import l3 from '../assets/l3.png'

import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { StyledInput, StyledOption } from 'components/Spotlight/Spotlight'

import { Avatar_3 } from 'assets/avatars'
import { useParams } from 'react-router-dom'
import { useSuggestions } from 'components/Spotlight/useSuggestions'
import ChatTypingEffect from 'components/ChatTypingEffect'
import { ToastContext } from 'contexts'
import ListRender from './ListRender'

type ChatViewProps = {
  text: string
}

const ChatView = ({ text }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLSpanElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [formValue, setFormValue] = useState(text || '')
  const [newMessage, setNewMessage] = useState<string | null>()
  // const [chatResponse, setChatResponse] = useState<string | null>()
  const [typingEffectText, setTypingEffectText] = useState(false)

  const { chatSuggestions } = useSuggestions()

  const { setToast, toast } = useContext(ToastContext)

  const urlParams = new URLSearchParams(window.location.search)
  const gameId = urlParams.get('game')
  const collectionId = urlParams.get('collection')
  // console.log('gameID', gameId)
  // console.log('collectionId', collectionId)

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

    await handleUserInput(cleanPrompt, apiVersion)

    setFormValue('')
    setThinking(false)
  }
  const { data: chatMessages, refetch: messageRefetch } = useMessageByGameService({
    gameId: gameId || '',
  })
  const [createMessageService] = useCreateChatMassageService()

  const initialChat = chatMessages.map((chat: any) => {
    return {
      message: chat?.message?.data?.content,
      type: chat?.message?.type,
      date: chat?.created_on,
    }
  })

  const createMessage = async () => {
    // scrollToBottom()
    try {
      const message = formValue

      setNewMessage(message)
      setThinking(true)
      setFormValue('')

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      const res = await createMessageService({ message, gameId: gameId || '' })
      await messageRefetch()
      // setChatResponse(res)
      setNewMessage(null)
      setThinking(false)
    } catch (e) {
      setToast({
        message: 'Something went wrong',
        type: 'negative',
        open: true,
      })
      setNewMessage(null)
      setThinking(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !thinking) {
      e.preventDefault()
      // 👇 Get input value
      if (apiVersion === 'l3-v2' && formValue) {
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
    scrollToBottom()
  }, [messages, thinking])

  /**
   * Focuses the TextArea input to when the component is first rendered.
   */

  useEffect(() => {
    if (text) {
      setAPIVersion('l3-v2' as ApiVersionEnum)
      // createMessage()

      setTimeout(() => {
        setFormValue('')
        inputRef.current?.focus()
      }, 1)
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView()
      }, 500)
    }
  }, [])

  const adjustTextareaHeight = () => {
    const textarea: any = inputRef.current
    textarea.style.height = 'auto' // Reset the height to auto to recalculate the actual height based on content
    textarea.style.height = `${textarea.scrollHeight}px` // Set the height to the scrollHeight to fit the content
  }

  const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSS')
  const formattedCurrentDate = moment(currentDate).format('HH:mm')

  const handlePickedSuggestion = (value: string) => {
    setFormValue(value)
    setTypingEffectText(true)
  }

  return (
    <StyledWrapper>
      <StyledMessages>
        <StyledChatWrapper>
          {apiVersion === 'l3-v2' ? (
            <>
              {/* <ListRender data={chatMessages} newMessage={newMessage} thinking={thinking} /> */}
              {initialChat.slice(-30).map((chat: any) => {
                const chatDate = moment(chat.date).format('HH:mm')

                if (chat?.type === 'human')
                  return (
                    <StyledMessageWrapper>
                      <StyledMessageInfo>
                        <Avatar
                          size={Avatar.sizes.SMALL}
                          src={Avatar_3}
                          type={Avatar.types.IMG}
                          rectangle
                        />
                        <Typography
                          value={chatDate}
                          type={Typography.types.LABEL}
                          size={Typography.sizes.xss}
                          customColor={'rgba(255, 255, 255, 0.60)'}
                        />
                      </StyledMessageInfo>

                      <StyledMessageText>
                        <Typography
                          value={chat.message}
                          type={Typography.types.LABEL}
                          size={Typography.sizes.md}
                          customColor={'rgba(255, 255, 255)'}
                        />
                      </StyledMessageText>
                    </StyledMessageWrapper>
                  )

                if (chat?.type === 'ai')
                  return (
                    <StyledMessageWrapper secondary>
                      <StyledMessageInfo>
                        <Typography
                          value={chatDate}
                          type={Typography.types.LABEL}
                          size={Typography.sizes.xss}
                          customColor={'rgba(255, 255, 255, 0.60)'}
                        />
                        <Typography
                          value='L3'
                          type={Typography.types.LABEL}
                          size={Typography.sizes.sm}
                          customColor={'#FFF'}
                        />
                        <Avatar
                          size={Avatar.sizes.SMALL}
                          src={l3}
                          type={Avatar.types.IMG}
                          rectangle
                        />
                      </StyledMessageInfo>
                      <StyledMessageText secondary>
                        <StyledReactMarkdown
                          children={chat.message}
                          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                          components={{
                            table: ({ node, ...props }) => <StyledTable {...props} />,

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
                      </StyledMessageText>
                    </StyledMessageWrapper>
                  )
              })}

              {newMessage && (
                <StyledMessageWrapper>
                  <StyledMessageInfo>
                    <Avatar
                      size={Avatar.sizes.SMALL}
                      src={Avatar_3}
                      type={Avatar.types.IMG}
                      rectangle
                    />
                    <Typography
                      value={formattedCurrentDate}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'rgba(255, 255, 255, 0.60)'}
                    />
                  </StyledMessageInfo>

                  <StyledMessageText>
                    <Typography
                      value={newMessage}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                      customColor={'rgba(255, 255, 255)'}
                    />
                  </StyledMessageText>
                </StyledMessageWrapper>
              )}
              {/* dont remove this */}
              {/* {chatResponse && (
                <StyledMessageWrapper secondary>
                  <StyledMessageInfo>
                    <Typography
                      value={formattedCurrentDate}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.xss}
                      customColor={'rgba(255, 255, 255, 0.60)'}
                    />
                    <Typography
                      value='L3'
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'#FFF'}
                    />
                    <Avatar size={Avatar.sizes.SMALL} src={l3} type={Avatar.types.IMG} rectangle />
                  </StyledMessageInfo>
                  <StyledMessageText secondary>
                    <ChatTypingEffect
                      value={chatResponse}
                      // callFunction={() => setChatResponse(null)}
                      callFunction={() => {}}
                      show={chatResponse ? true : false}
                      typeSpeed={0}
                    />
                  </StyledMessageText>
                </StyledMessageWrapper>
              )} */}
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
        </StyledChatWrapper>
        <span ref={messagesEndRef}></span>
      </StyledMessages>
      {/* <StyledSeparator /> */}
      <StyledChatFooter>
        <StyledButtonGroup>
          {apiVersion !== 'l3-v2' ? (
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
          ) : (
            <StyledSuggestionsContainer>
              {chatSuggestions.map((chatSuggestion: string) => {
                return (
                  <StyledOption
                    onClick={() => {
                      handlePickedSuggestion(chatSuggestion)
                    }}
                  >
                    {chatSuggestion}
                  </StyledOption>
                )
              })}
            </StyledSuggestionsContainer>
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

            {typingEffectText ? (
              <StyledTypingWrapper>
                <ChatTypingEffect
                  show={typingEffectText}
                  value={formValue}
                  callFunction={createMessage}
                />
              </StyledTypingWrapper>
            ) : (
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
            )}
            <StyledButton type='submit' disabled={!formValue || thinking}>
              <img src={SendIconSvg} alt='sen' />
            </StyledButton>
          </StyledTextareaWrapper>
        </StyledForm>
      </StyledChatFooter>
      <Toast
        label={toast?.message}
        type={toast?.type}
        autoHideDuration={2500}
        open={toast?.open}
        onClose={() => setToast({ open: false })}
      />
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

const StyledChatHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  width: 100%;

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
  gap: 50px;
  width: 750px;
  height: 100%;
  margin-top: 20px;
`
const StyledMessageWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  flex-direction: column;
  /* align-items: center; */

  gap: 8px;

  min-width: 400px;

  ${props =>
    props.secondary &&
    css`
      align-items: flex-end;
    `};
`
const StyledMessageText = styled.div<{ secondary?: boolean }>`
  display: flex;
  padding: 16px 16px 18px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
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

const StyledMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
const StyledHeaderInnerWrapper = styled.div`
  width: 750px;
  padding-bottom: 34px;
  padding-left: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  display: flex;
  gap: 12px;
  align-items: center;
`
const StyledReactMarkdown = styled(ReactMarkdown)`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledTable = styled.table`
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #fff;
    padding: 5px 30px;
    text-align: center;
  }
`
const StyledSuggestionsContainer = styled.div`
  display: flex;
  max-width: 800px;
  align-items: center;
  gap: 12px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`
const StyledTypingWrapper = styled.div`
  width: 600px;
`
