import { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useModal } from 'hooks'

import styled from 'styled-components'

import { useUpdateCacheThenServerAsset } from 'services'

import CreateAssetModal from 'modals/CreateAssetModal'
// import ImportAsset from '../ImportAsset/ImportAsset'

import { useAsset } from './useAsset'
import columnConfig from './columnConfig'

import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import { useEditAsset } from '../EditAsset/useEditAsset'
import EditAssetModal from '../../../modals/EditAssetModal'

import DataGrid from 'components/DataGrid'
import Button from '@l3-lib/ui-core/dist/Button'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import ToastBanner from 'components/ToastBanner/ToastBanner'
import { StyleHeaderGroup } from 'styles/globalStyle.css'
import { getAssetGlobalErrors } from 'utils/aiAnalysis'
import AssetsErrors from './components/AssetsErrors'

// import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

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
    attributesOptions,
    achievementsOptions,
    rewardsOptions,
    deleteAssetById,
    assetsRefetch,
    customProps,
    formik,
    // openEditNftModal,
    collectionId,
    collection,
    game_id,
    batchDeleteAsset,
  } = useAsset()

  const { openEditAssetModal, batchUpdateAssets, handleUpdateMedia, uploading } = useEditAsset()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: customProps || {},
    // addBlankRow,
    assetOption,
    propertiesOptions,
    attributesOptions,
    achievementsOptions,
    rewardsOptions,
    showProps,
    handleUpdateMedia,
    openEditAssetModal,
    uploading,
  })

  const handleAddNewRow = async () => {
    await addBlankRow()
  }

  const removeSelected = async (mappedItems: any) => {
    // await mappedItems.map(async (item: any) => await deleteNftById(item.id))
    const itemIds = mappedItems.map((item: any) => item.id)
    await batchDeleteAsset(itemIds, collectionId, game_id)
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
    const item = params?.node?.data
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
          openEditAssetModal(item)
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
      await batchUpdateAssets(newData, collectionId, game_id)
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

  return (
    <>
      <StyleHeaderGroup grid>
        <Heading type={Heading.types.h1} value={`${data?.length} Assets`} customColor={'#FFF'} />
      </StyleHeaderGroup>

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
          {/* <Search placeholder='Large' /> */}
          <Button kind={Button.kinds.TERTIARY} onClick={openCreateCustomPropertyModal}>
            Add Property
          </Button>
          <Button onClick={openCreateCollectionModal}>{t('create-asset')}</Button>

          <MenuButton component={MenuDots}>
            <StyledButtonsWrapper>
              <StyledClickableDiv onClick={updateTokenId}>
                <Typography
                  value={t('update-token-id')}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor={'rgba(250,250,250, 0.8)'}
                />
              </StyledClickableDiv>

              <StyledClickableDiv onClick={handleRemove}>
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
                  onChange={handleShowPropsCheckbox}
                />
              </StyledLabel>

              <StyledClickableDiv>
                <StyledLink to={'import-images'}>
                  <Typography
                    value={t('import-images')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                    customColor={'rgba(250,250,250, 0.8)'}
                  />
                </StyledLink>
              </StyledClickableDiv>

              <StyledClickableDiv>
                <StyledLink to={'import'}>
                  <Typography
                    value={t('import-csv')}
                    type={Typography.types.LABEL}
                    size={Typography.sizes.md}
                    customColor={'rgba(250,250,250, 0.8)'}
                  />
                </StyledLink>
              </StyledClickableDiv>
            </StyledButtonsWrapper>
          </MenuButton>
        </StyledColumn>
      </StyledActionsSection>

      {/* {errors.map(error => (
        <div key={error.description}>
          <Typography
            value={`${error.type} - ${error.description}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'rgba(250,250,250, 0.8)'}
          />
        </div>
      ))}

      {warnings.map(error => (
        <div key={error.description}>
          <Typography
            value={`${error.type} - ${error.description}`}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'rgba(250,250,250, 0.8)'}
          />
        </div>
      ))} */}

      {collection && data && <AssetsErrors assets={data} collection={collection} />}

      <>
        <DataGrid
          ref={gridRef as any}
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          contextMenu={getContextMenuItems}
          headerHeight={250}
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
export const StyledActionsSection = styled.div`
  margin-bottom: 18px;
  padding: 0px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledColumn = styled.div`
  display: flex;
  align-items: center;

  gap: 5px;
`
export const StyledButtonsWrapper = styled.div`
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
export const StyledClickableDiv = styled.div`
  cursor: pointer;
`
export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`
const StyledLink = styled(Link)`
  color: rgba(250, 250, 250, 0.8);
`
