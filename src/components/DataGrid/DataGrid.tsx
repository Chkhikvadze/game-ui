import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './styles.css'
import { AgGridReact } from 'ag-grid-react'
import { useState, useMemo, useRef, useEffect } from 'react'

import useDataGrid from './useDataGrid'
import { AddRowButton } from './AddRowButton'

import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import processDataFromClipboard from './helpers/processDataFromClipboard'

interface IProps {
  data: any
  columnConfig: any
  onRowDrag?: any
  addNewRowButton?: boolean
  groupPanel?: boolean
}

function DataGrid({ data, columnConfig, onRowDrag, addNewRowButton = true, groupPanel }: IProps) {
  const [
    showGroupPanel,
    //  setShowGroupPanel
  ] = useState(false)
  const cellEditFn = useUpdateCacheThenServerProperty()
  const { addBlankRow } = useDataGrid()

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

  const addButtonRow = {
    type: 'addButton',
    order: data.length,
  }

  if (addNewRowButton) {
    columnConfig[0].cellRenderer = AddRowButton
    columnConfig[0].cellRendererParams = (params: any) => ({
      addRow: async () => {
        addBlankRow()
        // params.api.startEditingCell({
        //   rowIndex: data.length - 1,
        //   colKey: columnConfig[0].field,
        // })
      },
    })
  }

  return (
    <div className="ag-theme-alpine">
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
        fillOperation={(params: any) => {
          cellEditFn({
            field: params.column.colDef.field,
            newValue: params.initialValues[0],
            params: params.rowNode,
          })
          return params.initialValues[0]
        }}
        onCellClicked={onCellClicked}
        domLayout={'autoHeight'}
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
        pinnedBottomRowData={[addButtonRow]}
      />
      {/* <button onClick={() => addBlankRow()}>addRow</button> */}
    </div>
  )
}

export default DataGrid
