import React, { useState } from 'react'
import { useChatState } from 'modals/AIChatModal/hooks/useChat'
import { IChatMessage, ICollection } from 'modals/AIChatModal/types'
import AiTable from './AiTable/AiTable'
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import styled from 'styled-components'
import BgImage from 'assets/backgrounds/collection_bg.jpg'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'

type CollectionProps = {
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

const MainCard = ({ onHandleClickCardChange, value, isActive }: any) => {
  return (
    <StyledCardTabContainer onClick={() => onHandleClickCardChange(value)} isActive={isActive}>
      <StyledCardTabContainerStatus isActive={isActive}>
        <span>collection 1</span>
      </StyledCardTabContainerStatus>
      <p>{value}</p>
    </StyledCardTabContainer>
  )
}

const cardTabsObj = [
  { value: 'Space Ships' },
  { value: 'Hyper Supersonic Tanks' },
  { value: 'Hyper Supersonic Tank' },
]

const ChatCollections: React.FC<CollectionProps> = ({ message }) => {
  const { collections } = message
  console.log('🚀 ~ collections:', collections)
  const { setCollections, currentChat } = useChatState()
  const [activeTab, setActiveTab] = useState(0)
  const [cardTab, setCardTab] = useState('')
  console.log('🚀 ~ cardTab:', cardTab)

  const onHandleClickCardChange = (value: any) => {
    setCardTab(value)
  }

  return (
    <div>
      <StyledCardTabs>
        {cardTabsObj.map((item: any) => (
          <MainCard
            key={item.value}
            onHandleClickCardChange={onHandleClickCardChange}
            value={item.value}
            isActive={cardTab === item.value}
          />
        ))}
      </StyledCardTabs>
      <StyledMainWrapper>
        <StyledWrapperLayout>
          {collections?.map((collection: ICollection) => (
            <div
              key={collection.id}
              onClick={() => {
                setCollections([...collections, collection])
              }}
            >
              {/* <img src={collection.image} alt={collection.name} /> */}
              {/* <div>ID: {collection.id}</div> */}
              <StyledHeaderGroup>
                <StyledGroupHeader>{collection.name}</StyledGroupHeader>
                <StyledGroupDescription>
                  Description: {collection.description}
                </StyledGroupDescription>
              </StyledHeaderGroup>
              <StyledTabPanel>
                <TabList>
                  <Tab onClick={() => setActiveTab(0)}>Assets</Tab>
                  <Tab onClick={() => setActiveTab(1)}>Properties</Tab>
                  <Tab onClick={() => setActiveTab(2)}>Attributes</Tab>
                </TabList>
              </StyledTabPanel>
              <StyledTabsContext activeTabId={activeTab} className='tab_pannels_container'>
                <TabPanels>
                  <TabPanel>{renderFields(collection?.assets, 'assets')}</TabPanel>
                  <TabPanel>{renderFields(collection?.properties, 'properties')}</TabPanel>
                  <TabPanel>{renderFields(collection?.attributes, 'attributes')}</TabPanel>
                </TabPanels>
              </StyledTabsContext>
            </div>
          ))}
          {/* <h3>Chosen Collection:</h3>
        <button
          onClick={() => {
            setCollections(null)
          }}
        >
          Remove Selected
        </button> */}
        </StyledWrapperLayout>
      </StyledMainWrapper>
    </div>
  )
}

export default ChatCollections

const StyledMainWrapper = styled.div`
  background-image: url(${BgImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  overflow: hidden;
`

const StyledWrapperLayout = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
  padding: 27px 20px;
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
