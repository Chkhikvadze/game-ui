import {
  BarChart as BarChartBase,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  Cell,
  Legend,
} from 'recharts'

const YAxisTick = (props: any) => {
  const { y, payload } = props
  let newNumber
  if (payload.value > 1000000000) {
    newNumber = `${(payload.value / 1000000000).toString()}B`
  } else if (payload.value > 1000000) {
    newNumber = `${(payload.value / 1000000).toString()}M`
  } else if (payload.value > 1000) {
    newNumber = `${(payload.value / 1000).toString()}K`
  } else if (payload.value === 0) {
    newNumber = `${payload.value.toString()}`
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

type BarChartProps = {
  data: Record<string, unknown>[]
}

const BarChart = ({ data }: BarChartProps) => {
  return (
    <BarChartBase width={500} height={300} data={data}>
      <XAxis dataKey='name' stroke='#fff' axisLine={false} tickLine={false} dy={10} />

      <YAxis axisLine={false} tickLine={false} tick={<YAxisTick />} />
      {/* <YAxis axisLine={false} tickLine={false} /> */}

      {/* <Bar
        radius={8}
        dataKey='players'
        fill='#00FF7F'
        barSize={26}
        // style={{ position: 'absolute', zIndex: 100 }}
      /> */}

      <Bar
        radius={8}
        dataKey='value'
        // stackId='a'
        fill='#00FF7F'
        barSize={26}
        // style={{ position: 'absolute', zIndex: 100 }}
      />

      {/* <Bar
        radius={8}
        dataKey='pv'
        stackId='a'
        fill='#00FF7F'
        barSize={26}
        // style={{ position: 'absolute', zIndex: 100 }}
      />

      <Bar
        radius={[8, 8, 0, 0]}
        dataKey='uv'
        stackId='a'
        fill='#8D79F6'
        barSize={26}
        style={{ transform: `translate(0, 5px)` }}
      />

      <Bar
        radius={[8, 8, 0, 0]}
        dataKey='ad'
        stackId='a'
        fill='#a08cfb55'
        barSize={26}
        style={{ transform: 'translate(0px, 10px)' }}
      /> */}
    </BarChartBase>
  )
}

export default BarChart
