import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import './styles.css'
import { AgGridReact } from 'ag-grid-react'
import { useState, useMemo, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'

// import { useTranslation } from 'react-i18next'

// import useDataGrid from './useDataGrid'
// import { AddRowButton } from './AddRowButton'

// import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import processDataFromClipboard from './helpers/processDataFromClipboard'
import styled from 'styled-components'

interface IProps {
  data: any
  columnConfig: any
  groupPanel?: boolean
  ref?: any
  contextMenu?: any
  noBorder?: boolean
}

const DataGrid = forwardRef(
  ({ data, columnConfig, groupPanel, contextMenu, noBorder = false }: IProps, ref) => {
    const [
      showGroupPanel,
      //  setShowGroupPanel
    ] = useState(false)
    // const cellEditFn = useUpdateCacheThenServerProperty()
    const hrefParts = window.location.href.split('/')
    const path = hrefParts[hrefParts.length - 1]

    // const { t } = useTranslation()

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

    const defaultContextMenu = (params: any) => {
      const result = [...params.defaultItems]

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

    // const sideBar = useMemo(
    //   () => ({
    //     toolPanels: [
    //       {
    //         id: 'columns',
    //         labelDefault: 'Columns',
    //         labelKey: 'columns',
    //         iconKey: 'columns',
    //         toolPanel: 'agColumnsToolPanel',
    //         toolPanelParams: {
    //           suppressRowGroups: true,
    //           suppressValues: true,
    //           suppressPivots: true,
    //           suppressPivotMode: true,
    //           suppressColumnFilter: true,
    //           suppressColumnSelectAll: true,
    //           suppressColumnExpandAll: true,
    //         },
    //       },
    //     ],
    //     defaultToolPanel: 'false',
    //   }),
    //   [],
    // )

    const popupParent = useMemo(() => document.querySelector('body'), [])

    useImperativeHandle(ref, () => ({
      getSelectedRows() {
        const selectedRowData = gridRef.current.api.getSelectedRows()
        const mappedItems = selectedRowData.map((item: any) => item)

        return mappedItems
      },

      getAllData() {
        const allData: any = []

        gridRef.current.api.forEachNode((node: any) => {
          // console.log('nodessssssssss', node)
          const item = node.data
          const index = node.rowIndex

          allData.push({ item: item, index: index })
        })

        // console.log('allData', allData)
        return allData
      },

      refreshFilter() {
        gridRef.current.api.setFilterModel(null)
      },
    }))

    return (
      <StyledDiv className={noBorder ? `ag-theme-alpine no-border` : `ag-theme-alpine`}>
        <AgGridReact
          ref={gridRef as any}
          rowData={[...data]}
          columnDefs={columnConfig}
          enableRangeSelection={true}
          enableFillHandle={true}
          defaultColDef={defaultColDef}
          getRowId={(params: any) => params.data?.id}
          rowSelection='multiple'
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
          processDataFromClipboard={params => processDataFromClipboard(params, gridRef)}
          undoRedoCellEditing={true}
          undoRedoCellEditingLimit={20}
          getRowClass={params => {
            if (params?.data?.type) {
              return 'add-row-edit-button'
            }
            return 'ag-row'
          }}
          // sideBar={sideBar}
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
          popupParent={popupParent}
          getContextMenuItems={contextMenu ? contextMenu : defaultContextMenu}
          stopEditingWhenGridLosesFocus={true}
        />
      </StyledDiv>
    )
  },
)

export default DataGrid

const StyledDiv = styled.div`
  height: calc(100% - 120px);
  width: 100%;
`
