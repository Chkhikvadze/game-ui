import { useContext } from 'react'
import { AuthContext } from 'contexts'

import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
// import Button from '@l3-lib/ui-core/dist/Button'
import Search from '@l3-lib/ui-core/dist/Search'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Toggle from '@l3-lib/ui-core/dist/Toggle'

// import { useTranslation } from 'react-i18next'
import {
  // StyledBadgeWrapper,
  StyledHeaderDiv,
  StyledHeaderSection,
  // StyledMainContainer,
  StyledSearchWrapper,
} from '../Collection/EditCollection/EditCollection'
import { StyledTextWrapper } from '../Collection/CollectionForm/CollectionForm'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import { BarChart, Bar, XAxis, YAxis } from 'recharts'

import { data } from './dummyData'

const Home = () => {
  const { user } = useContext(AuthContext)

  // const { t } = useTranslation()

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
    <StyledRoot>
      <StyledContainer>
        <StyledHeaderDiv>
          <StyledTagWrapper>
            <Tags label='Test Data' color='gradient_orange' readOnly />
          </StyledTagWrapper>

          <StyledHeaderSection>
            <StyledToggleWrapper>
              <Typography
                value='Test Mode'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                as={'label'}
                customColor={'#fff'}
              />
              <Toggle kind='tertiary' />
            </StyledToggleWrapper>

            <StyledSearchWrapper>
              <Search placeholder='Search' wrapperClassName='l3-storybook-search_size' />
            </StyledSearchWrapper>
          </StyledHeaderSection>
        </StyledHeaderDiv>

        <StyledMainSection>
          <StyledTextWrapper>
            <Heading
              type={Heading.types.h1}
              value={`Welcome Back, ${user.first_name}!`}
              size='medium'
              customColor={'#fff'}
            />
            <Typography
              value='Browse our developers docs or explore all the ways to start using L3vels.'
              type={Typography.types.P}
              size={Typography.sizes.lg}
              customColor={'rgba(255, 255, 255, 0.8)'}
            />
          </StyledTextWrapper>

          <StyledDocsWrapper>
            <Heading
              type={Heading.types.h1}
              value={`Get Started with L3vels`}
              size='medium'
              customColor={'#fff'}
            />

            <StyledColumns>
              <StyledColumn>
                <StyledTagWrapper>
                  <Tags label='No Code' color='#2F4DEF' readOnly size='small' />
                </StyledTagWrapper>
                <Typography
                  value='Create subscriptions and assets from the dashboard'
                  type={Typography.types.P}
                  size={Typography.sizes.md}
                  customColor={'rgba(255, 255, 255, 0.8)'}
                />

                <StyledNoContent></StyledNoContent>
              </StyledColumn>

              <StyledColumn>
                <Typography
                  value='Collection'
                  type={Typography.types.P}
                  size={Typography.sizes.lg}
                  customColor={'rgba(255, 255, 255, 0.8)'}
                />
                <div>
                  <Typography
                    value='Build With:'
                    type={Typography.types.P}
                    size={Typography.sizes.md}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                  <StyledTagWrapper>
                    <Tags label='API' color='#7000FF' readOnly size='small' />
                    <Tags label='No Code' color='#E332E6' readOnly size='small' outlined={true} />
                  </StyledTagWrapper>
                </div>

                <StyledNoContent></StyledNoContent>
              </StyledColumn>
            </StyledColumns>
          </StyledDocsWrapper>
        </StyledMainSection>

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
      </StyledContainer>
    </StyledRoot>
  )
}

export default Home

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`
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

const StyledMainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
const StyledDocsWrapper = styled.div`
  width: 90%;
  min-width: fit-content;
  height: fit-content;
  background: #ffffff1a;
  border-radius: 8px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledColumns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;

  align-items: center;
`
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  gap: 12px;
`
const StyledNoContent = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
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
