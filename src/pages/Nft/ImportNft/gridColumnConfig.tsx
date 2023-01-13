// import { AddRowButton } from 'components/DataGrid/AddRowButton'
// import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
// import MultiselectEditor from 'components/DataGrid/MultiselectEditor'
// import styled from 'styled-components'
// import FileUploadField from 'atoms/FileUploadField'

type configTypes = {
  // handleDelete: Function
  // cellEditFn: Function
  // customPropCols: any
  // // addBlankRow: any
  // nftOption: any
  // propertiesOptions: any
  data: any
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ data }: configTypes) => [
  // console.log('propertiesOptions', propertiesOptions)
  // const templateValue = ` <div class="ag-cell-label-container" role="presentation">
  // <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" aria-hidden="true"></span>
  // <div ref="eLabel" class="ag-header-cell-label" role="presentation">
  // <img src=${starIcon} width=15></img>
  //     <span ref="eText" class="ag-header-cell-text"></span>
  //     <span ref="eFilter" class="ag-header-icon ag-header-label-icon ag-filter-icon" aria-hidden="true"></span>
  //     <span ref="eSortOrder" class="ag-header-icon ag-header-label-icon ag-sort-order" aria-hidden="true"></span>
  //     <span ref="eSortAsc" class="ag-header-icon ag-header-label-icon ag-sort-ascending-icon" aria-hidden="true"></span>
  //     <span ref="eSortDesc" class="ag-header-icon ag-header-label-icon ag-sort-descending-icon" aria-hidden="true"></span>
  //     <span ref="eSortNone" class="ag-header-icon ag-header-label-icon ag-sort-none-icon" aria-hidden="true"></span>
  // </div>
  // </div>`
  // console.log('customPropCols', customPropCols)

  // const cellEditFn = async (field: any, newValue: any, params: any) => {
  //   const item = data[params.data.id - 1]
  //   const newItem = { ...item, [`${field}`]: newValue }
  //   await data.splice(params.data.id - 1, 1, newItem)
  //   // console.log('data', data)
  //   // console.log('params', params)
  //   params.api.refreshCells({ force: true })
  // }

  // const cellRendererHandler = (params: any) => {
  //   const field = params.colDef.field
  //   const id = params.data.id
  //   return data[id - 1][`${field}`]
  // }

  // const valueSetterHandler = (params: any) => {
  //   const newValue = params.newValue
  //   const field = params.colDef.field

  //   cellEditFn(field, newValue, params)
  //   // console.log(newValue)
  //   return newValue
  // }

  // const valueParserHandler = (params: any) => {
  //   if (params.newValue.length === 0) {
  //     return null
  //   } else if (isNaN(Number(params.newValue))) {
  //     return params.oldValue
  //   } else {
  //     return Number(params.newValue)
  //   }
  // }
  // {
  //   headerCheckboxSelection: true,
  //   checkboxSelection: true,
  //   width: 50,
  //   suppressSizeToFit: true,
  // },
  {
    headerName: 'Name',
    field: 'Name *',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueSetter: valueSetterHandler,

    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Token ID',
    field: 'Token Id',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueParser: valueParserHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Price',
    field: 'Price',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueParser: valueParserHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Number of copies',
    field: 'Number of copies',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueParser: valueParserHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Asset URL',
    field: 'Asset URL',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Description',
    field: 'Description',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Properties',
    field: 'Properties',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Custom_column',
    field: 'Custom_column',
    // editable: true,
    resizable: true,

    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
  {
    headerName: 'Category',
    field: 'category',
    // editable: true,
    resizable: true,
    // cellRenderer: cellRendererHandler,
    // valueSetter: valueSetterHandler,
    //   minWidth: 100,
    //   width: 100,
    //   suppressSizeToFit: true,
  },
]

// const StyledPropertyContainer = styled.div`
//   display: flex;
//   /* flex-direction: column; */
//   flex-wrap: wrap;
//   gap: 5px;
//   align-items: flex-start;
//   margin-top: 10px;
//   margin-bottom: 10px;
// `
// const StyledPropertyItem = styled.div`
//   border: 1px solid black;
//   border-radius: 2px;
//   font-size: 12px;
//   padding: 2px;
//   line-height: 12px;
// `

// const StyledImg = styled.img`
//   width: 35px;
//   height: 35px;
// `
