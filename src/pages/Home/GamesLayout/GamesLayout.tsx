import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Tab from '@l3-lib/ui-core/dist/Tab'

import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'

import {
  StyledFilterGroup,
  StyledHeaderGroup,
  StyledInnerGroup,
  StyledSectionTitle,
  StyledSectionDescription,
  StyledSectionWrapper,
  StyledTabList,
  StyledWrapperGroup,
} from '../homeStyle.css'

import { useState } from 'react'

const GamesLayout = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Games</StyledSectionTitle>
        <StyledSectionDescription>Here are all of your games, etc</StyledSectionDescription>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledTabList>
          <Tab className='inner_tab' onClick={() => setActiveTab(0)}>
            All
          </Tab>
          <Tab className='inner_tab' onClick={() => setActiveTab(1)}>
            Active
          </Tab>
          <Tab className='inner_tab' onClick={() => setActiveTab(2)}>
            Drafts
          </Tab>
          <Tab
            className='tab_plus'
            active={false}
            aria-selected='false'
            onClick={(e: any) => console.log('add report')}
          >
            +
          </Tab>
        </StyledTabList>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels noAnimation>
            <TabPanel>
              <StyledWrapperGroup>test</StyledWrapperGroup>
            </TabPanel>
            <TabPanel>Draft</TabPanel>
          </TabPanels>
        </TabsContext>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default GamesLayout
