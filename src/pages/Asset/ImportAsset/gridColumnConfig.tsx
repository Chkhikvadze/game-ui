// import { AddRowButton } from 'components/DataGrid/AddRowButton'
// import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
// import MultiselectEditor from 'components/DataGrid/MultiselectEditor'
// import styled from 'styled-components'
// import FileUploadField from 'atoms/FileUploadField'

// type configTypes = {
//   // handleDelete: Function
//   // cellEditFn: Function
//   // customPropCols: any
//   // // addBlankRow: any
//   // assetOption: any
//   // propertiesOptions: any
//   data: any
//   response: any
// }

// eslint-disable-next-line import/no-anonymous-default-export
export const gridColumnConfig = (data: any) => {
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

  // const valueParserHandler = (params: any) => {
  //   if (params.newValue.length === 0) {
  //     return null
  //   } else if (isNaN(Number(params.newValue))) {
  //     return params.oldValue
  //   } else {
  //     return Number(params.newValue)
  //   }
  // }

  // const fieldNames = data[0]
  if (data.length) {
    const columnFields = Object.keys(data[0]).map((item: any) => ({
      headerName: `${item}`,
      field: `${item}`,
      // resizable: true,
    }))

    return [...columnFields]
  }
}

export const gridImportedConfig = (data: any) => {
  if (data.length) {
    const columnFields = Object.keys(data[0]).map((item: any) => {
      // let column = {}

      const column = {
        headerName: `${item}`,
        field: `${item}`,
        cellRenderer: (p: any) => {
          let itemValue = null
          if (Array.isArray(p.value)) {
            itemValue = p.value?.map((value: any) => <>{value.name}</>)
          } else {
            itemValue = p.value
          }
          return itemValue
        },
      }

      return column
    })
    const filteredColumnFields = columnFields.filter(
      (item: any) =>
        item.headerName !== '__typename' &&
        item.headerName !== 'id' &&
        item.headerName !== 'parent_id' &&
        item.headerName !== 'error' &&
        item.headerName !== 'message',
    )

    return [...filteredColumnFields]
  }
}
// export const gridNotImportedConfig = (response: any) => {
//   if (response.success) {
//     const columnFields = Object.keys(response?.not_Imported[0]).map((item: any) => {
//       // let column = {}

//       const column = {
//         headerName: `${item}`,
//         field: `${item}`,
//         cellRenderer: (p: any) => {
//           let itemValue = null
//           if (Array.isArray(p.value)) {
//             itemValue = p.value?.map((value: any) => <>{value.name}</>)
//           } else {
//             itemValue = p.value
//           }
//           return itemValue
//         },
//       }

//       return column
//     })
//     const filteredColumnFields = columnFields.filter(
//       (item: any) => item.headerName !== '__typename' && item.headerName !== 'id',
//     )

//     return [...filteredColumnFields]
//   }
// }
