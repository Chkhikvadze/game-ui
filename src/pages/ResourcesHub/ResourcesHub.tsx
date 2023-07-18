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
import Properties from 'pages/Property/Properties'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import {
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionWrapper,
  StyledTabList,
  StyledHeaderGroup as TabsStyledHeaderGroup,
} from 'pages/Home/homeStyle.css'
import { StyledGroupContainer } from 'components/Layout/LayoutStyle'

const ResourcesHub = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledGroupContainer mt='60'>
      <StyledSectionWrapper>
        <ComponentsWrapper>
          <StyledTabList>
            {/* <StyledHeaderWrapper> */}
            {/* <StyledHeaderGroup grid> */}

            <Tab onClick={() => setActiveTab(0)}>Attributes</Tab>
            <Tab onClick={() => setActiveTab(1)}>Achievements</Tab>
            <Tab onClick={() => setActiveTab(2)}>Rewards</Tab>
            <Tab onClick={() => setActiveTab(3)}>Properties</Tab>

            {/* </StyledHeaderGroup> */}
            {/* </StyledHeaderWrapper> */}
          </StyledTabList>
          <StyledTabContext activeTabId={activeTab}>
            <TabPanels className='panels' noAnimation>
              <TabPanel className='panel'>
                <Attributes />
              </TabPanel>

              <TabPanel className='panel'>
                <Achievements />
              </TabPanel>

              <TabPanel className='panel'>
                <Rewards />
              </TabPanel>
              <TabPanel className='panel'>
                <Properties />
              </TabPanel>
            </TabPanels>
          </StyledTabContext>
        </ComponentsWrapper>
      </StyledSectionWrapper>
    </StyledGroupContainer>
  )
}

export default ResourcesHub

const StyledRoot = styled.div`
  height: 100%;
  margin-top: 60px;
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
  margin-top: 20px;
`
