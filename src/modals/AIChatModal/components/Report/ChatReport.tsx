import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { ChartTypeEnum, IChatMessage } from 'modals/AIChatModal/types'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'

type ChatReportProps = {
  message: IChatMessage
}

const ChatReport = ({ message }: ChatReportProps) => {
  const { report } = message

  if (!report) return null

  return (
    <StyledContainer>
      {report?.charts?.map(({ title, data, type }, index: number) => (
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
  margin-top: 64px;
`

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`
