import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useModal } from 'hooks'

import CreateAssetModal from 'modals/CreateAssetModal'
// import ImportAsset from '../ImportAsset/ImportAsset'

import { useAsset } from './useAsset'
import columnConfig from './columnConfig'

import { useUpdateCacheThenServerAsset } from 'services'

import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import { Link } from 'react-router-dom'
import DataGrid from 'components/DataGrid'
import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import { useEditAsset } from '../EditAsset/useEditAsset'
import EditAssetModal from '../EditAsset/EditAssetModal'

import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Search from '@l3-lib/ui-core/dist/Search'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

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

  const { openEditAssetModal, batchUpdateAssets, handleUpdateMedia } = useEditAsset()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: customProps || {},
    // addBlankRow,
    assetOption,
    propertiesOptions,
    showProps,
    handleUpdateMedia,
  })

  const handleAddNewRow = () => {
    addBlankRow()
  }

  const removeSelected = async (mappedItems: any) => {
    // await mappedItems.map(async (item: any) => await deleteNftById(item.id))
    const itemIds = mappedItems.map((item: any) => item.id)
    await batchDeleteAsset(itemIds, collectionId, project_id)
    assetsRefetch()
  }

  const handleRemove = () => {
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

  const handleShowPropsCheckbox = () => {
    setShowProps(!showProps)
    localStorage.setItem('showPropsNFT', JSON.stringify(!showProps))
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
      const newData: any = []
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
      <div>
        <Heading type={Heading.types.h1} value={`${data?.length} Assets`} customColor={'#FFF'} />
      </div>
      <StyledActionsSection>
        <StyledColumn>
          {/* <IconButton icon={Close} kind={IconButton.kinds.TERTIARY} ariaLabel="My tertiary IconButton" /> */}
          <Button kind={Button.kinds.TERTIARY} onClick={() => setGroupPanel(state => !state)}>
            Group by
          </Button>
          <Button kind={Button.kinds.TERTIARY} onClick={() => handleAddNewRow()}>
            {t('add-row')}
          </Button>
        </StyledColumn>
        <StyledColumn>
          <Search placeholder='Large' />
          <Button kind={Button.kinds.TERTIARY} onClick={openCreateCustomPropertyModal}>
            Add Property
          </Button>
          <Button onClick={openCreateCollectionModal}>{t('create-asset')}</Button>

          <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <Button kind={Button.kinds.SECONDARY} onClick={updateTokenId}>
                {t('update-token-id')}
              </Button>
              <Button kind={Button.kinds.SECONDARY} onClick={handleRemove}>
                {t('remove-selected')}
              </Button>
              <Link to={'import-images'}>
                <Button kind={Button.kinds.SECONDARY}>{t('import-images')}</Button>
              </Link>
              <Link to={'import'}>
                <Button kind={Button.kinds.SECONDARY}>{t('import-csv')}</Button>
              </Link>
              <label>
                {t('show-custom-props')}
                <Checkbox
                  checked={!parsedShowProps}
                  size='small'
                  kind='secondary'
                  onChange={handleShowPropsCheckbox}
                />
              </label>
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
const StyledActionsSection = styled.div`
  margin-bottom: 32px;
  margin-top: 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledColumn = styled.div`
  display: flex;
  align-items: center;
`
const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  background: rgba(250, 250, 250, 0.2);
  backdrop-filter: blur(10px);

  padding: 16px;
  border-radius: 16px;
`
