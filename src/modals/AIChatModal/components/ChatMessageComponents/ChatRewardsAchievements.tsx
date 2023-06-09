import React, { useEffect, useMemo, useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IAchievement, IChatMessage, ICollection, IReward } from 'modals/AIChatModal/types'
import AiTable from '../AiTable/AiTable'
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import styled from 'styled-components'
import BgImage from 'assets/backgrounds/collection_bg.jpg'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import MarkedIconSvg from '../../assets/mark_icon.svg'
import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'
import AssetResourceCard from '../AssetResourceCard'

type ChatRewardsAchievementsProps = {
  message: IChatMessage
}

const renderFields = (fields?: any[], fieldType?: string) => {
  return (
    <>
      <>{fields && <AiTable data={fields} />}</>
      <>{!fields && <span>no items </span>}</>
    </>
  )
}

const MainCard = ({ onHandleClickCardChange, collection, isActive, ariaSelected }: any) => {
  return (
    <StyledCardTabContainer
      onClick={() => onHandleClickCardChange(collection)}
      isActive={isActive}
      aria-selected={ariaSelected && isActive}
    >
      <StyledCardTabContainerStatus isActive={isActive}>
        <span>collection 1</span>
      </StyledCardTabContainerStatus>
      <p>{collection.name}</p>
    </StyledCardTabContainer>
  )
}

const ChatRewardsAchievements: React.FC<ChatRewardsAchievementsProps> = ({ message }) => {
  const { rewards, achievements } = message

  // console.log('🚀 ~ collections:', collections)

  // const names = collections?.map((item: any) => ({ id: item.id, name: item.name }))
  // console.log('🚀 ~ names:', names)

  const { addRemoveRewardAchievement, currentChat } = useChatState()
  const [activeTab, setActiveTab] = useState(0)

  const achievementsList = useMemo(() => {
    return achievements?.map((item: IAchievement) => {
      const { id, name, description = '' } = item
      const selected = currentChat?.achievements?.some((item: any) => item.id === id)

      return (
        <AssetResourceCard
          key={id}
          title={name}
          description={description}
          type='achievement'
          selected={selected}
          onClick={() => addRemoveRewardAchievement(!selected, undefined, item)}
        />
      )
    })
  }, [achievements, currentChat?.achievements])

  const rewardsList = useMemo(() => {
    return rewards?.map((item: IReward) => {
      const { id, name, description = '' } = item
      const selected = currentChat?.rewards?.some((item: any) => item.id === id)

      return (
        <AssetResourceCard
          key={id}
          title={name}
          description={description}
          type='reward'
          selected={selected}
          onClick={() => addRemoveRewardAchievement(!selected, item, undefined)}
        />
      )
    })
  }, [rewards, currentChat?.rewards])

  return (
    <StyledMainWrapper>
      <StyledWrapperLayout>
        <StyledTabPanel>
          <TabList size='small'>
            <Tab onClick={() => setActiveTab(0)}>Achievements</Tab>
            <Tab onClick={() => setActiveTab(1)}>Rewards</Tab>
          </TabList>
        </StyledTabPanel>

        <StyledTabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              <StyledList>{achievementsList}</StyledList>
            </TabPanel>
            <TabPanel>
              <StyledList>{rewardsList}</StyledList>
            </TabPanel>
          </TabPanels>
        </StyledTabsContext>
      </StyledWrapperLayout>
    </StyledMainWrapper>
  )
}

export default ChatRewardsAchievements

const StyledMainWrapper = styled.div`
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  max-height: 100vh;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
`

const StyledWrapperLayout = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
  padding: 27px 20px;
`

export const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`

const StyledHeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledGroupHeader = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 18;
  line-height: 22px;
  color: #ffffff;
`
const StyledGroupDescription = styled.p`
  font-style: normal;
  font-weight: 450;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
`

const StyledTabPanel = styled.div`
  margin-top: 14px;
`

const StyledTabsContext = styled(TabsContext)`
  margin-top: 16px;
`

const StyledCardTabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`

const StyledCardTabContainer = styled.div<{ isActive?: boolean }>`
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  position: relative;
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #ffffff;
  }

  ${({ isActive }) =>
    isActive &&
    `
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  border-radius: 10px;
  `}

  &[aria-selected='true'] {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 6px;
      padding: 1px; /* control the border thickness */
      background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      border: none;
    }
  }
`

const StyledCardTabContainerStatus = styled.div<{ isActive?: boolean }>`
  opacity: 0.4;
  border: 1px solid #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  border-radius: 4px;
  width: fit-content;
  display: flex;
  padding: 5.5px 4px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    color: #ffffff;
  }
  ${({ isActive }) =>
    isActive &&
    `
    opacity: 1;
  background: linear-gradient(180deg, #73FAFD 0%, #50B1D7 100%);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  border: none;
  span{
    color: rgba(0, 0, 0, 0.7);
  }
  `}
`

const StyledStatusRow = styled.div`
  display: flex;
  justify-content: end;
  padding-bottom: 10px;
  position: absolute;
  right: 20px;
`
