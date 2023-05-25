import {
  ResponsiveContainer,
  LineChart as LineChartBase,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from 'recharts'
import { PLAYERS_GROWTH_CHART_DATA } from './Report.constants'

type LineChartProps = {
  data: Record<string, unknown>[]
}

const LineChart = ({ data }: LineChartProps) => {
  return (
    // <ResponsiveContainer width='100%' height='100%'>
    <LineChartBase
      width={600}
      height={300}
      data={PLAYERS_GROWTH_CHART_DATA}
      margin={{
        top: 5,
        bottom: 5,
      }}
    >
      <CartesianGrid />

      <XAxis dataKey='name' stroke='#fff' axisLine={false} tickLine={false} dy={10} />

      <YAxis axisLine={false} tickLine={false} stroke='#fff' />

      <Tooltip />

      <Line type='monotone' dataKey='value' stroke='#00FF7F' strokeWidth={3} activeDot={{ r: 8 }} />
    </LineChartBase>
    // </ResponsiveContainer>
  )
}

export default LineChart
