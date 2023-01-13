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

interface IProps {
  data: any
  columnConfig: any
  onRowDrag?: any
  groupPanel?: boolean
  addNewRow?: any
  deleteRow?: any
  refetch?: any
}

function DataGrid({
  data,
  columnConfig,
  onRowDrag,
  groupPanel,
  addNewRow,
  deleteRow,
  refetch,
}: IProps) {
  const [
    showGroupPanel,
    //  setShowGroupPanel
  ] = useState(false)
  // const cellEditFn = useUpdateCacheThenServerProperty()
  const hrefParts = window.location.href.split('/')
  const path = hrefParts[hrefParts.length - 1]

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
    refetch()
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

  const sideBar = useMemo(
    () => ({
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
            suppressColumnFilter: true,
            suppressColumnSelectAll: true,
            suppressColumnExpandAll: true,
          },
        },
      ],
      defaultToolPanel: 'false',
    }),
    [],
  )

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
        onGridReady={async (params: any) => {
          params.api.sizeColumnsToFit()

          const localHiddenData = localStorage.getItem('hideColumn')
          if (localHiddenData) {
            const JsonLocalData = await JSON.parse(localHiddenData)
            Object.entries(JsonLocalData[`${path}`]).forEach(function (key) {
              params.columnApi.setColumnVisible(key[0], key[1])
            })
          }
        }}
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
        sideBar={sideBar}
        onColumnVisible={(p: any) => {
          const value = p.visible
          const name = p.column.colId

          const prevLocalData = localStorage.getItem('hideColumn')
          let hiddenData = {}
          if (prevLocalData) {
            const jsonPrevData = JSON.parse(prevLocalData)
            hiddenData = { ...jsonPrevData, [path]: { ...jsonPrevData[path], [name]: value } }
          } else {
            hiddenData = { [path]: { [name]: value } }
          }
          localStorage.setItem(`hideColumn`, JSON.stringify(hiddenData))
        }}
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
