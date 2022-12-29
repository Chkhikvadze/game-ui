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
  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        editable: true,
        filter: true,
        valueGetter: (data: any) => {
          if (data.data?.custom_property_props?.[key]) {
            return data.data.custom_property_props?.[key]['prop_value']
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

  const nameColumn = columnGenerator({
    headerName: 'Name',
    fieldName: 'name',
    editable: (params: any) => {
      if (params.data.type) {
        return false
      }
      return true
    },
    cellEditFn,
    icon: starIcon,
    selectAllButton: true,
  })

  const descriptionColumn = columnGenerator({
    headerName: 'Description',
    fieldName: 'description',
    cellEditFn,
    icon: starIcon,
  })

  const typeColumn = columnGenerator({
    headerName: 'Type',
    fieldName: 'property_type',
    cellEditFn,
    // cellRenderer: 'genderCellRenderer',
    cellEditor: 'agRichSelectCellEditor',
    cellEditorPopup: true,
    cellEditorParams: {
      values: property_type_options?.map((option: any) => option.value),
      // formatValue: property_type_options?.map((option: any) => option.label),
    },
    icon: starIcon,
  })

  return [nameColumn, descriptionColumn, typeColumn, ...propCols]
}
