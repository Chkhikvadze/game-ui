import { useEffect, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

import { useModal } from 'hooks'
import NotificationsModal from 'modals/Notification/NotificationsModal'
import { useUnreadNotificationsCountService } from 'services/useNotificationService'

import defaultAvatar from 'assets/images/defaultAvatar.png'

import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Button from '@l3-lib/ui-core/dist/Button'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Loader from '@l3-lib/ui-core/dist/Loader'

import SearchIcon from '@l3-lib/ui-core/dist/icons/SearchOutline'
import Notifications from '@l3-lib/ui-core/dist/icons/Notifications'

import pluginsIcon from './assets/plugins.png'
import commandIcon from './assets/command.png'
import lIcon from './assets/L.png'
import SendIconSvg from '../../modals/AIChatModal/assets/send_icon.svg'
import SpotlightPlugins from './SpotlightPlugins'

const Spotlight = () => {
  const { openModal } = useModal()
  const [show_banner, set_show_banner] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [showPlugins, setShowPlugins] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)

  const [formValue, setFormValue] = useState('')

  const onHandleChangeTestMode = () => {
    set_show_banner(true)
    openModal({ name: 'contact-info-modal' })
  }

  const { data: notificationsCount, refetch: refetchCount } = useUnreadNotificationsCountService()

  const inputRef = useRef(null as any)
  const outsideClickRef = useRef(null as any)

  const handleChatClick = () => {
    setExpanded(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 1)
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (outsideClickRef.current && !outsideClickRef.current.contains(event.target) && expanded) {
        setExpanded(false)
        setShowPlugins(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [outsideClickRef, expanded])

  const handleSendMessage = () => {
    setChatLoading(true)

    setTimeout(() => {
      setExpanded(false)
    }, 1)

    setTimeout(() => {
      setChatLoading(false)

      openModal({ name: 'ai-chat-modal', data: { text: formValue } })
      setFormValue('')
    }, 1500)
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

  return (
    <>
      <div ref={outsideClickRef}>
        <StyledPluginsContainer showPlugins={showPlugins}>
          <SpotlightPlugins />
        </StyledPluginsContainer>

        <StyledChatOptionsContainer expanded={expanded}>
          <StyledRow>
            <StyledOption>Option 1</StyledOption>
            <StyledOption>Option 2</StyledOption>
          </StyledRow>
          <StyledRow>
            <StyledOption>Option 3</StyledOption>
            <StyledOption>Option 4</StyledOption>
            <StyledOption>Option 5</StyledOption>
          </StyledRow>
        </StyledChatOptionsContainer>

        <StyledFooterChat expanded={expanded} onClick={handleChatClick} className='blur'>
          {chatLoading ? (
            <>
              <Loader size={Loader.sizes.XS} />
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
                <Typography
                  value={'Ask or Generate anything'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor={'rgba(255, 255, 255, 0.4)'}
                />
                {
                  <StyledInput
                    expanded={expanded}
                    ref={inputRef}
                    onChange={e => setFormValue(e.target.value)}
                    value={formValue}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                }
              </StyledInputWrapper>
              {!expanded ? (
                <StyledRightIcon>
                  <StyledIcon src={commandIcon} />
                  <StyledIcon src={lIcon} />
                </StyledRightIcon>
              ) : (
                <StyledRightIcon onClick={postHandler} disabled={formValue.length === 0}>
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
      {show_banner && <StyledBanner>TEST DATA</StyledBanner>}
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
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
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
  /* bottom: 100px; */
  bottom: 24px;
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
      width: 800px;
    `}
`
const StyledIcon = styled.img<{ active?: boolean }>`
  cursor: pointer;
  ${props =>
    !props.active &&
    css`
      opacity: 0.4;
    `}
`
const StyledInputWrapper = styled.div`
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

  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      pointer-events: none;
    `}
`
const StyledInput = styled.textarea<{ expanded: boolean }>`
  display: none;

  background-color: transparent;
  border: none;

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
const StyledChatOptionsContainer = styled.div<{ expanded: boolean }>`
  display: none;
  ${props =>
    props.expanded &&
    css`
      position: fixed;
      bottom: 90px;

      left: 50%;
      transform: translateX(-50%);

      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 100;
    `}
`
const StyledOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 14px;
  gap: 10px;

  width: 182px;
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
      bottom: 90px;
      transform: translateX(-50%);

      z-index: 101;
    `}
`
