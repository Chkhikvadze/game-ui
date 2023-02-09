import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useModal } from 'hooks'

import CreateAssetModal from 'modals/CreateAssetModal'
// import ImportAsset from '../ImportAsset/ImportAsset'

import { useAsset } from './useAsset'
import columnConfig from './columnConfig'

// import { CustomTable } from 'oldComponents/atoms/CustomTable'
import { useUpdateCacheThenServerAsset } from 'services'

import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import { Link } from 'react-router-dom'
import DataGrid from 'components/DataGrid'
import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import { useEditAsset } from '../EditAsset/useEditAsset'
import EditAssetModal from '../EditAsset/EditAssetModal'

const Assets = () => {
  const { t } = useTranslation()
  const gridRef: any = useRef({})
  const cellEditFn = useUpdateCacheThenServerAsset()
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
    assetOption,
    propertiesOptions,
    deleteAssetById,
    assetsRefetch,
    customProps,
    formik,
    // openEditNftModal,
    collectionId,
    project_id,
    batchDeleteAsset,
  } = useAsset()
  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: customProps || {},
    // addBlankRow,
    assetOption,
    propertiesOptions,
    showProps,
  })

  const { openEditAssetModal, batchUpdateAssets } = useEditAsset()

  const handleAddNewRow = () => {
    addBlankRow()
  }

  const removeSelected = async (mappedItems: any) => {
    // await mappedItems.map(async (item: any) => await deleteNftById(item.id))
    const itemIds = mappedItems.map((item: any) => item.id)
    await batchDeleteAsset(itemIds, collectionId, project_id)
    assetsRefetch()
  }

  const deleteRow = async (itemId: any) => {
    await deleteAssetById(itemId)
    assetsRefetch()
  }

  const getContextMenuItems = (params: any) => {
    const itemId = params.node.data?.id
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
          openEditAssetModal(itemId)
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
          token_id: data.index + 1,
        })
      })
      await batchUpdateAssets(newData, collectionId, project_id)
      assetsRefetch()
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
        <StyledButton onClick={openCreateCollectionModal}>{t('create-asset')}</StyledButton>
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
          // openEditModal={openEditAssetModal}
          // noBorder={true}
        />
      </>
      <CreateAssetModal />
      <EditAssetModal />
      <CreateCustomPropertyModal formik={formik} />
      {/* <ImportAsset /> */}
    </>
  )
}

export default Assets

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
