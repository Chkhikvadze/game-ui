import columnGenerator from 'components/DataGrid/helpers/columnGenerator'

import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import { property_type_options } from 'utils/constants'

import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  showProps: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols, showProps }: configTypes) => {
  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.md}
      customColor="rgba(255, 255, 255, 0.8)"
    />
  )

  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        headerComponent: HeaderComponent,
        cellRenderer: TextCellRenderer,
        editable: true,
        cellEditor: TextFieldEditor,
        filter: 'agTextColumnFilter',
        resizable: true,
        suppressSizeToFit: true,
        hide: showProps,

        valueGetter: (data: any) => {
          // console.log('data', data)
          if (data.data?.custom_props?.[key]) {
            return data.data.custom_props?.[key]['prop_value']
          }
        },
        valueSetter: (params: any) => {
          let editedProps = {}
          const newValue = params.newValue
          const field = 'custom_props'
          if (params.data.custom_props === null) {
            editedProps = { [params.colDef.field]: { prop_value: newValue } }
          } else {
            // const field = params.colDef.field

            let currentProps = params.data.custom_props

            const oldProp = params.data.custom_props[`${params.colDef.field}`]

            const newProp = { ...oldProp, prop_value: newValue }

            editedProps = { ...currentProps, [`${params.colDef.field}`]: newProp }
          }

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
    headerComponent: HeaderCheckbox,
    cellRenderer: RowCheckbox,
    width: 60,
    suppressSizeToFit: true,
  }

  const nameColumn = columnGenerator({
    headerName: 'Name',
    fieldName: 'name',
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    cellEditor: TextFieldEditor,
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
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    cellEditor: TextareaEditor,
    cellEditorPopup: true,
    // cellEditorParams: {
    //   cols: 30,
    //   rows: 2,
    // },

    cellEditFn,
    icon: starIcon,
    minWidth: 150,
  })

  const typeColumn = columnGenerator({
    headerName: 'Type',
    fieldName: 'property_type',
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    cellEditFn,
    cellEditorPopup: true,
    cellEditor: MultiselectEditor,
    cellEditorParams: {
      optionsArr: property_type_options,
      // formatValue: property_type_options?.map((option: any) => option.label),
    },
    icon: starIcon,
    width: 100,
    minWidth: 100,
  })

  return [CheckboxSelect, nameColumn, descriptionColumn, typeColumn, ...propCols]
}
