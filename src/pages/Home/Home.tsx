import GetStartedComponent from './HomeComponents/GetStartedComponent'

import { ReportsOverview } from './ReportsOverview/ReportsOverview'
// import { StyledInnerWrapperEdit } from './homeStyle.css'
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
  gap: 20px;
`
