import { PieChart as PieChartBase, Pie, Cell, Tooltip, Legend } from 'recharts'
import { COLLECTIONS_BY_CATEGORIES_CHART_DATA } from './Report.constants'

type PieChartProps = {
  data: Record<string, unknown>[]
}

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  index: number
  name: string
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const COLORS = ['#00FF7F', '#8D79F6', '#EEA03C', '#50B1D7', '#f65f7c']

const PieChart = ({ data }: PieChartProps) => {
  return (
    <PieChartBase width={400} height={400}>
      <Pie
        data={COLLECTIONS_BY_CATEGORIES_CHART_DATA}
        nameKey='name'
        dataKey='value'
        label={renderCustomizedLabel}
        labelLine={false}
        stroke='none'
      >
        {COLLECTIONS_BY_CATEGORIES_CHART_DATA.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChartBase>
  )
}

export default PieChart
