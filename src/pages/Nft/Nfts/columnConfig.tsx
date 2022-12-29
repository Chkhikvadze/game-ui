import addRowButton from 'components/DataGrid/AddRowButton'
import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import MultiselectEditor from 'components/DataGrid/MultiselectEditor'
// import FileUploadField from 'atoms/FileUploadField'
import Select from 'react-select'

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
  // console.log('nftOption', nftOption)
  return [
    {
      headerName: 'Name',
      field: 'name',
      headerCheckboxSelection: true,
      gridOptions: {
        onGridReady(params: any) {
          params.api.sizeColumnsToFit()
        },
      },
      editable: (params: any) => {
        if (params.data.type) {
          return false
        }
        return true
      },
      resizable: true,
      // onGridReady: (props: any) => props.api.sizeColumnsToFit(),
      rowDrag: true,
      filter: 'agTextColumnFilter',
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
    // {
    //   headerName: 'Asset',
    //   field: 'asset_url',
    //   editable: true,
    //   cellRenderer: (p: any) => <FileUploadField img={p.value} fileUploadType={''} />,
    //   valueSetter: (params: any) => {
    //     const newValue = params.newValue
    //     const field = params.colDef.field

    //     cellEditFn({
    //       field,
    //       newValue,
    //       params,
    //     })
    //     return true
    //   },
    // },
    {
      headerName: 'Description',
      field: 'description',
      editable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
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
      filter: 'agNumberColumnFilter',
      valueParser: (params: any) => Number(params.newValue),
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
      width: 120,
      minWidth: 80,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Price',
      editable: true,
      resizable: true,
      field: 'price',
      filter: 'agNumberColumnFilter',
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
      width: 120,
      minWidth: 80,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Minted amount',
      resizable: true,
      field: 'mintedAmount',
      filter: 'agNumberColumnFilter',
      headerComponentParams: {
        template: templateValue,
      },
      width: 165,
      minWidth: 80,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Status',
      resizable: true,
      field: 'status',
      filter: 'agTextColumnFilter',
      headerComponentParams: {
        template: templateValue,
      },
      maxWidth: 120,
      minWidth: 80,
      suppressSizeToFit: true,
    },

    {
      headerName: 'Properties',
      editable: true,
      resizable: true,
      field: 'properties',
      filter: 'agTextColumnFilter',
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
      resizable: true,
      filter: 'agTextColumnFilter',
      field: 'parent_id',
      cellRenderer: (p: any) =>
        nftOption
          ?.filter((item: any) => item.value === p.value)
          .map(function (obj: any) {
            return obj.label
          }),
      cellEditor: Select,
      cellEditorParams: {
        options: nftOption,
      },
      valueSetter: (params: any) => {
        const newValue = params.newValue.toString()
        const field = params.colDef.field
        console.log('porams', params)
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
      suppressSizeToFit: true,
    },
    // ...propCols,
  ]
}
