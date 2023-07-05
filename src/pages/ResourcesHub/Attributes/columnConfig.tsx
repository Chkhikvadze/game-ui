import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import TextType from '@l3-lib/ui-core/dist/icons/TextType'
import Image from '@l3-lib/ui-core/dist/icons/Image'
import NumberOutline from '@l3-lib/ui-core/dist/icons/NumberOutline'
import menuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import HeaderComponent from 'components/DataGrid/GridComponents/HeaderComponent'
// import useCheckboxRenderer from 'components/DataGrid/GridComponents/useCheckboxRenderer'
import { StyledOutlineIcon } from 'pages/Asset/Assets/columnConfig'
import TextFieldEditor from 'components/DataGrid/GridComponents/TextFieldEditor'
import { useEditAttributes } from './useEditAttribute'
import TextareaEditor from 'components/DataGrid/GridComponents/TextareaEditor'
import ImageRenderer from 'components/DataGrid/GridComponents/ImageRenderer'
import { useModal } from 'hooks'
import { t } from 'i18next'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // const { HeaderCheckbox, RowCheckbox } = useCheckboxRenderer()
  const { cellEditFn, uploading, handleUpdateMedia, attributesRefetch } = useEditAttributes()

  const TextCellRenderer = (p: any) => (
    <Typography
      value={p.value}
      type={Typography.types.LABEL}
      size={Typography.sizes.lg}
      customColor='rgba(255, 255, 255, 0.8)'
    />
  )

  const DeleteCellRenderer = (p: any) => {
    const { openModal, closeModal } = useModal()
    const { deleteAttribute } = useEditAttributes()
    const handleDelete = async () => {
      const deleteFunc = async () => {
        await deleteAttribute(p.data.id)
        closeModal('delete-confirmation-modal')
        attributesRefetch()
      }

      openModal({
        name: 'delete-confirmation-modal',
        data: {
          closeModal: () => closeModal('delete-confirmation-modal'),
          deleteItem: deleteFunc,
          label: t('are-you-sure-you-want-to-delete-this-row?'),
          title: t('delete-row'),
        },
      })
    }

    return (
      <div>
        <StyledDiv>
          <MenuButton component={menuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv onClick={handleDelete}>
                <Typography
                  value={'Delete row'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton>
        </StyledDiv>
      </div>
    )
  }

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
    },

    {
      headerName: 'Min Value',
      headerComponent: HeaderComponent,
      field: 'min',
      filter: 'agTextColumnFilter',
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
        icon: <NumberOutline />,
      },
      minWidth: 100,
    },
    {
      headerName: 'Max Value',
      headerComponent: HeaderComponent,
      field: 'max',
      filter: 'agTextColumnFilter',
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
        icon: <NumberOutline />,
      },
      minWidth: 100,
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
      wrapText: false,
      minWidth: 340,
      // width: 300,
      flex: 2,
    },
    {
      // headerName: 'Actions',
      // field: 'actions',
      cellRenderer: DeleteCellRenderer,
      cellStyle: { display: 'flex', justifyContent: 'center', alignItems: 'center' },

      minWidth: 70,
      width: 70,
    },
  ]
}

const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;

  background: rgba(0, 0, 0, 0.2);

  padding: 16px;

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;
`

const StyledClickableDiv = styled.div`
  cursor: pointer;
`

const StyledDiv = styled.div`
  display: flex;
  position: relative;
  float: right;
  align-items: center;
`
