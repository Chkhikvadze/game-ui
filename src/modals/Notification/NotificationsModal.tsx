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
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import NotificationsDateGroup from './NotificationsDateGroup'
import { useNotificationsService } from 'services/useNotificationService'

type NotificationsModalProps = {
  refetchCount: any
}

const NotificationsModal = ({ refetchCount }: NotificationsModalProps) => {
  const { closeModal } = useModal()

  const [activeTab, setActiveTab] = useState(0)
  const [isOpen, setIsOpen] = useState(0)

  const { data: notifications, refetch: refetchNotification } = useNotificationsService({
    search_text: '',
  })

  const todayNotifications: any = []
  const yesterdayNotifications: any = []
  const thisWeekNotifications: any = []

  function isToday(date: Date, currentDate: Date) {
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    )
  }

  function isYesterday(date: Date, currentDate: Date) {
    const yesterday = new Date(currentDate)
    yesterday.setDate(currentDate.getDate() - 1)

    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    )
  }

  function isThisWeek(date: Date, currentDate: Date) {
    const firstDayOfWeek = new Date(currentDate)
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    return date >= firstDayOfWeek
  }

  notifications.forEach((notification: any) => {
    const currentDate = new Date()
    const createdDate = new Date(notification.created_on)

    if (isToday(createdDate, currentDate)) {
      todayNotifications.push(notification)
    } else if (isYesterday(createdDate, currentDate)) {
      yesterdayNotifications.push(notification)
    } else if (isThisWeek(createdDate, currentDate)) {
      thisWeekNotifications.push(notification)
    }
  })

  useEffect(() => {
    refetchNotification()
  }, [])

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
                {todayNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={todayNotifications}
                    refetchCount={refetchCount}
                    title={'Today'}
                    isOpen={isOpen === 1}
                    setIsOpen={() => setIsOpen(1)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
                {yesterdayNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={yesterdayNotifications}
                    refetchCount={refetchCount}
                    title={'Yesterday'}
                    isOpen={isOpen === 2}
                    setIsOpen={() => setIsOpen(2)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
                {thisWeekNotifications.length > 0 && (
                  <NotificationsDateGroup
                    notifications={thisWeekNotifications}
                    refetchCount={refetchCount}
                    title={'This Week'}
                    isOpen={isOpen === 3}
                    setIsOpen={() => setIsOpen(3)}
                    onClose={() => setIsOpen(0)}
                  />
                )}
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
