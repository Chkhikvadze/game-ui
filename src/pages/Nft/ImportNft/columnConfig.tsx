export const columnConfig = ({ keys }: { keys: any }) => {
  const array: any = [
    ...keys.map((item: string) => ({
      dataKey: item,
    })),
  ]
  return { config: array }
}

export const importedColumnConfig = (array: any) => {
  const { __typename, id, properties, custom_props, parent_id, asset_url, ...args } = array[0] ?? {}
  return [
    ...Object.keys(args).map(item => ({ dataKey: item, name: item })), 
    { dataKey: (row: any) => row.properties.map((item: any) => item.name), name: 'properties' },
    { dataKey: (row: any) => row.custom_props.map((item: any) => item[Object.keys(item)[0]]), name: 'custom_field' },
    // eslint-disable-next-line jsx-a11y/alt-text
    { dataKey: (row: any) => !row.asset_url ? <img width="50px" src={row.asset_url} /> : '', name: 'asset_url' },
    // ...custom_props.map((i: any) => ({ dataKey: i[Object.keys(i)[0]], name: i[Object.keys(i)[0]] })),
    // { dataKey: (row: any) => Object.keys(row.custom_props) },
  ]
}

export const notImportedColumnConfig = (array: any) => {
  const { __typename, custom_props, asset_url, parent_id, ...args } = array[0] ?? {}
  return [
    ...Object.keys(args).map(item => ({ dataKey: item, name: item })),
    { dataKey: (row: any) => row.custom_props.map((item: any) => item[Object.keys(item)[0]]), name: 'custom_field' },
    // eslint-disable-next-line jsx-a11y/alt-text
    { dataKey: (row: any) => !row.asset_url ? <img width="50px" src={row.asset_url} /> : '', name: 'asset_url' },
  ]
}