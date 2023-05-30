import styled from 'styled-components'
import SearchIcon from '@l3-lib/ui-core/dist/icons/SearchOutline'
import Toggle from '@l3-lib/ui-core/dist/Toggle'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import defaultAvatar from 'assets/images/defaultAvatar.png'
import { useModal } from 'hooks'
import { useState } from 'react'
import { useUnreadNotificationsCountService } from 'services/useNotificationService'
import NotificationsModal from 'modals/Notification/NotificationsModal'

const Spotlight = () => {
  const { openModal } = useModal()
  const [show_banner, set_show_banner] = useState(true)

  const onHandleChangeTestMode = () => {
    set_show_banner(true)
    openModal({ name: 'contact-info-modal' })
  }

  const { data: notificationsCount, refetch: refetchCount } = useUnreadNotificationsCountService()

  return (
    <>
      <StyledWrapper>
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
          <StyledNotificationContainer onClick={() => openModal({ name: 'notifications-modal' })}>
            <StyledColumnContainer>
              <Avatar
                size={Avatar.sizes.SMALL}
                src={defaultAvatar}
                type={Avatar.types.IMG}
                rectangle
                className='notification_avatar'
              />
              <StyledTypography style={{ fontWeight: 700 }}>{notificationsCount}</StyledTypography>
            </StyledColumnContainer>
          </StyledNotificationContainer>
        </StyledInnerContainer>
      </StyledWrapper>
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
