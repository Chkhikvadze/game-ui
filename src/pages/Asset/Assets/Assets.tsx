import { useState, useRef, useEffect, useMemo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { useModal } from 'hooks'

import styled from 'styled-components'

import { useUpdateCacheThenServerAsset } from 'services'

import CreateAssetModal from 'modals/CreateAssetModal'
// import ImportAsset from '../ImportAsset/ImportAsset'

import { useAsset } from './useAsset'
import columnConfig from './columnConfig'

import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'

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
// import { StyledHeaderGroup } from 'styles/globalStyle.css'
import { getAssetGlobalErrors } from 'utils/aiAnalysis'
import AssetsErrors from './components/AssetsErrors'
import { StyledGroupContainer, StyledTableActionBtn } from 'routes/LayoutStyle'
import { LayoutContext } from 'contexts'

// import CloseIconSvg from 'assets/svgComponents/CloseIconSvg'

const Assets = () => {
  const params = useParams()
  const { onChangeLayout, expand } = useContext(LayoutContext)

  const collectionId: string = params?.collectionId!
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

  // todo you are using two hook it's ok but you can same create in one hook and use it everywhere
  const {
    openCreateAssetModal,
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
    collection,
    game_id,
    batchDeleteAsset,
  } = useAsset({ collection_id: collectionId })

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

  // todo please remove this logics from function

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
    <StyledGroupContainer mt='20'>
      <div id='header_group'>
        <StyledHeaderGroup>
          <StyledTableValue
            id='table_value'
            expand={expand}
          >{`${data?.length} Assets`}</StyledTableValue>

          <StyledExpandButton expand={expand} onClick={prevValue => onChangeLayout(!prevValue)}>
            {expand ? 'Close' : 'Expand'}
          </StyledExpandButton>
        </StyledHeaderGroup>
        <StyledActionsSection>
          <StyledColumn>
            {collection && data && <AssetsErrors assets={data} collection={collection} />}

            {/* <IconButton icon={Close} kind={IconButton.kinds.TERTIARY} ariaLabel="My tertiary IconButton" /> */}
          </StyledColumn>
          <StyledColumn>
            <StyledTableActionBtn onClick={() => handleAddNewRow()}>
              {t('add-row')}
            </StyledTableActionBtn>
            {/* <Search placeholder='Large' /> */}
            {/* <Button kind={Button.kinds.TERTIARY} >
            Add Property
          </Button> */}
            <Button onClick={openCreateAssetModal}>{t('create-asset')}</Button>

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

                <StyledClickableDiv onClick={() => setGroupPanel(state => !state)}>
                  <StyledLink to={'import-images'}>
                    <Typography
                      value={'Group by'}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                      customColor={'rgba(250,250,250, 0.8)'}
                    />
                  </StyledLink>
                </StyledClickableDiv>
                <StyledClickableDiv onClick={openCreateCustomPropertyModal}>
                  <StyledLink to={'import-images'}>
                    <Typography
                      value={'Add property'}
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
      </div>
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
      {/* <CreateAssetModal /> */}
      <EditAssetModal />
      <CreateCustomPropertyModal formik={formik} />
      {/* <ImportAsset /> */}
    </StyledGroupContainer>
  )
}

export default Assets

export const StyledActionsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding: 10px 0;
  padding-bottom: 10px;
  // margin-top: -20px;
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

const StyledHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledExpandButton = styled.button<{ expand?: boolean }>`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.6);
  padding: 10px 0px;

  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(-50%, 50%);
  z-index: 10203040;
`}
`

const StyledTableValue = styled.h1<{ expand?: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
  ${({ expand }) =>
    expand &&
    `
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10203040;
`}
`

export const StyledAddRowWrapper = styled.div`
  margin-left: auto;
`
