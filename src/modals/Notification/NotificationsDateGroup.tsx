import styled, { css } from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import { useEffect, useState } from 'react'
import NotificationItem from './NotificationItem'
import { game_default_image } from 'pages/Game/Games/Games'
import { useModal } from 'hooks'
import { useNavigate } from 'react-router-dom'
import { useUpdateNotificationService } from 'services/useNotificationService'

import { CollectionDescription } from './NotificationDescriptions/CollectionDescription'
import { GameDescription } from './NotificationDescriptions/GameDescription'
import { UpdateMetadataDescription } from './NotificationDescriptions/UpdateMetadataDescription'
import { IsUpdatingMetadataDescription } from './NotificationDescriptions/IsUpdatingMetadataDescription'
import { MetadataUpdatedDescription } from './NotificationDescriptions/MetadataUpdatedDescription'
import { SizeNotEqualDescription } from './NotificationDescriptions/SizeNotEqualDescription'

type NotificationsDateGroupProps = {
  notifications: any
  title: string
  refetchCount: any

  isOpen: boolean
  setIsOpen: () => void
  onClose: () => void
}

const NotificationsDateGroup = ({
  notifications,
  title,
  refetchCount,
  isOpen,
  setIsOpen,
  onClose,
}: NotificationsDateGroupProps) => {
  const { closeModal } = useModal()
  const navigate = useNavigate()

  const [updateNotificationById] = useUpdateNotificationService()

  const [marked, setMarked] = useState(false)

  const [limitedNotifications, setLimitedNotifications] = useState(notifications?.slice(0, 1))

  useEffect(() => {
    if (notifications) {
      if (!isOpen) {
        setLimitedNotifications(notifications?.slice(0, 1))
      } else {
        setLimitedNotifications(notifications)
      }
    }
  }, [isOpen, notifications])

  const activeNotification = notifications?.filter(
    (notification: any) => notification.read !== true,
  )
  const activeNotificationCount = activeNotification?.length

  async function updateNotifications(notifications: any) {
    setMarked(true)
    for (const notification of notifications) {
      if (notification.read) {
        continue
      }
      await updateNotificationById(notification.id, { read: true })
    }
    refetchCount()
  }

  const handleClick = async (id: string, navigationRoute: string) => {
    closeModal('notifications-modal')
    navigate(navigationRoute)
    await updateNotificationById(id, { read: true })
    refetchCount()
  }

  const NotificationList = () => {
    return (
      <StyledNotificationList>
        {limitedNotifications?.map((notification: any) => {
          const { type } = notification

          if (type === 'COLLECTION_CREATED')
            return (
              <NotificationItem
                onClick={async () => {
                  if (isOpen) {
                    handleClick(
                      notification.id,
                      `/collection/${notification.collection_id}/general`,
                    )
                  }
                }}
                image={notification.collection.main_media || game_default_image}
                create_date={notification.created_on}
                typename={notification.collection.__typename}
                showOne={!isOpen}
                unread={
                  !isOpen ? !isOpen && activeNotificationCount > 0 : !notification.read && !marked
                }
                description={
                  <CollectionDescription
                    collectionName={notification.collection.name}
                    gameName={notification.game.name}
                  />
                }
              />
            )

          if (type === 'GAME_CREATED')
            return (
              <NotificationItem
                onClick={async () => {
                  if (isOpen) {
                    handleClick(notification.id, `/game/${notification.game_id}/general`)
                  }
                }}
                image={notification.game.main_media || game_default_image}
                create_date={notification.created_on}
                typename={notification.game.__typename}
                showOne={!isOpen}
                unread={
                  !isOpen
                    ? !isOpen && !marked && activeNotificationCount > 0
                    : !notification.read && !marked
                }
                description={
                  <GameDescription
                    gameName={notification.game.name}
                    userId={notification.created_by}
                  />
                }
              />
            )

          if (
            type === 'METADATA_UPDATE_REQUIRED' ||
            type === 'METADATA_UPDATING' ||
            type === 'METADATA_UPDATED' ||
            type === 'COLLECTION_AND_CONTRACT_SIZE_NOT_EQUAL'
          )
            return (
              <NotificationItem
                onClick={async () => {
                  if (isOpen) {
                    handleClick(
                      notification.id,
                      `/collection/${notification.collection_id}/general`,
                    )
                  }
                }}
                image={notification.collection.main_media || game_default_image}
                create_date={notification.created_on}
                typename={'Metadata'}
                showOne={!isOpen}
                unread={
                  !isOpen
                    ? !isOpen && !marked && activeNotificationCount > 0
                    : !notification.read && !marked
                }
                description={
                  <>
                    {type === 'METADATA_UPDATE_REQUIRED' && (
                      <UpdateMetadataDescription collectionName={notification.collection.name} />
                    )}
                    {type === 'METADATA_UPDATING' && (
                      <IsUpdatingMetadataDescription
                        collectionName={notification.collection.name}
                      />
                    )}
                    {type === 'METADATA_UPDATED' && (
                      <MetadataUpdatedDescription collectionName={notification.collection.name} />
                    )}
                    {type === 'COLLECTION_AND_CONTRACT_SIZE_NOT_EQUAL' && (
                      <SizeNotEqualDescription collectionName={notification.collection.name} />
                    )}
                  </>
                }
              />
            )
        })}
      </StyledNotificationList>
    )
  }

  return (
    <StyledNotificationGroup
      showOne={!isOpen}
      onClick={() => {
        if (!isOpen) {
          setIsOpen()
        }
      }}
    >
      <StyledNotificationGroupHeader>
        <Typography
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'#FFF'}
        />
        {isOpen && (
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
              onClick={() => onClose()}
            />
          </StyledHeaderButtonWrapper>
        )}
      </StyledNotificationGroupHeader>

      <NotificationList />
      {!isOpen && notifications?.length > 0 && (
        <>
          <StyledStack className='stack1' />
          <StyledStack secondary className='stack2' />
        </>
      )}
    </StyledNotificationGroup>
  )
}

export default NotificationsDateGroup

const StyledNotificationGroup = styled.div<{ showOne: boolean }>`
  width: 100%;

  margin-top: 32px;

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

const StyledHeaderButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledNotificationList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

  max-height: 28vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
