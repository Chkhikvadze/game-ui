import React, { useState, useRef } from 'react'
import styled from 'styled-components'

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
  const [triggerRemoveSelected, setTriggerRemoveSelected] = useState(0)

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
    await mappedItems.map(async (item: any) => await deleteNftById(item.id))
    nftsRefetch()
  }

  const deleteRow = async (itemId: any) => {
    await deleteNftById(itemId)
    nftsRefetch()
  }

  // console.log("gg", gridRef)
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
            setTriggerRemoveSelected((trigger) => trigger + 1)
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
          data={data || []}
          ref={gridRef as any}
          columnConfig={config}
          groupPanel={groupPanel}
          deleteRow={deleteRow}
          openEditModal={openEditNftModal}
          removeSelected={removeSelected}
          triggerRemoveSelected={triggerRemoveSelected}
        />

        {/* <CustomTable
          templateColumns='1fr repeat(1, 1fr)  repeat(1,1fr)'
          size='14px'
          displayHeader
          columnsConfig={config}
          data={data?.items || []}
          alignItems='end'
          rowDifferentColors
        /> */}
      </>
      <CreateNftModal />
      <EditNftModal />
      <CreateCustomPropertyModal formik={formik} />
      {/* <ImportNft /> */}
    </>
  )
}

export default Nfts

// const StyledContainer = styled.div`
//   display: grid;
//   align-items: center;
//   justify-items: center;
//   height: 100%;
// `

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
