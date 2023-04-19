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
import useLog from './useLog'
// import useFilter from './Components/useFilter'
import HeaderWrapper from 'components/HeaderWrapper'
import {
  StyleHeaderGroup,
  StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'

const Log = () => {
  const [activeTab, setActiveTab] = useState(0)

  const { log_list, filter } = useLog()

  const log = log_list
  return (
    <StyledRoot>
      <TabsContext activeTabId={activeTab}>
        <TabList>
          <Tab size='small' onClick={() => setActiveTab(0)}>
            <Typography
              value='All'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor='rgba(255, 255, 255, 1)'
            />
          </Tab>
          <Tab size='small' onClick={() => setActiveTab(1)}>
            <Typography
              value='Successful'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor='rgba(255, 255, 255, 0.6)'
            />
          </Tab>
          <Tab size='small' onClick={() => setActiveTab(2)}>
            <Typography
              value='Failed'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
              customColor='rgba(255, 255, 255, 0.6)'
            />
          </Tab>
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
// function useLogService(): { log_list: any; filter: any } {
//   throw new Error('Function not implemented.')
// }
