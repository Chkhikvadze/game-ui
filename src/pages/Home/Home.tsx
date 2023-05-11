import { useContext } from 'react'
import { AuthContext } from 'contexts'

import styled from 'styled-components'

import { data } from './dummyData'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'

import { StyledTextWrapper } from '../Collection/CollectionForm/CollectionForm'

import { BarChart, Bar, XAxis, YAxis } from 'recharts'

import l3Letters from 'assets/icons/letters.svg'
import collectionBg from 'assets/images/collection_bg.jpg'
import contractBg from 'assets/images/contract_bg.jpg'

import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

const Home = () => {
  const { user } = useContext(AuthContext)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomYAxisTick = (props: any) => {
    const { y, payload } = props
    let newNumber
    if (payload.value > 1000000000) {
      newNumber = `${(payload.value / 1000000000).toString()}B`
    } else if (payload.value > 1000000) {
      newNumber = `${(payload.value / 1000000).toString()}M`
    } else if (payload.value > 1000) {
      newNumber = `${(payload.value / 1000).toString()}K`
    } else if (payload.value === 0) {
      newNumber = `$${payload.value.toString()}`
    } else {
      newNumber = payload.value.toString()
    }

    return (
      <g transform={`translate(${0},${y})`}>
        <text x={0} y={0} textAnchor='start' fill='#FFF'>
          {newNumber}
        </text>
      </g>
    )
  }

  const renderBarChart = (
    label: string,
    dataKeys: { first: any; second?: any; third?: any },
    xaDataKey: any,
  ) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '350px',
        gap: '20px',
        position: 'relative',
      }}
    >
      <Typography
        value={label}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor={'rgba(255, 255, 255, 0.8)'}
      />
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey={xaDataKey} stroke='#fff' axisLine={false} tickLine={false} dy={10} />
        <YAxis
          // stroke='#fff'
          axisLine={false}
          tickLine={false}
          // tickFormatter={dataFormater}
          tick={<CustomYAxisTick />}
        />
        {/* <Tooltip /> */}

        <Bar
          radius={8}
          dataKey={dataKeys.first}
          stackId='a'
          fill='#00FF7F'
          barSize={26}
          // style={{ position: 'absolute', zIndex: 100 }}
        />
        <Bar
          radius={[8, 8, 0, 0]}
          dataKey={dataKeys.second}
          stackId='a'
          fill='#8D79F6'
          barSize={26}
          style={{ transform: `translate(0, 5px)` }}
        />
        <Bar
          radius={[8, 8, 0, 0]}
          dataKey={dataKeys.third}
          stackId='a'
          fill='#a08cfb55'
          barSize={26}
          style={{ transform: 'translate(0px, 10px)' }}
        />
      </BarChart>
    </div>
  )

  return (
    <>
      <StyleHeaderGroup />

      <StyledInnerWrapper>
        <StyledWelcomeContainer>
          <h1>Welcome, Eduardo!</h1>
          <p>
            Browse our <span>developers docs </span> or <span> explore all the ways</span> to start
            using L3vels.
          </p>
        </StyledWelcomeContainer>

        <StyledInfoSection>
          <StyledGroupContainer>
            <StyledFlex>
              <StyledTypography>Get Started with</StyledTypography>
              <img src={l3Letters} alt='l3 letter' />
            </StyledFlex>
            <StyledCardWrapper>
              <StyledInfoCard>
                <StyledTypography size='18'>Collection</StyledTypography>
                <StyledInfoCardBody>
                  <StyleCardTagWrapperGroup>
                    <StyleTagLabel>Build with:</StyleTagLabel>
                    <StyleCardTagWrapper>
                      <Tags
                        label='API'
                        color='linear-gradient(180deg, #73FAFD 0%, #50B1D7 100%)'
                        readOnly
                        size='small'
                      />
                      <Tags label='No Code' color='gradient_orange' readOnly size='small' />
                    </StyleCardTagWrapper>
                  </StyleCardTagWrapperGroup>
                  <StyleImageContainer>
                    <img src={collectionBg} alt='' />
                  </StyleImageContainer>
                </StyledInfoCardBody>
              </StyledInfoCard>
              <StyledInfoCard>
                <StyledTypography size='18'>Contract</StyledTypography>
                <StyledInfoCardBody>
                  <StyleCardTagWrapperGroup>
                    <StyleTagLabel>Build with:</StyleTagLabel>
                    <StyleCardTagWrapper>
                      <Tags label='No Code' color='gradient_orange' readOnly size='small' />
                    </StyleCardTagWrapper>
                  </StyleCardTagWrapperGroup>
                  <StyleImageContainer>
                    <img src={contractBg} alt='' />
                  </StyleImageContainer>
                </StyledInfoCardBody>
              </StyledInfoCard>
            </StyledCardWrapper>
          </StyledGroupContainer>
        </StyledInfoSection>

        <StyledChartSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              value={'Reports Overview'}
              size='medium'
              customColor={'rgba(255, 255, 255, 0.8)'}
            />
          </StyledTextWrapper>
          <StyledBarChartWrapper>
            {renderBarChart('Gross Volume', { first: 'pv', second: 'uv', third: 'ad' }, 'name')}
            {renderBarChart('Net Volume', { first: 'pv', second: 'uv', third: 'ad' }, 'name')}
          </StyledBarChartWrapper>
        </StyledChartSection>
      </StyledInnerWrapper>
    </>
  )
}

export default Home

const StyledTagWrapper = styled.div`
  min-width: 100px;

  display: flex;
  gap: 10px;
`
const StyledToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const StyledChartSection = styled.div`
  /* width: 80%; */
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledBarChartWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 50px;
`

const StyledInfoSection = styled.div`
  padding: 30px 32px;
  background: rgba(0, 0, 0, 0.1);
  mix-blend-mode: normal;
  border-radius: 8px;
`

const StyledTypography = styled.h1<{ size?: string }>`
  font-style: normal;
  font-weight: 500;
  font-size: ${p => (p.size ? p.size : '20')}px;
  line-height: normal;
  color: #ffffff;
`

const StyledFlex = styled.div`
  display: flex;
  align-items: end;
`

const StyledGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const StyledInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledCardWrapper = styled.div`
  display: flex;
  gap: 32px;
`
const StyledInfoCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const StyleCardTagWrapper = styled.div`
  display: flex;
  gap: 4px;
`
const StyleCardTagWrapperGroup = styled.div`
  display: flex;
  gap: 4px;
`

const StyleTagLabel = styled.p`
  font-style: normal;
  font-weight: 450;
  font-size: 12px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.6);
`

const StyleImageContainer = styled.div`
  width: 100;
  width: 351px;
  height: 222px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

const StyledWelcomeContainer = styled.div`
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -0.019em;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.014em;
    color: rgba(255, 255, 255, 0.8);
  }
  span {
    color: rgba(255, 223, 141, 1);
  }
`
