// import { AddRowButton } from 'components/DataGrid/AddRowButton'
import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import MultiselectEditor from 'components/DataGrid/MultiselectEditor'
import styled from 'styled-components'
// import FileUploadField from 'atoms/FileUploadField'

import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Button from '@l3-lib/ui-core/dist/Button'
// import Heading from '@l3-lib/ui-core/dist/Heading'

import TextFieldEditor from 'components/DataGrid/TextFieldEditor'
import { useState } from 'react'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  // addBlankRow: any
  assetOption: any
  propertiesOptions: any
  showProps: boolean
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  cellEditFn,
  customPropCols,
  // addBlankRow,
  assetOption,
  propertiesOptions,
  showProps,
}: configTypes) => {
  const ParentCellRenderer = (p: any) =>
    assetOption?.filter((item: any) => item.value === p.value).map((item: any) => item.label)
  // console.log('propertiesOptions', propertiesOptions)
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
  // console.log('customPropCols', customPropCols)

  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []

  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        editable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        suppressSizeToFit: true,
        hide: showProps,

        valueGetter: (data: any) => {
          // console.log('data', data)
          if (data.data?.custom_props?.[key]) {
            return data.data.custom_props?.[key]['prop_value']
          }
        },
        valueSetter: (params: any) => {
          const newValue = params.newValue
          // const field = params.colDef.field
          const field = 'custom_props'

          let currentProps = params.data.custom_props

          const oldProp = params.data.custom_props[`${params.colDef.field}`]

          const newProp = { ...oldProp, prop_value: newValue }
          // console.log('newProp', newProp)

          const editedProps = { ...currentProps, [`${params.colDef.field}`]: newProp }
          // console.log(editedProps)

          cellEditFn({
            field,
            newValue: editedProps,
            params,
          })
          return true
        },
        width: 100,
        minWidth: 100,
      }
    })
  }

  return [
    {
      // headerCheckboxSelection: true,
      // checkboxSelection: true,
      headerComponent: (p: any) => (
        <Checkbox
          indeterminate={indeterminate}
          checked={checked}
          size="small"
          kind="secondary"
          onChange={() => {
            const selectedRows = p.api.getSelectedRows()
            const allRows = p.api.getModel().gridOptionsWrapper.gridOptions.rowData
            if (selectedRows.length === allRows.length) {
              p.api.deselectAll()
              setChecked(false)
            } else {
              p.api.selectAll()
              setChecked(true)
              setIndeterminate(false)
            }
            p.api.refreshCells(p)
          }}
        />
      ),
      cellRenderer: (p: any) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '10px',
          }}
        >
          <Checkbox
            size="small"
            kind="secondary"
            checked={p.node.isSelected()}
            onChange={() => {
              if (p.node.isSelected()) {
                p.node.setSelected(false)
                setIndeterminate(true)
              } else if (!p.node.isSelected()) {
                p.node.setSelected(true)
                setIndeterminate(true)
              }
              p.api.refreshCells(p)
            }}
          />
        </div>
      ),
      width: 60,
      suppressSizeToFit: true,
    },

    {
      headerName: 'Name',
      field: 'name',
      // headerComponent: (p: any) => <Heading />,
      // headerCheckboxSelection: true,
      // checkboxSelection: true,

      editable: (params: any) => {
        if (params.data.type) {
          return false
        }
        return true
      },
      resizable: true,
      // rowDrag: true,
      filter: 'agTextColumnFilter',
      cellEditor: TextFieldEditor,

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
      // cellRenderer: AddRowButton,
      // cellRendererParams: {
      //   addRow: addBlankRow,
      // },
      headerComponentParams: {
        template: templateValue,
      },
      minWidth: 140,
    },
    {
      headerName: 'Asset',
      field: 'asset_url',
      // editable: true,
      resizable: true,
      cellRenderer: (p: any) =>
        p.value ? (
          <StyledImg src={p.value} alt="" />
        ) : (
          <Button kind="secondary" size="small">
            Add Image
          </Button>
        ),
      minWidth: 100,
      width: 130,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Description',
      field: 'description',
      editable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      // cellEditorParams: {
      //   cols: 30,
      //   rows: 2,
      // },
      flex: 2,
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
      minWidth: 150,
    },
    {
      headerName: 'Supply',
      editable: true,
      resizable: true,
      field: 'supply',
      filter: 'agNumberColumnFilter',
      cellEditor: TextFieldEditor,

      valueParser: (params: any) => {
        if (params.newValue.length === 0) {
          return null
        } else {
          return params.newValue
        }
      },

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
      minWidth: 120,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Price',
      editable: true,
      resizable: true,
      field: 'price',
      filter: 'agNumberColumnFilter',
      cellEditor: TextFieldEditor,
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
      minWidth: 120,
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
      minWidth: 165,
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
      width: 120,
      minWidth: 120,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Token ID',
      resizable: true,
      field: 'token_id',
      filter: 'agNumberColumnFilter',
      headerComponentParams: {
        template: templateValue,
      },
      width: 130,
      minWidth: 130,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Properties',
      editable: true,
      resizable: true,
      field: 'properties',
      filter: 'agTextColumnFilter',
      cellRenderer: (p: any) => {
        const res = propertiesOptions
          ?.filter((item: any) => p.value?.includes(item.value))
          .map((item: any) => item.label)
        // console.log('res', res)

        return (
          <StyledPropertyContainer>
            {res?.map((item: any) => (
              // <StyledPropertyItem>{item}</StyledPropertyItem>
              <Tags label={item} readOnly size="small" />
            ))}
          </StyledPropertyContainer>
        )
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        // isMulti: true,
        optionsArr: propertiesOptions,
      },
      // popup: true,
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
      minWidth: 140,
      // suppressSizeToFit: true,
    },
    {
      headerName: 'Parent NFT',
      editable: true,
      resizable: true,
      field: 'parent_id',
      filter: 'agTextColumnFilter',
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellRenderer: ParentCellRenderer,
      cellEditorParams: {
        values: assetOption?.map((option: any) => option.value),
        cellRenderer: ParentCellRenderer,
      },
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
      // suppressSizeToFit: true,
      minWidth: 140,
    },
    ...propCols,
  ]
}

const StyledPropertyContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`
// const StyledPropertyItem = styled.div`
//   border: 1px solid black;
//   border-radius: 2px;
//   font-size: 12px;
//   padding: 2px;
//   line-height: 12px;
// `

const StyledImg = styled.img`
  width: 35px;
  height: 35px;
`
