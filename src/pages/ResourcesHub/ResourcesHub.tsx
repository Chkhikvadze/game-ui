import { useState } from 'react'

import { StyleHeaderGroup } from 'styles/globalStyle.css'

import { StyledTabContext } from 'pages/Game/EditGame/EditGame'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import Attributes from './Attributes'
import Achievements from './Achievements'
import styled from 'styled-components'

const ResourcesHub = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <StyleHeaderGroup grid>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>Attributes</Tab>
          <Tab onClick={() => setActiveTab(1)}>Achievements</Tab>
        </TabList>
      </StyleHeaderGroup>

      <StyledTabContext activeTabId={activeTab} className='tab_pannels_container'>
        <TabPanels>
          <TabPanel>
            <Attributes />
          </TabPanel>

          <TabPanel>
            <Achievements />
          </TabPanel>
        </TabPanels>
      </StyledTabContext>
    </>
  )
}

export default ResourcesHub

// const StyledRoot = styled.div`
//   height: 100%;
// `
