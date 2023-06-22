import GetStartedComponent from './HomeComponents/GetStartedComponent'
import { ReportsOverview } from './ReportsOverview/ReportsOverview'

import TopCharts from './TopCharts/TopCharts'
import Documentation from './Documentation/Documentation'

import { StyledInnerWrapper } from 'routes/LayoutStyle'
import { SectionDivider } from 'styles/globalStyle.css'
import styled from 'styled-components'

const Home = () => {
  return (
    <>
      <StyledInnerWrapperEdit>
        <GetStartedComponent />
        <SectionDivider />
        <ReportsOverview />

        {/* 
        <TopCharts />
        <Documentation /> */}
      </StyledInnerWrapperEdit>
    </>
  )
}

export default Home

const StyledInnerWrapperEdit = styled(StyledInnerWrapper)`
  display: grid;
  grid-auto-rows: max-content;
  gap: 20px;
`
