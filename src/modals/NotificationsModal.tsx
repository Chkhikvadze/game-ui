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
import { useNotificationsService } from 'services/useNotificationService'
import moment from 'moment'

const NotificationsModal = () => {
  const { closeModal } = useModal()
  const [activeTab, setActiveTab] = useState(0)

  const { data: notifications } = useNotificationsService({ search_text: '' })

  const [showOne, setShowOne] = useState(true)
  const [limitedNotifications, setLimitedNotifications] = useState(notifications?.slice(0, 1))

  useEffect(() => {
    if (notifications) {
      if (showOne) {
        setLimitedNotifications(notifications?.slice(0, 1))
      } else {
        setLimitedNotifications(notifications)
      }
    }
  }, [showOne, notifications])

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
                          onClick={() => setShowOne(true)}
                        >
                          Show Less
                        </Button>
                        <IconButton
                          kind={IconButton.kinds.TERTIARY}
                          leftIcon={() => <Close />}
                          size={IconButton.sizes.XS}
                        />
                      </StyledHeaderButtonWrapper>
                    )}
                  </StyledNotificationGroupHeader>

                  {limitedNotifications?.map((notification: any, index: number) => {
                    return (
                      <StyledNotification key={index} showOne={showOne} className='stack'>
                        <StyledReadDot />
                        <StyledImg src={notification.game.main_media || game_default_image} />

                        <StyledTextWrapper>
                          <StyledText>
                            <Typography
                              value={notification.game.name}
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
                              value={moment(notification.game.created_on).fromNow()}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'rgba(255, 255, 255, 0.6)'}
                            />
                            <StyledDot />
                            <Typography
                              value={notification.game.__typename}
                              type={Typography.types.LABEL}
                              size={Typography.sizes.xss}
                              customColor={'rgba(255, 255, 255, 0.6)'}
                            />
                          </StyledText>
                        </StyledTextWrapper>
                      </StyledNotification>
                    )
                  })}
                  {showOne && (
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
  overflow: hidden;
  margin-top: 40px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8px;

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
  margin-top: -8px;

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
