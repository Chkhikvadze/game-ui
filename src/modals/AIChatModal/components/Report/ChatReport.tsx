import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { ChartTypeEnum, IChatMessage, IReportChart } from 'modals/AIChatModal/types'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'

type ChatReportProps = {
  message: IChatMessage
}

const CHARTS: IReportChart[] = [
  {
    type: ChartTypeEnum.Pie,
    title: 'Collections grouped by categories',
    data: [],
  },
  {
    type: ChartTypeEnum.Bar,
    title: 'Revenue growth',
    data: [],
  },
  {
    type: ChartTypeEnum.Line,
    title: 'Players growth over time',
    data: [],
  },
]

const ChatReport = ({ message }: ChatReportProps) => {
  // const { report } = message

  // if (!report?.charts) return null

  return (
    <StyledContainer>
      {CHARTS.map(({ title, data, type }, index: number) => (
        <StyledChartContainer key={index}>
          <Typography
            value={`${index + 1}. ${title}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor={'#FFF'}
          />

          {type === ChartTypeEnum.Line && <LineChart data={data} />}
          {type === ChartTypeEnum.Bar && <BarChart data={data} />}
          {type === ChartTypeEnum.Pie && <PieChart data={data} />}
        </StyledChartContainer>
      ))}
    </StyledContainer>
  )
}

export default ChatReport

const StyledContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 64px;
  margin-bottom: 64px;
  margin-top: 32px;
`

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`
