import React from 'react'
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

const Nfts = () => {
  const cellEditFn = useUpdateCacheThenServerNft()

  const {
    openCreateCollectionModal,
    data,
    handleDeleteCollection,
    addBlankRow,
    nftOption,
    propertiesOptions,
  } = useNft()
  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn,
    customPropCols: {},
    addBlankRow,
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
        <Link to={'import'}>
          <StyledButton>Import</StyledButton>
        </Link>
        <DataGrid data={data || []} columnConfig={config} />
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
