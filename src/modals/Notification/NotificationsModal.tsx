import FullScreenModal from 'components/FullScreenModal'
import withRenderModal from 'hocs/withRenderModal'

import Search from '@l3-lib/ui-core/dist/Search'
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
import { useState } from 'react'

import NotificationsDateGroup from './NotificationsDateGroup'
import { useNotificationsByDateService } from 'services/useNotificationService'

type NotificationsModalProps = {
  refetchCount: any
}

const NotificationsModal = ({ refetchCount }: NotificationsModalProps) => {
  const { closeModal } = useModal()

  const [activeTab, setActiveTab] = useState(0)
  const [isOpen, setIsOpen] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const { data: todayNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'today',
    page: 1,
    limit: 10,
  })
  const { data: yesterdayNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'yesterday',
    page: 1,
    limit: 10,
  })
  const { data: thisWeekNotifications } = useNotificationsByDateService({
    search_text: searchValue,
    date: 'thisWeek',
    page: 1,
    limit: 10,
  })

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
                <StyledSearchWrapper>
                  <StyledSearch
                    placeholder='Search by games, collections or anything'
                    onChange={(e: any) => setTimeout(() => setSearchValue(e.target.value), 1000)}
                  />
                </StyledSearchWrapper>
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
const StyledSearchWrapper = styled.div`
  margin-top: 16px;
  /* margin-bottom: -20px; */
`
const StyledSearch = styled.input`
  background: rgba(0, 0, 0, 0.7);
  border-radius: 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;

  width: 452px;
  height: 52px;

  border: none;

  color: #fff;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  &:focus-visible {
    outline: none;
  }
`
