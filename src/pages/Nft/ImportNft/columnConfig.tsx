export const columnConfig = ({ keys }: { keys: any }) => {
  const array: any = [
    ...keys.map((item: string) => ({
      dataKey: item,
    })),
  ]
  return { config: array }
}

export const importedColumnConfig = (array: any) => {
  const { __typename, id, ...args } = array[0] ?? {}
  return [...Object.keys(args).map(item => ({ dataKey: item, name: item }))]
}

export const notImportedColumnConfig = (array: any) => {
  const { __typename, ...args } = array[0] ?? {}
  return [...Object.keys(args).map(item => ({ dataKey: item, name: item }))]
}