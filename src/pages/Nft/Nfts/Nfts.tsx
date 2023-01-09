import React, { useState } from 'react'
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

const Nfts = () => {
  const cellEditFn = useUpdateCacheThenServerNft()
  const [groupPanel, setGroupPanel] = useState(false)

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
  } = useNft()
  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: customProps || {},
    // addBlankRow,
    nftOption,
    propertiesOptions,
  })

  const handleAddNewRow = () => {
    addBlankRow()
  }

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
          <StyledButton>Import</StyledButton>
        </Link>
        <DataGrid
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          addNewRow={addBlankRow}
          deleteRow={deleteNftById}
          refetch={nftsRefetch}
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
