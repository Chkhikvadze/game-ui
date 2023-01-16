import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './styles.css'
import { AgGridReact } from 'ag-grid-react'
import { useState, useMemo, useRef, useEffect } from 'react'

// import useDataGrid from './useDataGrid'
// import { AddRowButton } from './AddRowButton'

// import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import processDataFromClipboard from './helpers/processDataFromClipboard'
import { StyledButton } from 'modals/modalStyle'
import styled from 'styled-components'
import { useModal } from 'hooks'

interface IProps {
  data: any
  columnConfig: any
  onRowDrag?: any
  groupPanel?: boolean
  addNewRow?: any
  deleteRow?: any
  refetch?: any
  openEditModal?: any
}

function DataGrid({
  data,
  columnConfig,
  onRowDrag,
  groupPanel,
  addNewRow,
  deleteRow,
  refetch,
  openEditModal,
}: IProps) {
  const [
    showGroupPanel,
    //  setShowGroupPanel
  ] = useState(false)
  // const cellEditFn = useUpdateCacheThenServerProperty()
  const { openModal, closeModal } = useModal()
  const gridRef: any = useRef({})
  const [cellBeingEdited, setCellBeingEdited] = useState(false)
  const [prevNode, setPrevNode] = useState({
    guid: null,
    colId: null,
  })

  useEffect(() => {
    if (gridRef.current.api) {
      gridRef.current.api.refreshToolPanel()
    }
  }, [showGroupPanel])

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      enableRowGroup: true,
      wrapText: true,
      autoHeight: true,
    }),
    [],
  )

  const onCellClicked = (e: any) => {
    setPrevNode({
      colId: e.column.colId,
      guid: e.data.guid,
    })

    if (e.column.colId === prevNode.colId && e.data.guid === prevNode.guid) {
      setCellBeingEdited(true)
      return
    }

    if (!cellBeingEdited) {
      setCellBeingEdited(true)
    } else {
      gridRef.current.api.stopEditing()
      setCellBeingEdited(false)
    }
  }

  const onRemoveSelected = async () => {
    const selectedRowData = gridRef.current.api.getSelectedRows()
    const mappedItems = selectedRowData.map((item: any) => item)

    // console.log(gridRef.current.api)
    // await gridRef.current.api.applyTransaction({ remove: selectedRowData })
    // console.log('selectedRowData', selectedRowData)
    // console.log('mappedItems', mappedItems)
    // refetch()
    await mappedItems.map(async (item: any) => await deleteRow(item.id))
    await refetch()
    // gridRef.current.api.refreshClientSideRowModel()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data.id
    const result = [
      ...params.defaultItems,

      {
        // custom item
        name: 'Delete',
        // disabled: true,
        action: () => {
          // console.log('params', params.node.data.id)
          // console.log('params', params)
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
            refetch()
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: 'Are you sure you want to delete this row?',
              title: 'Delete Row',
            },
          })
        },
      },
      {
        // custom item
        name: 'Edit',
        action: () => {
          // openEditModal()
          openEditModal(itemId)
        },
      },
      // {
      //   name: 'Open in a new tab',
      //   action: () => {
      //     window.open(params.node.data.)
      //   },
      // },
    ]

    return result
  }

  //do not delete this code
  // const handleAddRow = useCallback(async () => {
  //   const res = gridRef.current.api.getLastDisplayedRow()
  //   console.log(res)
  //   // gridRef.current.api.setFocusedCell(res, 'name')
  //   gridRef.current.api.startEditingCell({
  //     rowIndex: res,
  //     colKey: 'name',
  //     // set to 'top', 'bottom' or undefined
  //     // rowPinned: true,
  //     // key: key,
  //     // charPress: char,
  //   })
  // }, [])

  const popupParent = useMemo(() => document.querySelector('body'), [])

  return (
    <StyledDiv className="ag-theme-alpine">
      <StyledButton className="bt-action" onClick={onRemoveSelected}>
        Remove Selected
      </StyledButton>
      <AgGridReact
        ref={gridRef as any}
        rowData={[...data]}
        columnDefs={columnConfig}
        enableRangeSelection={true}
        enableFillHandle={true}
        defaultColDef={defaultColDef}
        getRowId={(params: any) => params.data?.id}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        singleClickEdit={true}
        onGridReady={(params: any) => params.api.sizeColumnsToFit()}
        // fillOperation={(params: any) => {
        //   cellEditFn({
        //     field: params.column.colDef.field,
        //     newValue: params.initialValues[0],
        //     params: params.rowNode,
        //   })
        //   return params.initialValues[0]
        // }}
        onCellClicked={onCellClicked}
        // domLayout={'autoHeight'}
        rowGroupPanelShow={groupPanel ? 'always' : 'never'}
        suppressDragLeaveHidesColumns={true}
        suppressMakeColumnVisibleAfterUnGroup={true}
        suppressRowGroupHidesColumns={true}
        processDataFromClipboard={(params) => processDataFromClipboard(params, gridRef)}
        undoRedoCellEditing={true}
        undoRedoCellEditingLimit={20}
        getRowClass={(params) => {
          if (params?.data?.type) {
            return 'add-row-edit-button'
          }
          return 'ag-row'
        }}
        popupParent={popupParent}
        getContextMenuItems={getContextMenuItems}
      />
      {/* <StyledButton onClick={addNewRow}>Add new row</StyledButton> */}
    </StyledDiv>
  )
}

export default DataGrid

const StyledDiv = styled.div`
  height: calc(100% - 120px);
  width: 100%;
`
