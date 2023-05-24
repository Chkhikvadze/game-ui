import styled from 'styled-components'

import GetStartedComponent from './HomeComponents/GetStartedComponent'

import { StyleHeaderGroup } from 'styles/globalStyle.css'
import { ReportsOverview } from './ReportsOverview/ReportsOverview'
import { StyledInnerWrapperEdit } from './homeStyle.css'
import TopCharts from './TopCharts/TopCharts'
import Documentation from './Documentation/Documentation'

const Home = () => {
  return (
    <>
      <StyleHeaderGroup />

      <StyledInnerWrapperEdit>
        <StyledWelcomeContainer>
          <h1>Welcome, Eduardo!</h1>
          <p>
            Browse our{' '}
            <a href='https://docs.l3vels.xyz/' target='blank'>
              developers docs
            </a>{' '}
            or
            <a href='https://docs.l3vels.xyz/' target='blank'>
              explore all the ways
            </a>
            to start using L3vels.
          </p>
        </StyledWelcomeContainer>
        <GetStartedComponent />

        <ReportsOverview />
        <TopCharts />
        <Documentation />
      </StyledInnerWrapperEdit>
    </>
  )
}

export default Home

const StyledWelcomeContainer = styled.div`
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 16px;
  }
  a {
    all: unset;
    rgba(255, 255, 255, 1);
    text-decoration: underline;
  }
`
