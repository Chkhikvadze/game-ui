import {
  StyledFilterGroup,
  StyledHeaderGroup,
  StyledInnerGroup,
  StyledSectionTitle,
} from '../homeStyle.css'

import staticUpSvg from '../assets/static-up.svg'

import styled from 'styled-components'
import BarCharts from '../Charts/BarCharts'

const ReportCard = ({ children, hideStatistic, title, subTitle, className, text }: any) => {
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
            <StyledHeaderStaticGroupInner>
              <img src={staticUpSvg} alt={staticUpSvg} />
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
  return (
    <div>
      <StyledHeaderGroup className='header_group'>
        <StyledSectionTitle>Reports Overview</StyledSectionTitle>
        <StyledFilterGroup>
          <div>Monthly</div>
          <div>Compared to</div>
          <div>Previous Period</div>
        </StyledFilterGroup>
      </StyledHeaderGroup>
      <StyledInnerGroup>
        <ReportCard title='Finance' subTitle='$ 12,5K ' />
        <ReportCard title='Wallets' subTitle='233,5K' />
        <ReportCard title={'Revenue growth'} subTitle='$ 12,5K' hideStatistic>
          {<BarCharts />}
        </ReportCard>
        <ReportCard title='Total API Calls' subTitle='104,4K' />
        <ReportCard title='Total API mints' subTitle='14,4K' />
        <ReportCard
          title='AI notes'
          text='“I’m seeing this and that....”'
          hideStatistic
          className='grid_column_positioning'
        />
        <ReportCard title='Total API Trades' subTitle='120,5 K' />
        <ReportCard title='Total API burns' subTitle='5,2 K' />
      </StyledInnerGroup>
    </div>
  )
}

export default ReportsOverview

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
  gap: 14px;
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
const StyledHeaderStaticGroupInner = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`

const StyledChildrenContainer = styled.div`
  margin-top: 19px;
`
