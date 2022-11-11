import React from 'react'

import columnConfig from './columnConfig'

import { useModal } from 'hooks'
import CreateApiModal from './CreateApiKey/CreateApiModal'

import Heading from 'oldComponents/atoms/Heading'
import { StyledButton, StyledTypography } from './ApiKeysStyle'

// import { tempData } from './tempData'
import useApiKeys from './useApiKeys'
import EditApiModal from './EditApiKey'
import { CustomTable } from "oldComponents/atoms/CustomTable";

const ApiKeys = () => {
  const {apiKeys, handleEditApiKey} = useApiKeys()
  
  const {openModal} = useModal()
  
  const config = columnConfig({handleEditApiKey})
  
  
  const openCreateAPIModal = () => {
	openModal({
	  name:'add-api-keys-modal',
	})
  }
  
  return (
	<>
	  <Heading title={"Api keys"}/>
	  
	  <StyledButton onClick={openCreateAPIModal}>
		<StyledTypography variant="caption">Add New Key</StyledTypography>
	  </StyledButton>
	  
	  <CustomTable
		templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
		size="14px"
		displayHeader
		columnsConfig={config}
		data={apiKeys?.items || []}
		alignItems="end"
		rowDifferentColors
		tableWidth={'1200px'}
	  />
	  <CreateApiModal/>
	  <EditApiModal/>
	</>
  )
}

export default ApiKeys
