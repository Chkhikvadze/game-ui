import Typography from '@l3-lib/ui-core/dist/Typography'

import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Image from '@l3-lib/ui-core/dist/icons/Image'

import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
// import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'

import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'

import ImageRenderer from 'components/DataGrid/GridComponents/ImageRenderer'
import { useEditReward } from './useEditReward'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()
  const { cellEditFn, handleUpdateMedia, uploading } = useEditReward()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.sm}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  return [
    //   {
    //     headerComponent: HeaderCheckbox,
    //     cellRenderer: RowCheckbox,
    //     width: 60,
    //     minWidth: 60,
    //   },
    {
      headerName: 'Thumbnail',
      headerComponent: HeaderComponent,
      field: 'media',
      filter: 'agTextColumnFilter',
      resizable: true,
      cellRenderer: ImageRenderer,
      cellRendererParams: {
        handleUpdateMedia: handleUpdateMedia,
        isLoading: uploading,
        isThumbnail: true,
      },
      headerComponentParams: {
        icon: (
          <StyledOutlineIcon>
            <Image />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 180,
      width: 180,
    },
    {
      headerName: 'Name',
      headerComponent: HeaderComponent,
      field: 'name',
      filter: 'agTextColumnFilter',
      cellRenderer: TextCellRenderer,
      resizable: true,
      editable: true,
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
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
      // width: 300,
      flex: 1,
    },

    {
      headerName: 'Description',
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
        icon: (
          <StyledOutlineIcon>
            <TextType />
          </StyledOutlineIcon>
        ),
      },
      minWidth: 200,
      // width: 300,
      flex: 2,
      wrapText: false,
    },
  ]
}
