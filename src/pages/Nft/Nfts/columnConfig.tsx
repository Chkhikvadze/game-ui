type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols }: configTypes) => [
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
    headerName: 'Supply',
    editable: true,
    field: 'supply',
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
    headerName: 'Properties',
    editable: true,
    field: 'properties',
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
    headerName: 'Parent NFT',
    editable: true,
    field: 'parent_id',
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
  // ...propCols,
]
