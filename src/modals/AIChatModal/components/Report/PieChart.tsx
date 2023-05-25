import { PieChart as PieChartBase, Pie, Cell, Tooltip, Legend } from 'recharts'

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

const COLORS = ['#00FF7F', '#8D79F6', '#FFBB28']

const PieChart = ({ data }: PieChartProps) => {
  return (
    <PieChartBase width={600} height={400}>
      <Pie
        data={data}
        nameKey='name'
        dataKey='value'
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChartBase>
  )
}

export default PieChart
