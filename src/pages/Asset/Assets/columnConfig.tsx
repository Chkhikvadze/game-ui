import { useRef, useState } from 'react'

import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'
import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Bolt from '@l3-lib/ui-core/dist/icons/Bolt'

import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
// import DatePickerEditor from 'components/DataGrid/GridComponents/DatePickerEditor'
// import moment from 'moment'

import atrImg from 'assets/avatars/attributesImg.png'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  assetOption: any
  propertiesOptions: any
  showProps: boolean
  handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, assetId: string) => void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  cellEditFn,
  customPropCols,
  // addBlankRow,
  assetOption,
  propertiesOptions,
  showProps,
  handleUpdateMedia,
}: configTypes) => {
  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const [assetId, setAssetId] = useState(null as any)

  const uploadRef = useRef(null as any)

  const onButtonClick = async (p: any) => {
    await setAssetId(p.data.id)
    uploadRef?.current?.click()
  }

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.lg}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  const ParentCellRenderer = (p: any) =>
    assetOption
      ?.filter((item: any) => item.value === p.value)
      .map((item: any) => (
        <Typography
          key={item}
          value={item.label}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
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
      cellRenderer: (p: any) => {
        return (
          <>
            <input
              type='file'
              multiple
              ref={uploadRef}
              style={{ display: 'none' }}
              onChange={e => handleUpdateMedia(e, assetId)}
            />
            {p.value.length > 0 ? (
              <StyledImgWrapper>
                {p.value.slice(0, 3).map((value: any) => {
                  return <StyledImg key={value.url} src={value.url} alt='' />
                })}
                <>
                  <StyledImgCount onClick={() => onButtonClick(p)}>
                    <Typography
                      value={p.value.length > 3 ? `+${p.value.length - 3}` : 'Add'}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.lg}
                      customColor={'rgba(255, 255, 255, 0.8)'}
                    />
                  </StyledImgCount>
                </>
              </StyledImgWrapper>
            ) : (
              <StyledImgWrapper>
                <StyledImgCount onClick={() => onButtonClick(p)}>
                  <Typography
                    value={'Add'}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.lg}
                    customColor={'rgba(255, 255, 255, 0.8)'}
                  />
                </StyledImgCount>
              </StyledImgWrapper>
            )}
          </>
        )
      },
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
              <Tags key={item} label={item} readOnly size='small' />
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

      minWidth: 200,
    },
    {
      headerName: 'Attributes',
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
              <div key={item}>
                <Avatar size={Avatar.sizes.SMALL} src={atrImg} type={Avatar.types.IMG} rectangle />
              </div>
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
        icon: <Bolt />,
      },
      minWidth: 200,
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

      width: 120,
      minWidth: 120,
      suppressSizeToFit: true,
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

  cursor: pointer;
`
const StyledImgWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`
