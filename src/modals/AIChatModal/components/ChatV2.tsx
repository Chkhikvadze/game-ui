import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useContext, useCallback } from 'react'
import moment from 'moment'
// TODO: remove react icons after adding our icons

import { ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'

import {
  API_VERSION_TO_CHAT_MESSAGE_VERSION_MAP,
  useCreateChatMessageService,
  useMessageByGameService,
} from 'services'

import Toast from '@l3-lib/ui-core/dist/Toast'

import SendIconSvg from '../assets/send_icon.svg'

import { StyledOption } from 'components/Spotlight/Spotlight'

import { useSuggestions } from 'components/Spotlight/useSuggestions'
import ChatTypingEffect from 'components/ChatTypingEffect'
import { AuthContext, ToastContext } from 'contexts'

import useUploadFile from 'hooks/useUploadFile'
import UploadedFile from 'components/UploadedFile'
import ChatMessageList from './ChatMessageList'
import UploadButton from 'components/UploadButton'
import { FILE_TYPES } from '../fileTypes'
import Mentions from 'components/Mentions'
import CommandIcon from 'components/Spotlight/CommandIcon'
import { useNavigate } from 'react-router-dom'
import TypingUsers from './TypingUsers'
import { v4 as uuid } from 'uuid'
import useUpdateChatCache from '../hooks/useUpdateChatCache'
import { debounce } from 'lodash'

type ChatV2Props = {
  isPrivate?: boolean
}

const ChatV2 = ({ isPrivate = false }: ChatV2Props) => {
  const isProduction = import.meta.env.REACT_APP_ENV === 'production'

  const navigate = useNavigate()

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [formValue, setFormValue] = useState('')
  const [newMessage, setNewMessage] = useState<string | null>()
  const [chatResponse, setChatResponse] = useState<string | null>()
  const [afterTypingChatResponse, setAfterTypingChatResponse] = useState<string | null>()
  const [typingEffectText, setTypingEffectText] = useState(false)
  const [fileLoading, setFileLoading] = useState(false)
  const { user, account } = useContext(AuthContext)

  const { chatSuggestions } = useSuggestions()

  const { setToast, toast } = useContext(ToastContext)

  const { upsertChatMessageInCache } = useUpdateChatCache()

  const urlParams = new URLSearchParams(window.location.search)

  const gameId = urlParams.get('game')
  const collectionId = urlParams.get('collection')

  const { apiVersions, apiVersion, setAPIVersion, thinking, setThinking, socket } = useChatState()

  const version = API_VERSION_TO_CHAT_MESSAGE_VERSION_MAP[apiVersion]

  const { data: chatMessages, refetch: messageRefetch } = useMessageByGameService({
    gameId: gameId ?? undefined,
    isPrivateChat: isPrivate,
    version,
  })

  const [createMessageService] = useCreateChatMessageService()

  const addMessagesToCache = (prompt: string, message_type: 'human' | 'ai') => {
    // Add message to cache immediately after user sends it. This message will be updated with sockets
    const message = {
      id: uuid(),
      session_id: '',
      thoughts: null,
      version,
      game_id: gameId,
      user_id: user.id,
      account_id: account.id,
      message: {
        data: { content: prompt, example: false, additional_kwargs: {} },
        type: message_type || 'human',
      },
      created_on: moment().add(10, 'seconds').toISOString(), // Fixes local message sorting before waiting for socket
    }

    upsertChatMessageInCache(message, isPrivate)

    return message
  }

  const { uploadFile } = useUploadFile()
  const [uploadedFileObject, setUploadedFileObject] = useState<any | null>(null)

  const handleUploadFile = async (event: any) => {
    setFileLoading(true)
    const { files }: any = event.target

    if (!FILE_TYPES.includes(files[0].type)) {
      setToast({
        message: 'Format is not supported!',
        type: 'negative',
        open: true,
      })

      setFileLoading(false)
    } else {
      const fileObj = {
        fileName: files[0].name,
        type: files[0].type,
        fileSize: files[0].size,
        locationField: 'chat',
        game_id: gameId,
      }

      const fileName = files[0].name

      const res = await uploadFile(fileObj, files)
      setFileLoading(false)

      setUploadedFileObject({ url: res, fileName: fileName })
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(formValue.length, formValue.length)
      }, 1)
    }
  }

  const createMessage = async () => {
    try {
      let message = formValue

      if (uploadedFileObject) {
        message = `${uploadedFileObject.fileName} ${uploadedFileObject.url} ${formValue}`
      }

      const { id: localChatMessageRefId } = addMessagesToCache(message, 'human')

      // if (apiVersion === ApiVersionEnum.L3_Conversational) {
      //   // setNewMessage(message)
      //   addMessagesToCache(message, 'human')
      // }

      // if (
      //   // apiVersion === ApiVersionEnum.L3_PlanAndExecute ||
      //   apiVersion === ApiVersionEnum.L3_PlanAndExecuteWithTools
      // ) {
      //   addMessagesToCache(message, 'human')
      // }

      setThinking(true)
      setFormValue('')
      setUploadedFileObject(null)

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      await createMessageService({
        message,
        gameId: gameId ?? undefined,
        collectionId: collectionId ?? undefined,
        isPrivateChat: isPrivate,
        version,
        localChatMessageRefId, // Used to update the message with socket
      })

      // setChatResponse(res)
      // await messageRefetch()
      // setNewMessage(null)

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

      if (formValue || uploadedFileObject) {
        createMessage()
      }
    }
  }

  useEffect(() => {
    setAPIVersion(ApiVersionEnum.L3_Conversational)
    // createMessage()

    setTimeout(() => {
      setFormValue('')
      inputRef.current?.focus()
    }, 1)
  }, [])

  const handlePickedSuggestion = (value: string) => {
    setFormValue(value)
    setTypingEffectText(true)
  }

  useEffect(() => {
    const versions = [
      ApiVersionEnum.L3_Conversational,
      // ApiVersionEnum.L3_PlanAndExecute,
      ApiVersionEnum.L3_PlanAndExecuteWithTools,
    ]

    if (!versions.includes(apiVersion)) {
      navigate('copilot')
    }
  }, [apiVersion])

  const handleResponse = async () => {
    setAfterTypingChatResponse(chatResponse)
    setChatResponse(null)
    await messageRefetch()
    setNewMessage(null)
    setAfterTypingChatResponse(null)
  }

  const timeoutRef: any = useRef(null)

  useEffect(() => {
    const handleUserTyping = () => {
      socket.sendUserTyping('chat_id')
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        socket.sendUserStopTyping('chat_id')
      }, 2000)
    }

    if (formValue.length > 0) {
      handleUserTyping()
    } else {
      socket.sendUserStopTyping('chat_id')
    }

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [formValue])

  const filteredTypingUsers = socket?.typingUsersData?.filter(
    (data: any) => user.id !== data.userId,
  )

  return (
    <StyledWrapper>
      <StyledMessages>
        <StyledChatWrapper>
          <ChatMessageList
            data={chatMessages}
            newMessage={newMessage}
            thinking={thinking}
            chatResponse={chatResponse}
            afterTypingChatResponse={afterTypingChatResponse}
            handleResponse={handleResponse}
          />
        </StyledChatWrapper>
      </StyledMessages>

      <StyledChatFooter>
        <StyledChatInputWrapper>
          <StyledButtonGroup>
            <StyledSuggestionsContainer>
              {chatSuggestions.map((chatSuggestion: string, index: number) => {
                return (
                  <StyledOption
                    key={index}
                    onClick={() => {
                      handlePickedSuggestion(chatSuggestion)
                    }}
                  >
                    {chatSuggestion}
                  </StyledOption>
                )
              })}
            </StyledSuggestionsContainer>
          </StyledButtonGroup>
          <StyledForm>
            {uploadedFileObject && (
              <StyledFileWrapper>
                <UploadedFile
                  onClick={() => setUploadedFileObject(null)}
                  name={uploadedFileObject.fileName}
                />
              </StyledFileWrapper>
            )}
            <StyledTextareaWrapper>
              {!isProduction && (
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
              )}

              {!isProduction && (
                <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />
              )}

              {typingEffectText ? (
                <StyledInputWrapper secondary>
                  <ChatTypingEffect
                    size='small'
                    value={formValue}
                    callFunction={() => {
                      setTypingEffectText(false)
                      setTimeout(() => {
                        inputRef.current?.focus()
                        inputRef.current?.setSelectionRange(formValue.length, formValue.length)
                      }, 1)
                    }}
                  />
                </StyledInputWrapper>
              ) : (
                // <StyledInput
                //   expanded
                //   ref={inputRef}
                //   value={formValue}
                //   onKeyDown={handleKeyDown}
                //   onChange={e => {
                //     setFormValue(e.target.value)
                //     adjustTextareaHeight()
                //   }}
                //   placeholder='Ask or Generate anything'
                //   rows={1}
                // />
                <StyledInputWrapper>
                  <Mentions
                    inputRef={inputRef}
                    onChange={(e: any) => {
                      setFormValue(e.target.value)
                    }}
                    value={formValue}
                    onKeyDown={handleKeyDown}
                  />
                </StyledInputWrapper>
              )}
              <StyledButton type='submit' disabled={!formValue || thinking}>
                <img src={SendIconSvg} alt='sen' />
              </StyledButton>
              <CommandIcon />
            </StyledTextareaWrapper>
          </StyledForm>
          <StyledChatBottom>
            {/* <button
            onClick={() => {
              console.log('sendUserShare')
              //todo need to replace message_id
              socket.sendUserShare('message_id')
            }}
          >
            Share
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserLikeDislike Like')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_like')
            }}
          >
            Like
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserLikeDislike Dislike')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_dislike')
            }}
          >
            Dislike
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserTyping')
              //todo need to replace chat_id,
              socket.sendUserTyping('chat_id')
            }}
          >
            Send User Typing
          </button> */}

            {/* <button
            onClick={() => {
              console.log('sendUserStopTyping')
              //todo need to replace chat_id,
              socket.sendUserStopTyping('chat_id')
            }}
          >
            Send User stop typing
          </button> */}

            <TypingUsers usersData={filteredTypingUsers} />
          </StyledChatBottom>
        </StyledChatInputWrapper>
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

export default ChatV2

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
  height: calc(100vh - 240px);
  margin-top: 30px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: flex-start;
  padding: 0px 23px 0px 16px;
  /* gap: 12px; */

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
  max-height: 250px;
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
  /* border-radius: 100px;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto; */
  width: 100%;
  /* width: 800px; */
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  height: 100%;
  padding-right: 24px;
  padding-left: 24px;
  /* width: 100%; */
  color: #fff;
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
  position: fixed;
  left: 50%;
  z-index: 100001;
  bottom: -135px;
  transform: translateX(-50%);

  display: flex;
  /* flex-direction: column; */
  justify-content: center;

  width: 100%;
`

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;

  padding: 16px 0;
  width: 100%;
`

const StyledChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  height: 100%;
  margin-top: 20px;
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

const StyledFileWrapper = styled.div`
  display: flex;

  margin-top: 10px;
  margin-left: 270px;
`

const StyledInputWrapper = styled.div<{ secondary?: boolean }>`
  width: 600px;

  padding-bottom: 2px;

  ${p =>
    p.secondary &&
    css`
      padding-left: 2px;
      padding-bottom: 0;
    `};

  @media (max-width: 1200px) {
    width: 400px;
  }
`
const StyledChatInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledChatBottom = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 0 50px;
  width: 100%;
`
