import styled from 'styled-components'
import addRowButton from 'components/DataGrid/addRowButton'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  addBlankRow: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols, addBlankRow }: configTypes) => {
  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        editable: false,
        valueGetter: (data: any) => {
          if (data.data?.custom_props[key]) {
            return data.data.custom_props[key]['prop_value']
          }
        },
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
      }
    })
  }

  return [
    {
      headerName: 'Name',
      field: 'name',
      editable: (params: any) => {
        if (params.data.type) {
          return false
        }
        return true
      },
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
      cellRenderer: addRowButton,
      cellRendererParams: {
        addRow: addBlankRow,
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
