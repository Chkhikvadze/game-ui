import { useState } from 'react'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import styled from 'styled-components'
import Filter from './Components/Filter'
import LogList from './Components/LogList'
import Details from './Components/Details'
import useLog from './useLog'
import HeaderWrapper from 'components/HeaderWrapper'
import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
// import useFilter from './Components/useFilter'

const Log = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { log_list, filter } = useLog()

  const log = log_list
  return (
    <>
      <HeaderWrapper>
        <StyleHeaderGroup>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>All</Tab>
            <Tab onClick={() => setActiveTab(1)}>Successful</Tab>
            <Tab onClick={() => setActiveTab(2)}>Failed</Tab>
          </TabList>
        </StyleHeaderGroup>
      </HeaderWrapper>
      <StyledInnerWrapper>
        <TabsContext activeTabId={activeTab}>
          <TabPanels>
            <TabPanel>
              <Filter filter={filter} />
              <StyledPanelContainer>
                <LogList items={log_list} />
                <Details log={log} />
              </StyledPanelContainer>
            </TabPanel>

            <TabPanel>
              <div>Successful</div>
            </TabPanel>

            <TabPanel>
              <div>Failed</div>
            </TabPanel>
          </TabPanels>
        </TabsContext>
      </StyledInnerWrapper>
    </>
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
  grid-template-columns: 1fr 2fr;
  grid-gap: 33px;
  margin-top: 37px;
`
// function useLogService(): { log_list: any; filter: any } {
//   throw new Error('Function not implemented.')
// }
