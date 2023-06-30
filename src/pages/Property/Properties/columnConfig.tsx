import { useMemo } from 'react'

import styled from 'styled-components'

import columnGenerator from 'components/DataGrid/helpers/columnGenerator'

import starIcon from 'assets/icons/star_FILL0_wght400_GRAD0_opsz48.svg'
import { PROPERTY_TYPE_OPTIONS } from 'utils/constants'

import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
import Typography from '@l3-lib/ui-core/dist/Typography'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'
import MultiselectEditor from 'components/DataGrid/GridComponents/MultiselectEditor'

import ImageOutline from '@l3-lib/ui-core/dist/icons/ImageOutline'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import TagsOutline from '@l3-lib/ui-core/dist/icons/TagsOutline'

import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'
import ImageRenderer from 'components/DataGrid/GridComponents/ImageRenderer'

type configTypes = {
  handleDelete: Function
  cellEditFn: Function
  uploading: boolean
  handleUpdateMedia: (event: React.FormEvent<HTMLInputElement>, property: any) => void
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ cellEditFn, handleUpdateMedia, uploading }: configTypes) => {
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
    minWidth: 340,

    headerComponentParams: {
      icon: (
        <StyledOutlineIcon>
          <TextType />
        </StyledOutlineIcon>
      ),
    },
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
    headerComponentParams: {
      icon: (
        <StyledOutlineIcon>
          <TextType />
        </StyledOutlineIcon>
      ),
    },
    cellEditFn,
    minWidth: 340,
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
    headerComponentParams: {
      icon: <TagsOutline />,
    },
    minWidth: 200,
  })

  return [
    // checkboxCol,
    {
      headerName: 'Media',
      headerComponent: HeaderComponent,
      field: 'media',
      resizable: true,
      cellRenderer: ImageRenderer,
      cellRendererParams: {
        handleUpdateMedia: handleUpdateMedia,
        isLoading: uploading,
      },
      headerComponentParams: {
        icon: <ImageOutline />,
      },
      minWidth: 180,
      width: 180,
      // width: 150,
      // width: 130,
      // suppressSizeToFit: true,
    },
    nameColumn,
    typeColumn,
    descriptionColumn,
  ]
}

const StyledTextRenderer = styled.div`
  max-height: 40px;
  min-height: 40px;
`
