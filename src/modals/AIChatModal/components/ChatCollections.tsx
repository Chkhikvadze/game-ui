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
    // <AiTable data={fields} />
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {fields?.map(field => (
          <tr key={field?.name}>
            <td>{field?.name}</td>
            {field?.items?.map((item: any) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.description}</td>
                <td>{item?.value}</td>
              </tr>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ChatCollections: React.FC<CollectionProps> = ({ message }) => {
  const { collections } = message
  console.log('🚀 ~ collections:', collections)
  const { setCollections, currentChat } = useChatState()
  const [activeTab, setActiveTab] = useState(0)

  return (
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
              <StyledGroupDescription>Description: {collection.description}</StyledGroupDescription>
            </StyledHeaderGroup>
            <StyledTabPanel>
              <TabList>
                <Tab onClick={() => setActiveTab(0)}>Assets</Tab>
                <Tab onClick={() => setActiveTab(1)}>Properties</Tab>
                <Tab onClick={() => setActiveTab(2)}>Attributes</Tab>
              </TabList>
            </StyledTabPanel>
            <h1>{activeTab}</h1>
            <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
              <TabPanel>{'Assets'}</TabPanel>
              <TabPanel>{'Properties'}</TabPanel>
              <TabPanel>{'Attributes'}</TabPanel>
            </TabsContext>
            {/* {activeTab === 'assets' && renderFields(collection?.assets, 'assets')}
            {activeTab === 'properties' && renderFields(collection?.properties, 'properties')}
            {activeTab === 'attributes' && renderFields(collection?.attributes, 'attributes')} */}
          </div>
        ))}
        <h3>Chosen Collection:</h3>
        {/* {currentChat?.collections[0].name}</h3>} */}
        <button
          onClick={() => {
            setCollections(null)
          }}
        >
          Remove Selected
        </button>
      </StyledWrapperLayout>
    </StyledMainWrapper>
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
