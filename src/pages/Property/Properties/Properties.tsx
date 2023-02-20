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

  const { openEditPropertyModal } = useEditProperty()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn: cellEditFn,
    customPropCols: customProps || {},
    showProps,
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
    const itemId = params.node.data.id
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
      <>
        <StyledButton onClick={openCreateCollectionModal}>Create Property</StyledButton>
        <StyledButton onClick={() => handleAddNewRow()}>Add Row</StyledButton>
        <StyledButton onClick={openCreateCustomPropertyModal}>Add Custom Property</StyledButton>
        <StyledButton onClick={() => setGroupPanel(state => !state)}>
          Toggle Group Panel
        </StyledButton>
        <StyledButton
          className='bt-action'
          onClick={() => {
            const rows = gridRef.current.getSelectedRows()
            removeSelected(rows)
          }}
        >
          Remove Selected
        </StyledButton>
        <label>
          Show Custom Props
          <input
            type='checkbox'
            defaultChecked={false}
            checked={!parsedShowProps}
            onChange={() => {
              setShowProps(!showProps)
              localStorage.setItem('showPropsProperty', JSON.stringify(!showProps))
            }}
          />
        </label>
        <DataGrid
          ref={gridRef as any}
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          contextMenu={getContextMenuItems}
          noBorder={true}
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
