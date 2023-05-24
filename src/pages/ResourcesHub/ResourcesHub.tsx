import { useState } from 'react'

import { StyleHeaderGroup } from 'styles/globalStyle.css'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Attributes from './Attributes'
import Achievements from './Achievements'
import styled from 'styled-components'
import Rewards from './Rewards'

const ResourcesHub = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <StyledHeaderWrapper>
        <StyleHeaderGroup grid>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>Attributes</Tab>
            <Tab onClick={() => setActiveTab(1)}>Achievements</Tab>
            <Tab onClick={() => setActiveTab(2)}>Rewards</Tab>
          </TabList>
        </StyleHeaderGroup>
      </StyledHeaderWrapper>

      <StyledTabContext activeTabId={activeTab}>
        <TabPanels className='panels'>
          <TabPanel className='panel'>
            <Attributes />
          </TabPanel>

          <TabPanel className='panel'>
            <Achievements />
          </TabPanel>

          <TabPanel className='panel'>
            <Rewards />
          </TabPanel>
        </TabPanels>
      </StyledTabContext>
    </StyledRoot>
  )
}

export default ResourcesHub

const StyledRoot = styled.div`
  height: 100%;
`
const StyledTabContext = styled(TabsContext)`
  width: 100%;
  height: calc(100% - 110px);

  .panels {
    height: 100%;
  }
  .panel {
    height: 100%;

    padding: 0;
  }
`
const StyledHeaderWrapper = styled.div`
  min-height: fit-content;
`
