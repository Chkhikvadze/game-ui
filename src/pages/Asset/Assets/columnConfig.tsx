import { useEffect, useMemo, useRef, useState } from 'react'

import styled, { css } from 'styled-components'

import Tags from '@l3-lib/ui-core/dist/Tags'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Badge from '@l3-lib/ui-core/dist/Badge'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import ImageOutline from '@l3-lib/ui-core/dist/icons/ImageOutline'
import Properties from '@l3-lib/ui-core/dist/icons/Properties'
import Value from '@l3-lib/ui-core/dist/icons/Value'
import Bolt from '@l3-lib/ui-core/dist/icons/Bolt'
import Open from '@l3-lib/ui-core/dist/icons/Open'
import Id from '@l3-lib/ui-core/dist/icons/Id'
import Minted from '@l3-lib/ui-core/dist/icons/Minted'
import Status from '@l3-lib/ui-core/dist/icons/Status'
import WhatsNew from '@l3-lib/ui-core/dist/icons/WhatsNew'
import Points from '@l3-lib/ui-core/dist/icons/Points'
import SpecialWarning from '@l3-lib/ui-core/dist/icons/SpecialWarning'

import polygonIcon from 'assets/icons/polygonIcon.png'

import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
// import DatePickerEditor from 'components/DataGrid/GridComponents/DatePickerEditor'
// import moment from 'moment'

import MediasRenderer from 'components/DataGrid/GridComponents/MediasRenderer'
import { getAssetGlobalErrors } from 'utils/aiAnalysis'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  assetOption: any
  propertiesOptions: any
  attributesOptions: any
  achievementsOptions: any
  rewardsOptions: any
  showProps: boolean
  openEditAssetModal: (data: any) => void
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
  attributesOptions,
  achievementsOptions,
  rewardsOptions,
  showProps,
  handleUpdateMedia,
  openEditAssetModal,
  uploading,
}: configTypes) => {
  // const { errors, warnings } = useMemo(() => getAssetGlobalErrors(assets), [assets])
  // console.log(errors)
  const [nameIsEditable, setNameIsEditable] = useState(true)

  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => {
    return (
      <StyledHeight>
        <Typography
          value={p.value}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledHeight>
    )
  }

  const TokenRenderer = (p: any) => {
    useEffect(() => {
      p.api.refreshCells({ rowNodes: [p.node], force: true })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p?.data?.ai_analysis])

    const { errors, warnings } = useMemo(
      () => getAssetGlobalErrors([p?.data]),
      [p?.data?.ai_analysis],
    )

    const tooltipErrors = errors?.map((error: any) => error.name)
    const tooltipWarnings = warnings?.map((warning: any) => warning.name)

    return (
      <StyledTokenRenderer>
        <Tooltip
          content={() => (
            <StyledTooltipContent>
              {tooltipErrors?.map((error: string, index: number) => (
                <div key={index}>{error}</div>
              ))}
              {tooltipWarnings?.map((warning: string, index: number) => (
                <div key={index}>{warning}</div>
              ))}
            </StyledTooltipContent>
          )}
        >
          <StyledWarningWrapper error={p?.data?.ai_analysis}>
            <SpecialWarning />
          </StyledWarningWrapper>
        </Tooltip>

        <Typography
          value={p.value}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledTokenRenderer>
    )
  }

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
            openEditAssetModal(p.data)
          }}
        >
          <Open />
        </StyledOpenEditDiv>
      </StyledNameCell>
    )
  }

  const PropertiesCellRenderer = (p: any) => {
    const { value } = p
    let res

    if (value?.length > 0) {
      const mappedValues = value?.map((value: any) => value.id)
      res = propertiesOptions
        ?.filter((item: any) => mappedValues.includes(item.value))
        .map((item: any) => item.label)
    }
    return (
      <>
        {res && (
          <StyledPropertyContainer>
            {res?.map((item: any, index: number) => (
              <StyledTagWrapper key={index}>
                <Tags label={item} readOnly size='small' noAnimation />
              </StyledTagWrapper>
            ))}
          </StyledPropertyContainer>
        )}
      </>
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
      // pinned: 'left',
    }
  }, [])

  return [
    checkboxCol,
    {
      headerName: 'Token ID',
      headerComponent: HeaderComponent,
      field: 'token_id',
      filter: 'agNumberColumnFilter',
      cellRenderer: TokenRenderer,
      resizable: true,
      sort: 'asc',
      // pinned: 'left',
      width: 70,
      minWidth: 70,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Id />
          </StyledOutlineIcon>
        ),
        noText: true,
      },
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
      // cellStyle: (params: any) => {
      //   if (params.value.length === 0) {
      //     return {
      //       outline: '1px solid #D14485',
      //       borderRadius: '4px',
      //       background:
      //         'linear-gradient(180deg, rgba(209, 68, 133, 0.1) 0%, rgba(226, 50, 72, 0.1) 100%)',
      //     }
      //   }
      //   return null
      // },
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
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
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
      // cellStyle: (params: any) => {
      //   if (params.value.length === 0) {
      //     return {
      //       outline: '1px solid #D14485',
      //       borderRadius: '4px',
      //       background:
      //         'linear-gradient(180deg, rgba(209, 68, 133, 0.1) 0%, rgba(226, 50, 72, 0.1) 100%)',
      //     }
      //   }
      //   return null
      // },
      headerComponentParams: {
        icon: <ImageOutline />,
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
      // cellStyle: (params: any) => {
      //   if (params.value.length === 0) {
      //     return {
      //       outline: '1px solid #FDFE53',
      //       borderRadius: '4px',
      //       background:
      //         'linear-gradient(180deg, rgba(253, 254, 83, 0.1) 0%, rgba(235, 155, 58, 0.1) 100%)',
      //     }
      //   }
      //   return null
      // },
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
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
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
      // cellStyle: (params: any) => {
      //   if (params.value.length === 0) {
      //     return {
      //       outline: '1px solid #FDFE53',
      //       borderRadius: '4px',
      //       background:
      //         'linear-gradient(180deg, rgba(253, 254, 83, 0.1) 0%, rgba(235, 155, 58, 0.1) 100%)',
      //     }
      //   }
      //   return null
      // },
      enableRowGroup: false,
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
        icon: (
          <StyledOutlineIcon>
            <Properties />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
    },
    {
      headerName: 'Attributes',
      headerComponent: HeaderComponent,
      field: 'attributes',
      filter: 'agTextColumnFilter',
      resizable: true,
      editable: true,
      enableRowGroup: false,
      cellEditorPopup: true,
      cellRenderer: (p: any) => {
        const { value } = p

        let res
        if (value?.length > 0 && Array.isArray(value)) {
          const mappedValues = value?.map((value: any) => value.id)
          res = attributesOptions
            ?.filter((item: any) => mappedValues.includes(item.value))
            .map((item: any) => item.media)
        }
        return (
          <>
            {res && (
              <StyledPropertyContainer>
                {res?.map((value: any, index: number) => (
                  <Avatar
                    key={index}
                    size={Avatar.sizes.SMALL}
                    src={value}
                    type={Avatar.types.IMG}
                    rectangle
                  />
                ))}
              </StyledPropertyContainer>
            )}
          </>
        )
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        isMulti: true,
        isMultiLine: true,
        optionsArr: attributesOptions,
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
      headerName: 'Achievements',
      headerComponent: HeaderComponent,
      field: 'achievements',
      filter: 'agTextColumnFilter',
      resizable: true,
      editable: true,
      enableRowGroup: false,
      cellEditorPopup: true,
      cellRenderer: (p: any) => {
        const { value } = p

        let res
        if (value?.length > 0) {
          const mappedValues = value?.map((value: any) => value.id)
          res = achievementsOptions
            ?.filter((item: any) => mappedValues.includes(item.value))
            .map((item: any) => item.media)
        }
        return (
          <>
            {res && (
              <StyledPropertyContainer>
                {res?.map((value: any, index: number) => (
                  <Avatar
                    key={index}
                    size={Avatar.sizes.SMALL}
                    src={value}
                    type={Avatar.types.IMG}
                    rectangle
                  />
                ))}
              </StyledPropertyContainer>
            )}
          </>
        )
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        isMulti: true,
        isMultiLine: true,
        optionsArr: achievementsOptions,
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
        icon: (
          <StyledOutlineIcon>
            <Points />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
    },
    {
      headerName: 'Rewards',
      headerComponent: HeaderComponent,
      field: 'rewards',
      filter: 'agTextColumnFilter',
      resizable: true,
      editable: true,
      enableRowGroup: false,
      cellEditorPopup: true,
      cellRenderer: (p: any) => {
        const { value } = p

        let res
        if (value?.length > 0) {
          const mappedValues = value?.map((value: any) => value.id)
          res = rewardsOptions
            ?.filter((item: any) => mappedValues.includes(item.value))
            .map((item: any) => item.media)
        }
        return (
          <>
            {res && (
              <StyledPropertyContainer>
                {res?.map((value: any, index: number) => (
                  <Avatar
                    key={index}
                    size={Avatar.sizes.SMALL}
                    src={value}
                    type={Avatar.types.IMG}
                    rectangle
                  />
                ))}
              </StyledPropertyContainer>
            )}
          </>
        )
      },
      cellEditor: MultiselectEditor,
      cellEditorParams: {
        isMulti: true,
        isMultiLine: true,
        optionsArr: rewardsOptions,
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
        icon: <WhatsNew />,
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
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Value />
          </StyledOutlineIcon>
        ),
      },
      width: 170,
      minWidth: 170,
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
      headerComponentParams: {
        icon: (
          // <StyledOutlineIcon>
          <StyledIconImg src={polygonIcon} alt='' />
          // </StyledOutlineIcon>
        ),
      },
      width: 160,
      minWidth: 160,
      // suppressSizeToFit: true,
    },
    {
      headerName: 'Minted',
      headerComponent: HeaderComponent,
      field: 'mintedAmount',
      filter: 'agNumberColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Minted />
          </StyledOutlineIcon>
        ),
      },
      width: 180,
      minWidth: 180,
      // suppressSizeToFit: true,
    },
    {
      headerName: 'Status',
      headerComponent: HeaderComponent,
      field: 'status',
      filter: 'agTextColumnFilter',
      cellRenderer: StatusRenderer,
      resizable: true,
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Status />
          </StyledOutlineIcon>
        ),
      },
      width: 170,
      minWidth: 170,
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
  /* flex-wrap: wrap; */
  gap: 5px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;

  min-width: fit-content;
  max-height: 40px;
`

export const StyledNameCell = styled.div<{ error?: boolean }>`
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
  min-width: 36px;
  min-height: 36px;
  background: rgba(0, 0, 0, 0.4);

  opacity: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 4px;
  /* margin-left: 10px; */

  cursor: pointer;
`
export const StyledBadgeWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 40px;
`
const StyledMouseOverDiv = styled.div`
  width: 100%;
  height: 100%;
  min-height: 40px;
`
const StyledHeight = styled.div`
  max-height: 40px;
  min-height: 40px;
`
const StyledTokenRenderer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  gap: 4px;

  min-width: 50px;
  height: 40px;
`
export const StyledOutlineIcon = styled.div`
  color: transparent;
  width: 40px;
`
const StyledIconImg = styled.img`
  width: 14px;
`
const StyledWarningWrapper = styled.div<{ error: boolean }>`
  width: 16px;
  max-width: 16px;
  min-width: 16px;
  display: none
    ${p =>
      p.error &&
      css`
        display: block;
      `};
`
const StyledTooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const StyledTagWrapper = styled.div`
  min-width: fit-content;
`
