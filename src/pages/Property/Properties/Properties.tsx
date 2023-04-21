import styled from 'styled-components'
import { useRef, useState } from 'react'

import { useModal } from 'hooks'

import { useProperties } from './useProperties'

import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import columnConfig from './columnConfig'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import CreateProperty from 'modals/CreatePropertyModal'
import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import DataGrid from '../../../components/DataGrid'
import EditPropertyModal from '../EditProperty/EditPropertyModal'
import { useEditProperty } from '../EditProperty/useEditProperty'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Search from '@l3-lib/ui-core/dist/Search'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'
import {
  StyledActionsSection,
  StyledButtonsWrapper,
  StyledClickableDiv,
  StyledColumn,
  StyledLabel,
} from 'pages/Asset/Assets/Assets'
import { t } from 'i18next'
import { StyleHeaderGroup } from 'styles/globalStyle.css'

const Properties = () => {
  const gridRef: any = useRef({})
  const cellEditFn = useUpdateCacheThenServerProperty()
  const [groupPanel, setGroupPanel] = useState(false)
  const { openModal, closeModal } = useModal()

  let parsedShowProps = true
  const showPropsStorage = localStorage.getItem('showPropsProperty')
  if (showPropsStorage) {
    parsedShowProps = JSON.parse(showPropsStorage)
  }
  const [showProps, setShowProps] = useState(parsedShowProps)

  const {
    openCreateCollectionModal,
    openCreateCustomPropertyModal,
    data,
    handleDeleteCollection,
    customProps,
    addBlankRow,
    deletePropertById,
    propertiesRefetch,
    formik,
  } = useProperties()

  const { openEditPropertyModal, handleUpdateMedia, uploading } = useEditProperty()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn: cellEditFn,
    customPropCols: customProps || {},
    showProps,
    handleUpdateMedia,
    uploading,
  })

  const handleAddNewRow = () => {
    addBlankRow()
  }

  const removeSelected = async (mappedItems: any) => {
    await mappedItems.map(async (item: any) => await deletePropertById(item.id))
    propertiesRefetch()
  }

  const deleteRow = async (itemId: any) => {
    await deletePropertById(itemId)
    propertiesRefetch()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params?.node?.data?.id
    const result = [
      ...params.defaultItems,
      {
        // custom item
        name: 'Delete',
        // disabled: true,
        action: () => {
          // console.log('params', params.node.data.id)
          // console.log('params', params)
          const deleteFunc = async () => {
            await deleteRow(itemId)
            closeModal('delete-confirmation-modal')
          }
          openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: deleteFunc,
              closeModal: () => closeModal('delete-confirmation-modal'),
              label: 'Are you sure you want to delete this row?',
              title: 'Delete Row',
            },
          })
        },
      },
      {
        // custom item
        name: 'Edit',
        action: () => {
          openEditPropertyModal(itemId)
        },
      },
    ]

    return result
  }

  return (
    <>
      <StyleHeaderGroup grid>
        <Heading
          type={Heading.types.h1}
          value={`${data?.length} Properties`}
          customColor={'#FFF'}
        />
      </StyleHeaderGroup>
      <StyledActionsSection>
        <StyledColumn>
          <Button kind={Button.kinds.TERTIARY} onClick={() => setGroupPanel(state => !state)}>
            Group by
          </Button>
          <Button kind={Button.kinds.TERTIARY} onClick={() => handleAddNewRow()}>
            {t('add-row')}
          </Button>
        </StyledColumn>
        <StyledColumn>
          <Button onClick={openCreateCollectionModal}>Create Property</Button>

          <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv onClick={openCreateCustomPropertyModal}>
                <Typography
                  value={'Add Custom Property'}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>
              <StyledClickableDiv
                onClick={() => {
                  const rows = gridRef.current.getSelectedRows()
                  removeSelected(rows)
                }}
              >
                <Typography
                  value={t('remove-selected')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>

              <StyledLabel>
                <Typography
                  value={t('show-custom-props')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
                <Checkbox
                  checked={!parsedShowProps}
                  size='small'
                  kind='secondary'
                  onChange={() => {
                    setShowProps(!showProps)
                    localStorage.setItem('showPropsProperty', JSON.stringify(!showProps))
                  }}
                />
              </StyledLabel>
            </StyledButtonsWrapper>
          </MenuButton>
        </StyledColumn>
      </StyledActionsSection>

      <>
        <DataGrid
          ref={gridRef as any}
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          contextMenu={getContextMenuItems}
          // noBorder={true}
        />
      </>
      <CreateProperty />
      <EditPropertyModal />
      <CreateCustomPropertyModal formik={formik} />
    </>
  )
}

export default Properties

export const StyledButton = styled.button`
  border: 1px solid #19b3ff;
  padding: 12px;
  display: inline-block;
  border-radius: 4px;
  margin-top: 20px;
  background-color: white;

  &:hover {
    background-color: #19b3ff;

    ${StyledTypography} {
      color: #fff;
    }
  }
`
