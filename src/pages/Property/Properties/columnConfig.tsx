import addRowButton from 'components/DataGrid/addRowButton'
import MultiselectEditor from 'components/DataGrid/multiselectEditor'
import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'

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

  return [
    {
      headerName: 'Name',
      field: 'name',
      headerCheckboxSelection: true,
      editable: (params: any) => {
        if (params.data.type) {
          return false
        }
        return true
      },
      rowDrag: true,
      filter: true,
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
      headerComponentParams: {
        template: ` <div class="ag-cell-label-container" role="presentation">
        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
        <img src=${starIcon} width=15></img>
            <span ref="eText" class="ag-header-cell-text"></span>
            <span ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
            <span ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
            <span ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
            <span ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
        </div>
    </div>`,
      },
    },
    {
      headerName: 'Description',
      field: 'description',
      editable: true,
      filter: true,
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
      headerComponentParams: {
        template: ` <div class="ag-cell-label-container" role="presentation">
        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
        <img src=${starIcon} width=15></img>
            <span ref="eText" class="ag-header-cell-text"></span>
            <span ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
            <span ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
            <span ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
            <span ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
        </div>
    </div>`,
      },
    },
    {
      headerName: 'Type',
      editable: true,
      filter: true,
      field: 'property_type',
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        optionsArr: ['Array', 'Object', 'String', 'Number'],
        isMulti: false,
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
      headerComponentParams: {
        template: ` <div class="ag-cell-label-container" role="presentation">
        <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
        <div ref="eLabel" class="ag-header-cell-label" role="presentation">
        <img src=${starIcon} width=15></img>
            <span ref="eText" class="ag-header-cell-text"></span>
            <span ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
            <span ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
            <span ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
            <span ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
            <span ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
        </div>
    </div>`,
      },
    },
    ...propCols,
  ]
}
