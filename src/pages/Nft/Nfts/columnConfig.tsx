import addRowButton from 'components/DataGrid/addRowButton'
import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import MultiselectEditor from 'components/DataGrid/multiselectEditor'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  addBlankRow: any
  nftOption: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, customPropCols, addBlankRow, nftOption }: configTypes) => {
  const templateValue = ` <div class="ag-cell-label-container" role="presentation">
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
  </div>`

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
        template: templateValue,
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
      headerComponentParams: {
        template: templateValue,
      },
    },
    {
      headerName: 'Supply',
      editable: true,
      resizable: true,
      field: 'supply',
      valueSetter: (params: any) => {
        const newValue = parseFloat(params.newValue)
        const field = params.colDef.field

        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
      headerComponentParams: {
        template: templateValue,
      },
    },
    {
      headerName: 'Price',
      editable: true,
      resizable: true,
      field: 'price',
      valueSetter: (params: any) => {
        const newValue = parseFloat(params.newValue)
        const field = params.colDef.field

        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
      headerComponentParams: {
        template: templateValue,
      },
    },
    {
      headerName: 'Status',
      // resizable: true,
      field: 'status',
      headerComponentParams: {
        template: templateValue,
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
      headerComponentParams: {
        template: templateValue,
      },
    },
    {
      headerName: 'Parent NFT',
      editable: true,
      filter: true,
      field: 'parent_id',
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        optionsArr: nftOption?.map((item: any) => item.value),
        isMulti: false,
        cellRenderer: nftOption?.map((item: any) => item.label),
      },
      valueSetter: (params: any) => {
        const newValue = params.newValue
        const field = params.colDef.field
        // console.log('porams', params)
        cellEditFn({
          field,
          newValue,
          params,
        })
        return true
      },
      headerComponentParams: {
        template: templateValue,
      },
    },
    // ...propCols,
  ]
}
