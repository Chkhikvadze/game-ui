import columnGenerator from 'components/DataGrid/helpers/columnGenerator'

import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import { property_type_options } from 'utils/constants'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols }: configTypes) => {
  // console.log('customPropCols', customPropCols)
  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        editable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        suppressSizeToFit: true,

        valueGetter: (data: any) => {
          // console.log('data', data)
          if (data.data?.custom_props?.[key]) {
            return data.data.custom_props?.[key]['prop_value']
          }
        },
        valueSetter: (params: any) => {
          const newValue = params.newValue
          // const field = params.colDef.field
          const field = 'custom_props'

          let currentProps = params.data.custom_props

          const oldProp = params.data.custom_props[`${params.colDef.field}`]

          const newProp = { ...oldProp, prop_value: newValue }
          // console.log('newProp', newProp)

          const editedProps = { ...currentProps, [`${params.colDef.field}`]: newProp }
          // console.log(editedProps)

          cellEditFn({
            field,
            newValue: editedProps,
            params,
          })
          return true
        },
        width: 100,
        minWidth: 100,
      }
    })
  }

  const CheckboxSelect = {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    width: 50,
    suppressSizeToFit: true,
  }

  const nameColumn = columnGenerator({
    headerName: 'Name',
    fieldName: 'name',
    resizable: true,
    // checkboxSelection: true,
    filter: 'agTextColumnFilter',
    editable: (params: any) => {
      if (params.data.type) {
        return false
      }
      return true
    },
    cellEditFn,
    icon: starIcon,
    minWidth: 140,
    // selectAllButton: true,
  })

  const descriptionColumn = columnGenerator({
    headerName: 'Description',
    fieldName: 'description',
    resizable: true,
    filter: 'agTextColumnFilter',
    cellEditor: 'agLargeTextCellEditor',
    cellEditorParams: {
      cols: 30,
      rows: 2,
    },
    cellEditFn,
    icon: starIcon,
    minWidth: 150,
  })

  const typeColumn = columnGenerator({
    headerName: 'Type',
    fieldName: 'property_type',
    resizable: true,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    cellEditFn,
    // cellRenderer: 'genderCellRenderer',
    cellEditor: 'agRichSelectCellEditor',
    cellEditorPopup: true,

    cellEditorParams: {
      values: property_type_options?.map((option: any) => option.value),
      // formatValue: property_type_options?.map((option: any) => option.label),
    },
    icon: starIcon,
    width: 100,
    minWidth: 100,
  })

  return [CheckboxSelect, nameColumn, descriptionColumn, typeColumn, ...propCols]
}
