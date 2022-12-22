import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './styles.css'
import { AgGridReact } from 'ag-grid-react'
import { v4 as uuid } from 'uuid'
import MultiselectEditor from './multiselectEditor'
import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

interface IProps {
  data: any
  columnConfig: any
}

function DataGrid({ data, columnConfig }: IProps) {
  const cellEditFn = useUpdateCacheThenServerProperty()
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      headerCheckboxSelection: true,
      rowDrag: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      editable: true,
    },
    {
      field: 'property_type',
      headerName: 'Type',
      editable: true,
    },
  ])

  const gridRef: any = useRef({})
  const [rowData, setRowData] = useState()
  const [cellBeingEdited, setCellBeingEdited] = useState(false)
  const [prevNode, setPrevNode] = useState({
    guid: null,
    colId: null,
  })

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      enableRowGroup: true,
      wrapText: true,
      autoHeight: true,
    }),
    [],
  )

  const handleAddColumn = (e: any) => {
    let column: any = {}
    if (e.target.value === 'text') {
      column = {
        field: 'text',
        editable: 'true',
      }
    } else {
      column = {
        field: 'select',
        editable: 'true',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: [1, 2],
        },
      }
    }

    gridRef.current.api.setColumnDefs([...columnDefs, column])
    setColumnDefs((state) => [...state, column])
  }

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

  const processDataFromClipboard = useCallback((params: any): string[][] | null => {
    const data = [...params.data]
    const emptyLastRow = data[data.length - 1][0] === '' && data[data.length - 1].length === 1
    if (emptyLastRow) {
      data.splice(data.length - 1, 1)
    }
    const lastIndex = gridRef.current!.api.getModel().getRowCount() - 1
    const focusedCell = gridRef.current!.api.getFocusedCell()
    const focusedIndex = focusedCell!.rowIndex
    if (focusedIndex + data.length - 1 > lastIndex) {
      const resultLastIndex = focusedIndex + (data.length - 1)
      const numRowsToAdd = resultLastIndex - lastIndex
      const rowsToAdd: any[] = []
      for (let i = 0; i < numRowsToAdd; i++) {
        const index = data.length - 1
        const row = data.slice(index, index + 1)[0]
        // Create row object
        const rowObject: any = {}
        let currentColumn: any = focusedCell!.column
        row.forEach((item: any) => {
          if (!currentColumn) {
            return
          }
          rowObject[currentColumn.colDef.field] = item
          currentColumn = gridRef.current!.columnApi.getDisplayedColAfter(currentColumn)
        })
        rowObject.guid = uuid()
        rowsToAdd.push(rowObject)
      }
      gridRef.current!.api.applyTransaction({ add: rowsToAdd })
    }
    return data
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <div className="ag-theme-alpine" style={{ width: '100%', height: '900px' }}>
        <AgGridReact
          ref={gridRef as any}
          rowData={data}
          columnDefs={columnConfig}
          enableRangeSelection={true}
          enableFillHandle={true}
          defaultColDef={defaultColDef}
          getRowId={(params: any) => params.data?.id}
          rowSelection="multiple"
          rowDragManaged={true}
          singleClickEdit={true}
          fillOperation={(params: any) => {
            // const newValue = params.newValue;
            // const field = params.colDef.field;

            cellEditFn({
              field: params.column.colDef.field,
              newValue: params.initialValues[0],
              params: params.rowNode,
            })

            return params.initialValues[0]
          }}
          onCellClicked={onCellClicked}
          // rowGroupPanelShow={"always"}
          suppressDragLeaveHidesColumns={true}
          suppressMakeColumnVisibleAfterUnGroup={true}
          suppressRowGroupHidesColumns={true}
          processDataFromClipboard={processDataFromClipboard}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          // onCellValueChanged={(e) => console.log(e)}
        />
      </div>
      {/* <div>
        <span>Add Column</span>
        <select
          name={"add-columns"}
          id={"add-columns"}
          onChange={handleAddColumn}
        >
          <option value={"text"}>Text</option>
          <option value={"select"}>Select</option>
        </select>
      </div> */}
    </div>
  )
}

export default DataGrid
