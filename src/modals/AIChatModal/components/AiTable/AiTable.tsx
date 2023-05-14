import './style.css'

const Card = ({ value }: any) => {
  return <div className='card-container'>{value}</div>
}

const AiTable = ({ data }: any) => {
  return (
    <table className='styled-table'>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: any) => (
          <tr key={index}>
            {Object.values(item).map((value: any, valueIndex) => {
              const isArray = Array.isArray(value)

              return (
                <td key={valueIndex}>
                  {isArray
                    ? value.map(item => <Card className='card-container' value={item} />)
                    : value}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AiTable
