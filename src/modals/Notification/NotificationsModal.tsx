import FullScreenModal from 'components/FullScreenModal'
import withRenderModal from 'hocs/withRenderModal'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import { useModal } from 'hooks'
import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { game_default_image } from 'pages/Game/Games/Games'
import {
  useNotificationsService,
  useUpdateNotificationService,
} from 'services/useNotificationService'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

type NotificationProps = {
  onClick: () => void
  image: string
  name: string
  create_date: Date
  typename: string
  read: boolean
}

const NotificationsModal = () => {
  const { closeModal } = useModal()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(0)

  const { data: notifications } = useNotificationsService({
    search_text: '',
  })

  const [showOne, setShowOne] = useState(true)
  const [marked, setMarked] = useState(false)

  const [limitedNotifications, setLimitedNotifications] = useState(notifications?.slice(0, 1))

  const [updateNotificationById] = useUpdateNotificationService()

  useEffect(() => {
    if (notifications) {
      if (showOne) {
        setLimitedNotifications(notifications?.slice(0, 1))
      } else {
        setLimitedNotifications(notifications)
      }
    }
  }, [showOne, notifications])

  async function updateNotifications(notifications: any) {
    setMarked(true)
    for (const notification of notifications) {
      if (notification.read === true) {
        // Skip update for notifications already marked as read
        continue
      }
      await updateNotificationById(notification.id, { read: true })
    }
  }

  const activeNotification = notifications?.filter(
    (notification: any) => notification.read !== true,
  )
  const activeNotificationCount = activeNotification?.length

  const Notification = ({
    onClick,
    image,
    name,
    create_date,
    typename,
    read,
  }: NotificationProps) => {
    return (
      <StyledNotification showOne={showOne} className='stack' onClick={onClick}>
        {!read && !marked && <StyledReadDot />}
        {showOne && activeNotificationCount > 0 && <StyledReadDot />}
        <StyledImg src={image} />

        <StyledTextWrapper>
          <StyledText>
            <Typography
              value={name}
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
            <Typography
              value='was created'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledText>

          <StyledText>
            <Typography
              value={moment(create_date).fromNow()}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
            <StyledDot />
            <Typography
              value={typename}
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
              customColor={'rgba(255, 255, 255, 0.6)'}
            />
          </StyledText>
        </StyledTextWrapper>
      </StyledNotification>
    )
  }

  return (
    <FullScreenModal>
      <StyledRoot>
        <StyledCloseButton>
          <IconButton
            kind={IconButton.kinds.TERTIARY}
            leftIcon={() => <Close />}
            size={IconButton.sizes.LARGE}
            onClick={() => closeModal('notifications-modal')}
          />
        </StyledCloseButton>

        <StyledNotificationsContainer>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>All</Tab>
            <Tab onClick={() => setActiveTab(1)}>Errors</Tab>
          </TabList>

          <TabsContext activeTabId={activeTab}>
            <TabPanels>
              <TabPanel>
                <StyledNotificationGroup
                  showOne={showOne}
                  onClick={() => {
                    if (showOne) {
                      setShowOne(false)
                    }
                  }}
                >
                  <StyledNotificationGroupHeader>
                    <Typography
                      value={'Today'}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.sm}
                      customColor={'#FFF'}
                    />
                    {!showOne && (
                      <StyledHeaderButtonWrapper>
                        <Button
                          kind={Button.kinds.PRIMARY}
                          size={IconButton.sizes.SMALL}
                          onClick={() => updateNotifications(notifications)}
                          disabled={activeNotificationCount === 0 || marked}
                        >
                          Mark as read
                        </Button>
                        <IconButton
                          kind={IconButton.kinds.TERTIARY}
                          leftIcon={() => <Close />}
                          size={IconButton.sizes.XS}
                          onClick={() => setShowOne(true)}
                        />
                      </StyledHeaderButtonWrapper>
                    )}
                  </StyledNotificationGroupHeader>

                  <StyledNotificationList>
                    {limitedNotifications?.map((notification: any) => {
                      const { type } = notification

                      if (type === 'COLLECTION_CREATED')
                        return (
                          <Notification
                            onClick={() => {
                              if (!showOne) {
                                closeModal('notifications-modal')
                                navigate(`/collection/${notification.collection_id}/general`)
                                updateNotificationById(notification.id, { read: true })
                              }
                            }}
                            image={notification.collection.main_media || game_default_image}
                            name={notification.collection.name}
                            create_date={notification.created_on}
                            typename={notification.collection.__typename}
                            read={notification.read}
                          />
                        )

                      if (type === 'GAME_CREATED')
                        return (
                          <Notification
                            onClick={() => {
                              if (!showOne) {
                                closeModal('notifications-modal')
                                navigate(`/game/${notification.game_id}/general`)
                                updateNotificationById(notification.id, { read: true })
                              }
                            }}
                            image={notification.game.main_media || game_default_image}
                            name={notification.game.name}
                            create_date={notification.created_on}
                            typename={notification.game.__typename}
                            read={notification.read}
                          />
                        )
                    })}
                  </StyledNotificationList>
                  {showOne && notifications?.length > 0 && (
                    <>
                      <StyledStack className='stack1' />
                      <StyledStack secondary className='stack2' />
                    </>
                  )}
                </StyledNotificationGroup>
              </TabPanel>

              <TabPanel>error</TabPanel>
            </TabPanels>
          </TabsContext>
        </StyledNotificationsContainer>
      </StyledRoot>
    </FullScreenModal>
  )
}

export default withRenderModal('notifications-modal')(NotificationsModal)

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  justify-content: center;
`
const StyledCloseButton = styled.div`
  position: absolute;
  top: 42px;
  right: 42px;
`
const StyledNotificationsContainer = styled.div`
  height: 100vh;
  min-width: 460px;
  width: 460px;
  padding-top: 96px;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledNotificationGroup = styled.div<{ showOne: boolean }>`
  width: 100%;

  margin-top: 40px;

  display: flex;
  align-items: center;
  flex-direction: column;

  ${props =>
    props.showOne &&
    css`
      cursor: pointer;

      &:hover {
        transition: 0.3s ease background;
        .stack {
          background: rgba(255, 255, 255, 0.4);
        }
        .stack1 {
          background: rgba(255, 255, 255, 0.3);
        }
        .stack2 {
          background: rgba(255, 255, 255, 0.2);
        }
      }
    `}
`

const StyledNotificationGroupHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledNotificationList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  max-height: 50vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledNotification = styled.div<{ showOne: boolean }>`
  display: flex;

  align-items: flex-start;
  padding: 0px;
  gap: 12px;

  width: 452px;
  height: 78px;

  background: rgba(255, 255, 255, 0.1);
  /* Blur/cake */

  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 16px;

  ${props =>
    props.showOne &&
    css`
      background: rgba(255, 255, 255, 0.3);
    `}

  ${props =>
    !props.showOne &&
    css`
      transition: 0.3s ease background;
      &:hover {
        background: rgba(255, 255, 255, 0.4);
        cursor: pointer;
      }
    `}
`
const StyledImg = styled.img`
  width: 60px;
  height: 78px;

  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.25));
  border-radius: 16px 0px 16px 16px;

  object-fit: cover;
`
const StyledText = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const StyledTextWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
`
const StyledDot = styled.div`
  width: 4px;
  height: 4px;

  /* Content ++/on color secondary */

  background: rgba(255, 255, 255, 0.8);

  border-radius: 100px;
`
const StyledStack = styled.div<{ secondary?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;

  width: 430px;
  height: 12px;

  background: rgba(255, 255, 255, 0.2);

  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);

  border-radius: 0px 0px 10px 10px;

  ${props =>
    props.secondary &&
    css`
      width: 410px;
      background: rgba(255, 255, 255, 0.1);
    `}
`
const StyledReadDot = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  right: 8px;
  top: calc(50% - 8px / 2);

  border-radius: 100px;
  background: linear-gradient(180deg, #eea03c 0%, #e85c29 100%);
`
const StyledHeaderButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
