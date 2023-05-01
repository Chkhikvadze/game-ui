import columnGenerator from 'components/DataGrid/helpers/columnGenerator'

import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'
import MediasRenderer from 'components/DataGrid/GridComponents/MediasRenderer'
import { useMemo } from 'react'
import styled from 'styled-components'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  customPropCols: any
  showProps: boolean
  uploading: boolean
  handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, property: any) => void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
  cellEditFn,
  customPropCols,
  showProps,
  handleUpdateMedia,
  uploading,
}: configTypes) => {
  const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()

  const TextCellRenderer = (p: any) => (
    <StyledTextRenderer>
      <Typography
        value={p.value}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextRenderer>
  )

  let propCols: any = []
  const propObjectKeys = Object.keys(customPropCols) || []
  if (propObjectKeys.length) {
    propCols = propObjectKeys.map((key: any) => {
      const prop = customPropCols[key]
      return {
        headerName: prop.prop_name,
        field: prop.key,
        headerComponent: HeaderComponent,
        cellRenderer: TextCellRenderer,
        editable: true,
        cellEditor: TextFieldEditor,
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
          let editedProps = {}
          const newValue = params.newValue
          const field = 'custom_props'
          if (params.data.custom_props === null) {
            editedProps = { [params.colDef.field]: { prop_value: newValue } }
          } else {
            // const field = params.colDef.field

            const currentProps = params.data.custom_props

            const oldProp = params.data.custom_props[`${params.colDef.field}`]

            const newProp = { ...oldProp, prop_value: newValue }

            editedProps = { ...currentProps, [`${params.colDef.field}`]: newProp }
          }

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

  const checkboxCol = useMemo(() => {
    return {
      headerComponent: HeaderCheckbox,
      cellRenderer: RowCheckbox,
      width: 60,
      minWidth: 60,
    }
  }, [])

  const nameColumn = columnGenerator({
    headerName: 'Name',
    fieldName: 'name',
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    cellEditor: TextFieldEditor,
    editable: (params: any) => {
      if (params.data.type) {
        return false
      }
      return true
    },
    cellEditFn,
    icon: starIcon,
    minWidth: 200,
    // width: 200,
    // selectAllButton: true,
  })

  const descriptionColumn = columnGenerator({
    headerName: 'Description',
    fieldName: 'description',
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    cellEditor: TextareaEditor,
    cellEditorPopup: true,
    // cellEditorParams: {
    //   cols: 30,
    //   rows: 2,
    // },

    cellEditFn,
    icon: starIcon,
    minWidth: 200,
    // width: 200,
  })

  const typeColumn = columnGenerator({
    headerName: 'Type',
    fieldName: 'property_type',
    headerComponent: HeaderComponent,
    cellRenderer: TextCellRenderer,
    resizable: true,
    filter: 'agTextColumnFilter',
    suppressSizeToFit: true,
    cellEditFn,
    cellEditorPopup: true,
    cellEditor: MultiselectEditor,
    cellEditorParams: {
      optionsArr: PROPERTY_TYPE_OPTIONS,
      // formatValue: PROPERTY_TYPE_OPTIONS?.map((option: any) => option.label),
    },
    icon: starIcon,
    // width: 200,
    minWidth: 200,
  })

  return [
    checkboxCol,
    nameColumn,
    descriptionColumn,
    typeColumn,
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
      // headerComponentParams: {
      //   icon: <Image />,
      // },
      minWidth: 200,
      // width: 200,
      // width: 130,
      // suppressSizeToFit: true,
    },
    ...propCols,
  ]
}

const StyledTextRenderer = styled.div`
  max-height: 40px;
`
