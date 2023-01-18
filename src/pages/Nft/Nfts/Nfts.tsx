import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
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

  const { openEditNftModal, batchUpdateNfts } = useEditNft()

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
              label: t('are-you-sure-you-want-to-delete-this-row?'),
              title: t('delete-row'),
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

  const updateTokenId = () => {
    const updateFunc = async () => {
      await gridRef.current.refreshFilter()
      const allData = gridRef.current.getAllData()
      let newData: any = []
      await allData.forEach((data: any) => {
        newData.push({
          id: data.item.id,
          name: data.item.name,
          parent_id: data.item.parent_id,
          properties: data.item.properties,
          config: data.item.config,
          formats: data.item.formats,
          description: data.item.description,
          price: data.item.price,
          supply: data.item.supply,
          nft_type: data.item.nft_type,
          asset_url: data.item.asset_url,
          token_id: data.index + 1,
        })
      })
      await batchUpdateNfts(newData, collectionId, project_id)
      nftsRefetch()
      closeModal('delete-confirmation-modal')
    }

    openModal({
      name: 'delete-confirmation-modal',
      data: {
        deleteItem: updateFunc,
        closeModal: () => closeModal('delete-confirmation-modal'),
        label: 'Are you sure you want to update Token ID?',
        title: 'Update Token ID',
      },
    })
  }
  // console.log('gg', gridRef)
  // // gridRef.current.getSelectedRows()

  return (
    <>
      <>
        <StyledButton onClick={openCreateCollectionModal}>{t('create-nft')}</StyledButton>
        <StyledButton onClick={() => handleAddNewRow()}>{t('add-row')}</StyledButton>
        <StyledButton onClick={openCreateCustomPropertyModal}>
          {t('add-custom-property')}
        </StyledButton>
        <StyledButton onClick={() => setGroupPanel((state) => !state)}>
          {t('toggle-group-panel')}
        </StyledButton>
        <StyledButton
          onClick={() => {
            updateTokenId()
          }}
        >
          {t('update-token-id')}
        </StyledButton>
        <Link to={'import-images'}>
          <StyledButton>{t('import-images')}</StyledButton>
        </Link>
        <Link to={'import'}>
          <StyledButton>{t('import-csv')}</StyledButton>
        </Link>
        <StyledButton
          className="bt-action"
          onClick={() =>
            openModal({
              name: 'delete-confirmation-modal',
              data: {
                deleteItem: () => {
                  const rows = gridRef.current.getSelectedRows()
                  removeSelected(rows)
                  closeModal('delete-confirmation-modal')
                },
                closeModal: () => closeModal('delete-confirmation-modal'),
                label: t('are-you-sure-you-want-to-delete-this-row?'),
                title: t('delete-row'),
              },
            })
          }
        >
          {t('remove-selected')}
        </StyledButton>
        <label>
          {t('show-custom-props')}
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
