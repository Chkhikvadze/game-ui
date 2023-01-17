import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import { useModal } from 'hooks'

import CreateNftModal from 'modals/CreateNftModal'
// import ImportNft from '../ImportNft/ImportNft'

import { useNft } from './useNft'
import columnConfig from './columnConfig'

// import { CustomTable } from 'oldComponents/atoms/CustomTable'
import { useUpdateCacheThenServerNft } from 'services'

import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import { Link } from 'react-router-dom'
import DataGrid from 'components/DataGrid'
import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import { useEditNft } from '../EditNft/useEditNft'
import EditNftModal from '../EditNft/EditNftModal'

const Nfts = () => {
  const gridRef: any = useRef({})
  const cellEditFn = useUpdateCacheThenServerNft()
  const [groupPanel, setGroupPanel] = useState(false)
  const { openModal, closeModal } = useModal()

  let parsedShowProps = true
  const showPropsStorage = localStorage.getItem('showPropsNFT')
  if (showPropsStorage) {
    parsedShowProps = JSON.parse(showPropsStorage)
  }
  const [showProps, setShowProps] = useState(parsedShowProps)

  const {
    openCreateCollectionModal,
    openCreateCustomPropertyModal,
    data,
    handleDeleteCollection,
    addBlankRow,
    nftOption,
    propertiesOptions,
    deleteNftById,
    nftsRefetch,
    customProps,
    formik,
    // openEditNftModal,
    collectionId,
    project_id,
    batchDeleteNft,
  } = useNft()
  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: customProps || {},
    // addBlankRow,
    nftOption,
    propertiesOptions,
    showProps,
  })

  const { openEditNftModal } = useEditNft()

  const handleAddNewRow = () => {
    addBlankRow()
  }

  const removeSelected = async (mappedItems: any) => {
    // await mappedItems.map(async (item: any) => await deleteNftById(item.id))
    const itemIds = mappedItems.map((item: any) => item.id)
    await batchDeleteNft(itemIds, collectionId, project_id)
    nftsRefetch()
  }

  const deleteRow = async (itemId: any) => {
    await deleteNftById(itemId)
    nftsRefetch()
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
          // openEditModal()
          openEditNftModal(itemId)
        },
      },
    ]

    return result
  }

  // console.log('gg', gridRef)
  // gridRef.current.getSelectedRows()

  return (
    <>
      <>
        <StyledButton onClick={openCreateCollectionModal}>Create Nft</StyledButton>
        <StyledButton onClick={() => handleAddNewRow()}>Add Row</StyledButton>
        <StyledButton onClick={openCreateCustomPropertyModal}>Add Custom Property</StyledButton>
        <StyledButton onClick={() => setGroupPanel((state) => !state)}>
          Toggle Group Panel
        </StyledButton>
        <Link to={'import-images'}>
          <StyledButton>Import images</StyledButton>
        </Link>
        <Link to={'import'}>
          <StyledButton>Import CSV</StyledButton>
        </Link>
        <StyledButton
          className="bt-action"
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
            type="checkbox"
            defaultChecked={false}
            checked={!parsedShowProps}
            onChange={() => {
              setShowProps(!showProps)
              localStorage.setItem('showPropsNFT', JSON.stringify(!showProps))
            }}
          />
        </label>
        <DataGrid
          ref={gridRef as any}
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          contextMenu={getContextMenuItems}
          // deleteRow={deleteRow}
          // openEditModal={openEditNftModal}
        />
      </>
      <CreateNftModal />
      <EditNftModal />
      <CreateCustomPropertyModal formik={formik} />
      {/* <ImportNft /> */}
    </>
  )
}

export default Nfts

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
