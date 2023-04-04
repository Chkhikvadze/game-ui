import { useRef, useState } from 'react'

import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Image from '@l3-lib/ui-core/dist/icons/Image'

import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'
import useUploadFile from 'hooks/useUploadFile'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
// import DatePickerEditor from 'components/DataGrid/GridComponents/DatePickerEditor'
// import moment from 'moment'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
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

  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const [assetData, setAssetData] = useState(null as any)

  const inputFile = useRef(null as any)

  const { uploadFile } = useUploadFile()

  const changeHandler = async (event: any) => {
    const { files }: any = event.target
    const fileObj = {
      fileName: files[0].name,
      type: files[0].type,
      fileSize: files[0].size,
      locationField: 'collection',
    }
    const res = await uploadFile(fileObj, files[0])

    const newValue = res
    const field = assetData.colDef.field

    await cellEditFn({
      field,
      newValue,
      params: assetData,
    })
  }

  const onButtonClick = async (p: any) => {
    await setAssetData(p)
    inputFile.current.click()
  }

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.md}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  const ParentCellRenderer = (p: any) =>
    assetOption
      ?.filter((item: any) => item.value === p.value)
      .map((item: any) => (
        <Typography
          value={item.label}
          type={Typography.types.LABEL}
          size={Typography.sizes.md}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      ))

  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []

  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        headerComponent: HeaderComponent,
        field: prop.key,
        editable: true,
        cellEditor: TextFieldEditor,
        filter: 'agTextColumnFilter',
        resizable: true,
        suppressSizeToFit: true,
        hide: showProps,
        cellRenderer: TextCellRenderer,
        valueGetter: (data: any) => {
          if (data.data?.custom_props?.[key]) {
            return data.data.custom_props?.[key]['prop_value']
          }
        },
        valueSetter: (params: any) => {
          const newValue = params.newValue
          // const field = params.colDef.field
          const field = 'custom_props'

          const currentProps = params.data.custom_props

          const oldProp = params.data.custom_props[`${params.colDef.field}`]

          const newProp = { ...oldProp, prop_value: newValue }

          const editedProps = { ...currentProps, [`${params.colDef.field}`]: newProp }

          cellEditFn({
            field,
            newValue: editedProps,
            params,
          })
          return true
        },
        width: 120,
        minWidth: 120,
      }
    })
  }

  return [
    {
      // headerCheckboxSelection: true,
      // checkboxSelection: true,
      headerComponent: HeaderCheckbox,
      cellRenderer: RowCheckbox,
      width: 60,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Token ID',
      headerComponent: HeaderComponent,
      field: 'token_id',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      // headerComponentParams: {

      //   icon: TextType,
      // },
      width: 130,
      minWidth: 130,
      suppressSizeToFit: true,
    },
    // {
    //   headerName: 'Created on',
    //   field: 'created_on',
    //   resizable: true,
    //   width: 150,
    //   headerComponent: HeaderComponent,
    //   cellRenderer: (p: any) => {
    //     const value = moment(p.value).fromNow()
    //     return (
    //       <Typography
    //         value={value}
    //         type={Typography.types.LABEL}
    //         size={Typography.sizes.md}
    //         customColor="rgba(255, 255, 255, 0.8)"
    //       />
    //     )
    //   },
    //   editable: true,
    //   cellEditorPopup: true,
    //   cellEditor: DatePickerEditor,
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
      headerName: 'Name',
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      editable: (params: any) => {
        if (params.data.type) {
          return false
        }
        return true
      },
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
      headerComponentParams: {
        icon: <TextType />,
      },
      minWidth: 140,
    },
    {
      headerName: 'Media',
      headerComponent: HeaderComponent,
      field: 'medias',
      resizable: true,
      cellRenderer: (p: any) =>
        p.value.length > 0 ? (
          // (
          //   <StyledImg src={p.value} alt='' />
          // )
          <div style={{ display: 'flex', gap: '5px' }}>
            {p.value.slice(0, 3).map((value: any) => {
              return <StyledImg src={value.url} alt='' />
            })}
            {p.value.length > 3 && (
              <StyledImgCount>
                <Typography
                  value={`+${p.value.length - 3}`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.lg}
                  customColor={'rgba(255, 255, 255, 0.8)'}
                />
              </StyledImgCount>
            )}
          </div>
        ) : (
          <div>N/A</div>
        ),
      headerComponentParams: {
        icon: <Image />,
      },
      minWidth: 200,
      // width: 130,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Story',
      headerComponent: HeaderComponent,
      field: 'description',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      editable: true,
      resizable: true,
      cellEditorPopup: true,
      cellEditor: TextareaEditor,
      // cellEditorPopup: true,
      // flex: 2,
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
        icon: <TextType />,
      },
      minWidth: 150,
    },
    {
      headerName: 'Supply',
      headerComponent: HeaderComponent,
      field: 'supply',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      editable: true,
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
      headerComponent: HeaderComponent,
      field: 'price',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      editable: true,
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
      headerComponent: HeaderComponent,
      field: 'mintedAmount',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        template: templateValue,
      },
      width: 175,
      minWidth: 175,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Status',
      headerComponent: HeaderComponent,
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        template: templateValue,
      },
      width: 120,
      minWidth: 120,
      suppressSizeToFit: true,
    },

    {
      headerName: 'Properties',
      headerComponent: HeaderComponent,
      field: 'properties',
      filter: 'agTextColumnFilter',
      resizable: true,
      editable: true,
      cellEditorPopup: true,
      cellRenderer: (p: any) => {
        const res = propertiesOptions
          ?.filter((item: any) => p.value?.includes(item.value))
          .map((item: any) => item.label)

        return (
          <StyledPropertyContainer>
            {res?.map((item: any) => (
              <Tags label={item} readOnly size='small' />
            ))}
          </StyledPropertyContainer>
        )
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        isMulti: true,
        isMultiLine: true,
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
      headerComponent: HeaderComponent,
      field: 'parent_id',
      filter: 'agTextColumnFilter',
      cellRenderer: ParentCellRenderer,
      resizable: true,
      editable: true,
      cellEditorPopup: true,
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        optionsArr: assetOption,
        // cellRenderer: ParentCellRenderer,
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
      minWidth: 150,
    },
    ...propCols,
  ]
}

const StyledPropertyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledImg = styled.img`
  width: 35px;
  height: 35px;
`
const StyledImgCount = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`
