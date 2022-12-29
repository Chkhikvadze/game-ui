export const AddRowButton = (props: any) => {
  if (props?.data?.type) {
    return <button onClick={() => props.addRow()}>ADD NEW ROW</button>
  }
  return <span>{props.value}</span>
}
