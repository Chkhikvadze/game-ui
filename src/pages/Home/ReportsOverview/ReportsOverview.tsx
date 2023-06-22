import {
  StyledFilterGroup,
  StyledHeaderGroup,
  StyledInnerGroup,
  StyledSectionTitle,
  StyledSectionDescription,
} from '../homeStyle.css'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'

import styled from 'styled-components'
import BarCharts from '../Charts/BarCharts'
import StaticArrowSvg from '../assets/StaticArrowSvg'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { useState } from 'react'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

const ReportCard = ({
  children,
  hideStatistic,
  title,
  subTitle,
  className,
  text,
  static_percentage,
}: any) => {
  const arrowColor = static_percentage < 10 ? 'rgba(209, 68, 133, 1)' : 'rgba(122, 249, 75, 1)'
  return (
    <StyledCardBody className={className}>
      {hideStatistic ? (
        <StyledCardHeader>
          <StyledHeaderStaticGroup>
            <h1>{title}</h1>
          </StyledHeaderStaticGroup>
          {text && <p>{text}</p>}
        </StyledCardHeader>
      ) : (
        <StyledCardHeader>
          <StyledHeaderStaticGroup>
            <h1>{title}</h1>
            <StyledHeaderStaticGroupInner static_percentage={static_percentage}>
              <StaticArrowSvg fill={arrowColor} />
              <span>14 %</span>
            </StyledHeaderStaticGroupInner>
          </StyledHeaderStaticGroup>
          <h2>{subTitle}</h2>
        </StyledCardHeader>
      )}
      {children && <StyledChildrenContainer>{children}</StyledChildrenContainer>}
    </StyledCardBody>
  )
}

export const ReportsOverview = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    // <div>
    //   <StyledHeaderGroup className='header_group'>
    //     <StyledSectionTitle>Reports Overview</StyledSectionTitle>
    //     <StyledFilterGroup>
    //       <div>Monthly</div>
    //       <div>Compared to</div>
    //       <div>Previous Period</div>
    //     </StyledFilterGroup>
    //   </StyledHeaderGroup>
    //   <StyledInnerGroup>
    //     <ReportCard title='Finance' subTitle='$ 12,5K' static_percentage='5' />
    //     <ReportCard title='Wallets' subTitle='233,5K' />
    //     <ReportCard title={'Revenue growth'} subTitle='$ 12,5K' hideStatistic>
    //       {<BarCharts />}
    //     </ReportCard>
    //     <ReportCard title='Total API Calls' subTitle='104,4K' />
    //     <ReportCard title='Total API mints' subTitle='14,4K' />
    //     <ReportCard
    //       title='AI notes'
    //       text='“I’m seeing this and that....”'
    //       hideStatistic
    //       className='grid_column_positioning'
    //     />
    //     <ReportCard title='Total API Trades' subTitle='120,5 K' />
    //     <ReportCard title='Total API burns' subTitle='5,2 K' />
    //   </StyledInnerGroup>
    // </div>
    <StyledSectionWrapper>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Recent Updates</StyledSectionTitle>
        <StyledSectionDescription>Here are the latest in your, etc.</StyledSectionDescription>
      </StyledHeaderGroup>
      <ComponentsWrapper>
        <StyledTabList>
          <Tab className='inner_tab' onClick={() => setActiveTab(0)}>
            Active
          </Tab>
          <Tab className='inner_tab' onClick={() => setActiveTab(1)}>
            Draft
          </Tab>
          <Tab className='tab_plus' active={false} onClick={(e: any) => console.log('add report')}>
            +
          </Tab>
        </StyledTabList>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels noAnimation>
            <TabPanel>
              <StyledWrapperGroup>
                <ReportCard title='Finance' subTitle='$ 12,5K' static_percentage='5' />
                <ReportCard title='Wallets' subTitle='233,5K' />
                <ReportCard title={'Revenue growth'} subTitle='$ 12,5K' hideStatistic>
                  {<BarCharts />}
                </ReportCard>
              </StyledWrapperGroup>
            </TabPanel>
            <TabPanel>Draft</TabPanel>
          </TabPanels>
        </TabsContext>
      </ComponentsWrapper>
    </StyledSectionWrapper>
  )
}

export default ReportsOverview

const StyledTabList = styled(TabList)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.1),
    inset 0px 1px 1px rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 100px;

  .inner_tab {
    min-width: 80px;
  }
  .tab_plus {
    min-width: 40px;
    a {
      &:hover {
        background-color: inherit !important;
      }
    }
  }
`

const StyledCardBody = styled.div`
  padding-top: 22px;
  padding-right: 20px;
  padding-left: 16px;
  padding-bottom: 16px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 16px;
`
const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`

const StyledHeaderStaticGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.8);
  }
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.8);
  }
`
const StyledHeaderStaticGroupInner = styled.div<{ static_percentage?: number }>`
  display: flex;
  align-items: center;
  gap: 11px;

  ${({ static_percentage }) =>
    static_percentage &&
    `
    svg{
  transform: rotate(90deg);
}
  `}
`

const StyledChildrenContainer = styled.div`
  margin-top: 19px;
`

const StyledWrapperGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`

const StyledSectionWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const StyledComponentsWrapper = styled(ComponentsWrapper)`
  margin-top: 20px;
  background: red;
`
