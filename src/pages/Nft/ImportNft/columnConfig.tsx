export const columnConfig = ({ keys, field_names }: { keys: any, field_names: any }) => {
  const array: any = [
    ...keys.map((item: string) => ({
      dataKey: item,
    })),
  ]
  return { config: array }
}