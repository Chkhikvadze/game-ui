interface columnProps {
  headerName: string
  fieldName: string
  cellEditFn: any
  filter?: any
  cellRenderer?: any
  cellRendererParams?: any
  cellEditor?: any
  cellEditorParams?: any
  icon?: any
  selectAllButton?: boolean
  valueGetter?: any
  rowDrag?: any
  editable?: any
  cellEditorPopup?: any
  resizable: any
  suppressSizeToFit?: any
  minWidth?: any
  checkboxSelection?: any
}

const columnGenerator = ({
  headerName,
  fieldName,
  selectAllButton = false,
  editable = true,
  cellEditFn,
  rowDrag = false,
  cellRenderer = null,
  cellRendererParams,
  cellEditor = 'agTextCellEditor',
  cellEditorParams,
  icon = '',
  filter = true,
  cellEditorPopup,
  resizable,
  suppressSizeToFit,
  minWidth,
  checkboxSelection,
}: columnProps) => ({
  headerName: headerName,
  field: fieldName,
  headerCheckboxSelection: selectAllButton,
  editable: editable,
  rowDrag: rowDrag,
  filter: filter,
  resizable: resizable,
  minWidth: minWidth,
  suppressSizeToFit: suppressSizeToFit,
  checkboxSelection: checkboxSelection,
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
  cellRenderer: cellRenderer,
  cellRendererParams: cellRendererParams,
  cellEditor: cellEditor,
  cellEditorParams: cellEditorParams,
  cellEditorPopup: cellEditorPopup,
  headerComponentParams: {
    template: ` <div class="ag-cell-label-container" role="presentation">
          <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
          <div ref="eLabel" class="ag-header-cell-label" role="presentation">
          <img src=${icon} width=15></img>
              <span ref="eText" class="ag-header-cell-text"></span>
              <span ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
              <span ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
              <span ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
              <span ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
              <span ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
          </div>
      </div>`,
  },
})

export default columnGenerator
