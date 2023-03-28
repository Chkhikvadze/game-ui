import React, { useState } from 'react'
import Button from '@l3-lib/ui-core/dist/Button'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Add from '@l3-lib/ui-core/dist/icons/Add'

import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import Filter from './Components/Filter'
import LogList from './Components/LogList'
import Details from './Components/Details'
import useLog from './useLogService'
// import useFilter from './Components/useFilter'

const Log = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { log_list, filter, log } = useLog()
  return (
    <StyledRoot>
      <TabsContext activeTabId={activeTab}>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Successful</Tab>
          <Tab onClick={() => setActiveTab(2)}>Failed</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Filter filter={filter} />
            <StyledPanelContainer>
              <LogList items={log_list} />
              <Details log={log} />
            </StyledPanelContainer>
          </TabPanel>

          {/* <TabPanel>
					<div>3</div>
          </TabPanel>

          <TabPanel>
            <div>3</div>
          </TabPanel> */}
        </TabPanels>
      </TabsContext>
    </StyledRoot>
  )
}

export default Log

export const StyledRoot = styled.div`
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 24px;
`

const StyledPanelContainer = styled.div`
  display: grid;
  grid-template-columns: 32% auto;
  grid-gap: 33px;
  margin-top: 37px;
`
