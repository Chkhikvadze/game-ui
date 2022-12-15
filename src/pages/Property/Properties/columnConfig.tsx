import styled from 'styled-components'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols }: configTypes) => {
  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        editable: true,
        valueGetter: (data: any) => {
          if (data.data?.custom_props[key]) {
            return data.data.custom_props[key]['prop_value']
          }
        },
        valueSetter: (params: any) => {
          const newValue = params.newValue
          const field = params.colDef.field

          console.log(newValue, field)

          cellEditFn({
            field,
            newValue,
            params,
          })
          return true
        },
      }
    })
  }

  return [
    {
      headerName: 'Name',
      field: 'name',
      editable: true,
      valueSetter: (params: any) => {
        const newValue = params.newValue
        const field = params.colDef.field

        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      editable: true,
      valueSetter: (params: any) => {
        const newValue = params.newValue
        const field = params.colDef.field

        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
    },
    {
      headerName: 'Type',
      editable: true,
      field: 'property_type',
      valueSetter: (params: any) => {
        const newValue = params.newValue
        const field = params.colDef.field

        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
    },
    ...propCols,
  ]
}
