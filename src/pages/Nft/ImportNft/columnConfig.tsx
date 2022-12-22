export const columnConfig = ({ keys }: { keys: any }) => {
  const array: any = [
    ...keys.map((item: string) => ({
      dataKey: item,
    })),
  ]
  return { config: array }
}