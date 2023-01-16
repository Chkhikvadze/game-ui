import styled from 'styled-components'
import { useState } from 'react'

import { useProperties } from './useProperties'

import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import columnConfig from './columnConfig'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import CreateProperty from 'modals/CreatePropertyModal'
import CreateCustomPropertyModal from 'modals/CreateCustomPropertyModal'
import DataGrid from '../../../components/DataGrid'
import EditPropertyModal from '../EditProperty/EditPropertyModal'
import { useEditProperty } from '../EditProperty/useEditProperty'

const Properties = () => {
  const cellEditFn = useUpdateCacheThenServerProperty()
  const [groupPanel, setGroupPanel] = useState(false)
  const [showProps, setShowProps] = useState(true)

  const {
    openCreateCollectionModal,
    openCreateCustomPropertyModal,
    data,
    handleDeleteCollection,
    customProps,
    addBlankRow,
    deletePropertById,
    propertiesRefetch,
    formik,
  } = useProperties()

  const { openEditPropertyModal } = useEditProperty()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn: cellEditFn,
    customPropCols: customProps || {},
    showProps,
  })

  const handleAddNewRow = () => {
    addBlankRow()
  }

  return (
    <>
      <>
        <StyledButton onClick={openCreateCollectionModal}>Create Property</StyledButton>
        <StyledButton onClick={() => handleAddNewRow()}>Add Row</StyledButton>
        <StyledButton onClick={openCreateCustomPropertyModal}>Add Custom Property</StyledButton>
        <StyledButton onClick={() => setGroupPanel((state) => !state)}>
          Toggle Group Panel
        </StyledButton>
        <label>
          Show Custom Props
          <input type="checkbox" defaultChecked={false} onChange={() => setShowProps(!showProps)} />
        </label>
        <DataGrid
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          addNewRow={addBlankRow}
          deleteRow={deletePropertById}
          refetch={propertiesRefetch}
          openEditModal={openEditPropertyModal}
        />
      </>
      <CreateProperty />
      <EditPropertyModal />
      <CreateCustomPropertyModal formik={formik} />
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
