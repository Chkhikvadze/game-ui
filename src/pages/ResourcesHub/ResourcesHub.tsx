import { useState } from 'react'

import { StyledHeaderGroup } from 'styles/globalStyle.css'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Attributes from './Attributes'
import Achievements from './Achievements'
import styled from 'styled-components'
import Rewards from './Rewards'
import { StyledGroupContainer } from 'routes/LayoutStyle'

const ResourcesHub = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    // <StyledRoot>
    //   <StyledHeaderWrapper>
    //     <StyledHeaderGroup grid>
    //       <TabList>
    //         <Tab onClick={() => setActiveTab(0)}>Attributes</Tab>
    //         <Tab onClick={() => setActiveTab(1)}>Achievements</Tab>
    //         <Tab onClick={() => setActiveTab(2)}>Rewards</Tab>
    //       </TabList>
    //     </StyledHeaderGroup>
    //   </StyledHeaderWrapper>

    //   <StyledTabContext activeTabId={activeTab}>
    //     <TabPanels className='panels'>
    //       <TabPanel className='panel'>
    //         <Attributes />
    //       </TabPanel>

    //       <TabPanel className='panel'>
    //         <Achievements />
    //       </TabPanel>

    //       <TabPanel className='panel'>
    //         <Rewards />
    //       </TabPanel>
    //     </TabPanels>
    //   </StyledTabContext>
    // </StyledRoot>
    <StyledGroupContainer mt='20'>
      <Attributes />
    </StyledGroupContainer>
  )
}

export default ResourcesHub
