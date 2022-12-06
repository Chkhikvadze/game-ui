import React from "react"
import styled from "styled-components"
import { useProperties } from "./useProperties"
import { CustomTable } from "oldComponents/atoms/CustomTable"
import columnConfig from "./columnConfig"
import { StyledTypography } from "pages/ApiKeys/ApiKeysStyle"
import CreateProperty from "modals/CreatePropertyModal"

const Properties = () => {
  
  const {openCreateCollectionModal, data, handleDeleteCollection} = useProperties()
  const config = columnConfig({handleDelete:handleDeleteCollection})
  
  return (
    <>
      <>
        <StyledButton onClick={openCreateCollectionModal}>Create Property</StyledButton>
        <CustomTable
          templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
          size="14px"
          displayHeader
          columnsConfig={config}
          data={data?.items || []}
          alignItems="end"
          rowDifferentColors
        />
      </>
      <CreateProperty />
    </>
  )
}

export default Properties

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