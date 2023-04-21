import { useMemo, useState } from 'react'

import styled from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Badge from '@l3-lib/ui-core/dist/Badge'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import Bolt from '@l3-lib/ui-core/dist/icons/Bolt'
import Open from '@l3-lib/ui-core/dist/icons/Open'

import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
// import DatePickerEditor from 'components/DataGrid/GridComponents/DatePickerEditor'
// import moment from 'moment'

import atrImg from 'assets/avatars/attributesImg.png'
import MediasRenderer from 'components/DataGrid/GridComponents/MediasRenderer'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  assetOption: any
  propertiesOptions: any
  showProps: boolean
  openEditAssetModal: (id: string) => void
  handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, asset: any) => void
  uploading: boolean
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
  openEditAssetModal,
  uploading,
}: configTypes) => {
  const [nameIsEditable, setNameIsEditable] = useState(true)

  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.lg}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  const NameCellRenderer = (p: any) => {
    return (
      <StyledNameCell>
        <StyledMouseOverDiv onMouseOver={() => setNameIsEditable(true)}>
          <Typography
            value={p.value}
            type={Typography.types.LABEL}
            size={Typography.sizes.lg}
            customColor='rgba(255, 255, 255, 0.8)'
          />
        </StyledMouseOverDiv>
        <StyledOpenEditDiv
          onMouseOver={() => setNameIsEditable(false)}
          className='editAction'
          onClick={() => {
            openEditAssetModal(p.data.id)
          }}
        >
          <Open />
        </StyledOpenEditDiv>
      </StyledNameCell>
    )
  }

  const PropertiesCellRenderer = (p: any) => {
    const res = propertiesOptions
      ?.filter((item: any) => p.value?.includes(item.value))
      .map((item: any) => item.label)

    return (
      <StyledPropertyContainer>
        {res?.map((item: any, index: number) => (
          <Tags key={index} label={item} readOnly size='small' noAnimation />
        ))}
      </StyledPropertyContainer>
    )
  }

  const StatusRenderer = (p: any) => {
    const { value } = p
    let statusState
    if (value === 'Available') {
      statusState = 'positive'
    } else if (value === 'Burned') {
      statusState = 'negative'
    } else statusState = 'warning'

    return (
      <StyledBadgeWrapper>
        <Badge isDot={true} dot={statusState} />
        <Typography
          value={p.value}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledBadgeWrapper>
    )
  }

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
        // suppressSizeToFit: true,
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
        width: 150,
        minWidth: 150,
      }
    })
  }

  const checkboxCol = useMemo(() => {
    return {
      // headerCheckboxSelection: true,
      // checkboxSelection: true,
      headerComponent: HeaderCheckbox,
      cellRenderer: RowCheckbox,
      width: 60,
      minWidth: 60,
      // field: 'id',
      // suppressSizeToFit: true,
    }
  }, [])

  return [
    checkboxCol,
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
      width: 70,
      minWidth: 70,
      // suppressSizeToFit: true,
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
      cellRenderer: NameCellRenderer,
      resizable: true,
      editable: nameIsEditable,
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
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Media',
      headerComponent: HeaderComponent,
      field: 'medias',
      resizable: true,
      cellRenderer: MediasRenderer,
      cellRendererParams: {
        handleUpdateMedia: handleUpdateMedia,
        isLoading: uploading,
      },
      headerComponentParams: {
        icon: <Image />,
      },
      minWidth: 200,
      // width: 130,
      // suppressSizeToFit: true,
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
      minWidth: 200,
      width: 300,
    },
    {
      headerName: 'Properties',
      headerComponent: HeaderComponent,
      field: 'properties',
      filter: 'agTextColumnFilter',
      resizable: true,
      editable: true,
      cellEditorPopup: true,
      cellRenderer: PropertiesCellRenderer,
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
          <StyledAttributeWrapper>
            {res?.map((item: any) => (
              <div key={item}>
                <Avatar size={Avatar.sizes.SMALL} src={atrImg} type={Avatar.types.IMG} rectangle />
              </div>
            ))}
          </StyledAttributeWrapper>
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

      width: 130,
      minWidth: 130,
      // suppressSizeToFit: true,
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

      width: 130,
      minWidth: 130,
      // suppressSizeToFit: true,
    },
    {
      headerName: 'Minted',
      headerComponent: HeaderComponent,
      field: 'mintedAmount',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,

      width: 130,
      minWidth: 130,
      // suppressSizeToFit: true,
    },
    {
      headerName: 'Status',
      headerComponent: HeaderComponent,
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: StatusRenderer,
      resizable: true,

      width: 150,
      minWidth: 150,
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

      // suppressSizeToFit: true,
      minWidth: 200,
    },
    ...propCols,
  ]
}

const StyledPropertyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledAttributeWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

export const StyledNameCell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;

  margin-top: 2px;

  &:hover {
    .editAction {
      opacity: 1;
    }
  }
`
export const StyledOpenEditDiv = styled.div`
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.4);

  opacity: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 4px;
  /* margin-left: 10px; */

  cursor: pointer;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledMouseOverDiv = styled.div`
  width: 100%;
  height: 100%;
  min-height: 40px;
`
