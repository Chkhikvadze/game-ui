import { useContext, useEffect, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

import { useModal } from 'hooks'
import NotificationsModal from 'modals/Notification/NotificationsModal'
import { useUnreadNotificationsCountService } from 'services/useNotificationService'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Notifications from '@l3-lib/ui-core/dist/icons/Notifications'

import pluginsIcon from './assets/plugins.png'
import SendIconSvg from '../../modals/AIChatModal/assets/send_icon.svg'
import SpotlightPlugins from './SpotlightPlugins'
import ChatLoader from './ChatLoader'
import {
  ChatMessageVersionEnum,
  useCreateChatMessageService,
  useMessageByGameService,
} from 'services'

import { useSuggestions } from './useSuggestions'
import { useNavigate, useParams } from 'react-router-dom'
import ChatTypingEffect from 'components/ChatTypingEffect'
import { ToastContext } from 'contexts'
import Mentions from 'components/Mentions'
import CommandIcon from './CommandIcon'

const Spotlight = () => {
  const { openModal } = useModal()
  const navigate = useNavigate()

  const { setToast } = useContext(ToastContext)

  const [show_banner, set_show_banner] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [showPlugins, setShowPlugins] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [typingEffectText, setTypingEffectText] = useState(false)

  const [formValue, setFormValue] = useState('')

  const { chatSuggestions } = useSuggestions()

  const { gameId, collectionId } = useParams()

  let route = '/copilot'

  if (collectionId) {
    route = `/copilot?game=${gameId}&collection=${collectionId}`
  } else if (gameId) {
    route = `/copilot?game=${gameId}`
  }

  const onHandleChangeTestMode = () => {
    set_show_banner(true)
    openModal({ name: 'contact-info-modal' })
  }

  const { data: notificationsCount, refetch: refetchCount } = useUnreadNotificationsCountService()

  const { refetch: messageRefetch } = useMessageByGameService({
    gameId,
    version: ChatMessageVersionEnum.ChatConversational,
  })

  // Prefetch messages
  useMessageByGameService({ gameId, version: ChatMessageVersionEnum.PlanAndExecute })
  useMessageByGameService({ gameId, version: ChatMessageVersionEnum.PlanAndExecuteWithTools })

  const inputRef = useRef(null as any)
  const outsideClickRef = useRef(null as any)

  const handleChatClick = () => {
    setExpanded(true)
    setShowSuggestion(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 1)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (outsideClickRef.current && !outsideClickRef.current.contains(event.target) && expanded) {
        setExpanded(false)
        setShowPlugins(false)
        setShowSuggestion(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [outsideClickRef, expanded])

  const [createMessageService] = useCreateChatMessageService()

  const handleSendMessage = async () => {
    try {
      setChatLoading(true)

      setTimeout(() => {
        setExpanded(false)
        setShowSuggestion(false)
      }, 1)

      if (typingEffectText) {
        setTypingEffectText(false)
      }

      await createMessageService({
        message: formValue,
        gameId,
        version: ChatMessageVersionEnum.ChatConversational,
      })
      await messageRefetch()
      navigate(route, { state: { text: formValue } })
      setChatLoading(false)
      setFormValue('')
    } catch (e) {
      setToast({
        message: 'Something went wrong',
        type: 'negative',
        open: true,
      })
      setChatLoading(false)
      setFormValue('')
    }
  }

  const postHandler = async () => {
    if (formValue.length !== 0) {
      handleSendMessage()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // 👇 Get input value
      e.preventDefault()
      postHandler()
    }
  }

  const handlePickedSuggestion = (value: string) => {
    setShowSuggestion(false)
    setFormValue(value)
    setTypingEffectText(true)
  }

  return (
    <>
      <div ref={outsideClickRef}>
        <StyledPluginsContainer showPlugins={showPlugins}>
          <SpotlightPlugins />
        </StyledPluginsContainer>

        <StyledChatOptionsContainer expanded={showSuggestion}>
          <StyledRow>
            {chatSuggestions.slice(0, 2).map((chatSuggestion: string) => {
              return (
                <StyledOption
                  key={chatSuggestion}
                  onClick={() => {
                    handlePickedSuggestion(chatSuggestion)
                  }}
                >
                  {chatSuggestion}
                </StyledOption>
              )
            })}
          </StyledRow>
          <StyledRow>
            {chatSuggestions.slice(-3).map((chatSuggestion: string) => {
              return (
                <StyledOption
                  key={chatSuggestion}
                  onClick={() => {
                    handlePickedSuggestion(chatSuggestion)
                  }}
                >
                  {chatSuggestion}
                </StyledOption>
              )
            })}
          </StyledRow>
        </StyledChatOptionsContainer>

        <StyledFooterChat expanded={expanded} onClick={handleChatClick} className='blur'>
          {chatLoading ? (
            <>
              <ChatLoader />
              <Typography
                value={'Thinking...'}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor={'rgba(255, 255, 255, 0.4)'}
              />
            </>
          ) : (
            <>
              <StyledIcon
                src={pluginsIcon}
                active={showPlugins}
                onClick={() => setShowPlugins(!showPlugins)}
              />
              <StyledInputWrapper>
                {!expanded && (
                  <Typography
                    value={'Ask or Generate anything'}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.sm}
                    customColor={'rgba(255, 255, 255, 0.4)'}
                  />
                )}
                {
                  <>
                    {typingEffectText ? (
                      <StyledTypewriterWrapper>
                        <ChatTypingEffect
                          size='small'
                          value={formValue}
                          callFunction={() => {
                            setTypingEffectText(false)
                            setTimeout(() => {
                              inputRef.current?.focus()
                              inputRef.current?.setSelectionRange(
                                formValue.length,
                                formValue.length,
                              )
                            }, 1)
                          }}
                        />
                      </StyledTypewriterWrapper>
                    ) : (
                      <StyledInputCover expanded={expanded}>
                        <Mentions
                          inputRef={inputRef}
                          onChange={(e: any) => {
                            setFormValue(e.target.value)
                          }}
                          value={formValue}
                          onKeyDown={handleKeyDown}
                        />
                      </StyledInputCover>

                      // <StyledInput
                      //
                      //   ref={inputRef}
                      //   onChange={e => {
                      //     setFormValue(e.target.value)
                      //     adjustTextareaHeight()
                      //   }}
                      //   value={formValue}
                      //   onKeyDown={handleKeyDown}
                      //   rows={1}
                      // />
                    )}
                  </>
                }
              </StyledInputWrapper>
              {!expanded ? (
                <CommandIcon />
              ) : (
                <StyledRightIcon
                  onClick={postHandler}
                  disabled={formValue.length === 0 || typingEffectText}
                >
                  <img src={SendIconSvg} alt='sen' />
                </StyledRightIcon>
              )}
            </>
          )}
        </StyledFooterChat>
      </div>

      {/* <StyledWrapper>
        <StyledInnerContainer>
          <StyledColumnContainer onClick={() => openModal({ name: 'spotlight-modal' })}>
            <SearchIcon size='30' />
            <StyledTypography>Spotlight</StyledTypography>
          </StyledColumnContainer>
          <StyledColumnContainer gap='6'>
            <Toggle
              kind='tertiary'
              isDefaultSelected={show_banner}
              size='small'
              onChange={onHandleChangeTestMode}
              isSelected={show_banner}
            />
            <StyledTypography>Test Mode</StyledTypography>
          </StyledColumnContainer>
          <StyledNotificationContainer onClick={() => openModal({ name: 'ai-chat-modal' })}>
            <StyledColumnContainer>
              <Avatar
                size={Avatar.sizes.SMALL}
                src={defaultAvatar}
                type={Avatar.types.IMG}
                rectangle
                className='notification_avatar'
              />
              <StyledTypography style={{ fontWeight: 700 }}></StyledTypography>
            </StyledColumnContainer>
          </StyledNotificationContainer>
        </StyledInnerContainer>
      </StyledWrapper> */}

      <StyledNotificationsButtonWrapper>
        <Button
          kind={Button.kinds.TERTIARY}
          onClick={() => openModal({ name: 'notifications-modal' })}
        >
          <StyledNotificationLabelWrapper>
            <Notifications size='20' />
            {notificationsCount}
          </StyledNotificationLabelWrapper>
        </Button>
      </StyledNotificationsButtonWrapper>
      {/* {show_banner && <StyledBanner>TEST DATA</StyledBanner>} */}
      {/* <StyledBanner>test mode</StyledBanner> */}
      <NotificationsModal refetchCount={refetchCount} />
    </>
  )
}

export default Spotlight

const StyledWrapper = styled.div`
  padding: 12px 12px 12px 21px;
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 3px 30px rgba(0, 0, 0, 0.3), 0px 3px 10px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(96.6443px);
  border-radius: 100px;
  // position: fixed;
  // left: 50%;
  bottom: 24px;
  // transform: translateX(-50%);
`

const StyledTypography = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
`

const StyledColumnContainer = styled.div<{ gap?: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: ${p => (p.gap ? p.gap : '15')}px;
  .polygon_none {
    margin-top: -2px;
  }
`

const StyledInnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const StyledNotificationContainer = styled.div`
  padding: 3px;
  background: linear-gradient(180deg, #eea03c 0%, #e85c29 100%);
  border-radius: 50px;
  min-width: 67px;
`

const StyledBanner = styled.div`
  padding: 2px 0 1px;
  background: var(--color-gradient-orange);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
`
const StyledFooterChat = styled.div<{ expanded: boolean }>`
  position: fixed;
  left: 50%;
  z-index: 120;
  bottom: 10px;
  transform: translateX(-50%);

  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 0px 23px 0px 16px;
  gap: 12px;

  min-width: 320px;
  width: 320px;
  height: 48px;

  background: rgba(0, 0, 0, 0.1);
  /* Style */

  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);

  backdrop-filter: blur(100px);

  /* Note: backdrop-filter has minimal browser support */

  border-radius: 100px;

  /* cursor: pointer; */

  ${props =>
    props.expanded &&
    css`
      width: fit-content;
      min-height: 48px;
      height: fit-content;
      max-height: 150px;
    `}
`
const StyledIcon = styled.img<{ active?: boolean }>`
  ${props =>
    !props.active &&
    css`
      opacity: 0.4;
    `}
`
export const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`
const StyledRightIcon = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  margin-left: auto;

  width: fit-content;

  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`
export const StyledInput = styled.textarea<{ expanded: boolean }>`
  display: none;

  width: 600px;
  max-height: 100px;
  background-color: transparent;
  border: none;

  margin: 5px 0px;

  resize: none;

  &:focus-visible {
    outline: none;
  }

  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  ${props =>
    props.expanded &&
    css`
      display: block;
    `}
`
const StyledInputCover = styled.div<{ expanded: boolean }>`
  display: none;
  width: 600px;

  ${props =>
    props.expanded &&
    css`
      display: block;
    `}
`

const StyledChatOptionsContainer = styled.div<{ expanded: boolean }>`
  display: none;
  ${props =>
    props.expanded &&
    css`
      position: fixed;
      bottom: 70px;

      left: 50%;
      transform: translateX(-50%);

      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 100;
    `}
`
export const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  gap: 10px;

  min-width: 400px;
  width: fit-content;
  height: 36px;

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(100px);
  border-radius: 60px;

  color: rgba(255, 255, 255, 0.8);
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;

  :hover {
    background: rgba(0, 0, 0, 0.3);
  }
`
const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-align: center;
`
const StyledNotificationsButtonWrapper = styled.div`
  position: fixed;
  right: 50px;
  bottom: 24px;
`
const StyledNotificationLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledPluginsContainer = styled.div<{ showPlugins: boolean }>`
  display: none;

  ${props =>
    props.showPlugins &&
    css`
      display: block;
      position: fixed;
      left: 50%;
      bottom: 70px;
      transform: translateX(-50%);

      z-index: 101;
    `}
`
const StyledTypewriterWrapper = styled.div`
  width: 600px;
  padding-left: 2px;
`
