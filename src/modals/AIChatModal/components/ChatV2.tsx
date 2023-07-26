import styled, { css } from 'styled-components'
import { useState, useRef, useEffect, useContext } from 'react'

// TODO: remove react icons after adding our icons

import { ApiVersionEnum } from '../types'
import { useChatState } from '../hooks/useChat'
import CHAT_MESSAGES_GQL from '../../../gql/chat/messageByGame.gql'

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

import { useApolloClient } from '@apollo/client'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import useUploadFile from 'hooks/useUploadFile'
import UploadedFile from 'components/UploadedFile'
import ChatMessageList from './ChatMessageList'
import UploadButton from 'components/UploadButton'
import { FILE_TYPES } from '../fileTypes'
import Mentions from 'components/Mentions'
import CommandIcon from 'components/Spotlight/CommandIcon'
import { useNavigate } from 'react-router-dom'

const ChatV2 = () => {
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

  const urlParams = new URLSearchParams(window.location.search)

  const gameId = urlParams.get('game')
  const collectionId = urlParams.get('collection')

  const { apiVersions, apiVersion, setAPIVersion, thinking, setThinking, socket } = useChatState()

  const version = API_VERSION_TO_CHAT_MESSAGE_VERSION_MAP[apiVersion]

  const { data: chatMessages, refetch: messageRefetch } = useMessageByGameService({
    gameId: gameId ?? undefined,
    version,
  })

  const apolloClient = useApolloClient()

  const [createMessageService] = useCreateChatMessageService()

  const addMessagesToCache = (prompt: string) => {
    const variables = omitBy(
      {
        game_id: gameId ?? undefined,
        version,
      },
      isUndefined,
    )

    const result = apolloClient.readQuery({
      query: CHAT_MESSAGES_GQL,
      variables,
    })

    const messageByGame = result?.messageByGame || []

    const newMessages = messageByGame.map((item: any) => ({ ...item }))

    newMessages.push({
      id: 'new-message',
      thoughts: null,
      version,
      game_id: gameId,
      user_id: user.id,
      account_id: account.id,
      message: {
        data: { content: prompt, example: false, additional_kwargs: {} },
        type: 'human',
      },
      chat_id: null,
      created_on: new Date().toISOString(),
    })

    apolloClient.writeQuery({
      query: CHAT_MESSAGES_GQL,
      variables,
      data: {
        messageByGame: newMessages,
      },
    })
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

      if (apiVersion === ApiVersionEnum.L3_Conversational) {
        setNewMessage(message)
      }

      if (
        // apiVersion === ApiVersionEnum.L3_PlanAndExecute ||
        apiVersion === ApiVersionEnum.L3_PlanAndExecuteWithTools
      ) {
        addMessagesToCache(message)
      }

      setThinking(true)
      setFormValue('')
      setUploadedFileObject(null)

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      const res = await createMessageService({ message, gameId: gameId ?? undefined, version })

      setChatResponse(res)
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

            <UploadButton onChange={handleUploadFile} isLoading={fileLoading} />

            {typingEffectText ? (
              <StyledTypingWrapper>
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
              </StyledTypingWrapper>
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
              <div style={{ width: '600px' }}>
                <Mentions
                  inputRef={inputRef}
                  onChange={(e: any) => {
                    setFormValue(e.target.value)
                  }}
                  value={formValue}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            <StyledButton type='submit' disabled={!formValue || thinking}>
              <img src={SendIconSvg} alt='sen' />
            </StyledButton>
            <CommandIcon />
          </StyledTextareaWrapper>
        </StyledForm>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <button
            onClick={() => {
              console.log('sendUserShare')
              //todo need to replace message_id
              socket.sendUserShare('message_id')
            }}
          >
            Share
          </button>

          <button
            onClick={() => {
              console.log('sendUserLikeDislike Like')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_like')
            }}
          >
            Like
          </button>

          <button
            onClick={() => {
              console.log('sendUserLikeDislike Dislike')
              //todo need to replace message_id
              const message_id = 'message_id'
              socket.sendUserLikeDislike(message_id, 'user_dislike')
            }}
          >
            Dislike
          </button>

          <button
            onClick={() => {
              console.log('sendUserTyping')
              //todo need to replace chat_id,
              socket.sendUserTyping('chat_id')
            }}
          >
            Send User Typing
          </button>

          <button
            onClick={() => {
              console.log('sendUserStopTyping')
              //todo need to replace chat_id,
              socket.sendUserStopTyping('chat_id')
            }}
          >
            Send User stop typing
          </button>
        </div>
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
  height: calc(100vh - 220px);
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const StyledTypingWrapper = styled.div`
  width: 600px;
  padding-left: 2px;
`

const StyledFileWrapper = styled.div`
  display: flex;

  margin-top: 10px;
  margin-left: 270px;
`
