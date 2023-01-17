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
  const [triggerRemoveSelected, setTriggerRemoveSelected] = useState(0)

  let parsedShowProps = true
  const showPropsStorage = localStorage.getItem('showPropsProperty')
  if (showPropsStorage) {
    parsedShowProps = JSON.parse(showPropsStorage)
  }
  const [showProps, setShowProps] = useState(parsedShowProps)

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

  const removeSelected = async (mappedItems: any) => {
    await mappedItems.map(async (item: any) => await deletePropertById(item.id))
    propertiesRefetch()
  }

  const deleteRow = async (itemId: any) => {
    await deletePropertById(itemId)
    propertiesRefetch()
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
              localStorage.setItem('showPropsProperty', JSON.stringify(!showProps))
            }}
          />
        </label>
        <DataGrid
          data={data || []}
          columnConfig={config}
          groupPanel={groupPanel}
          deleteRow={deleteRow}
          openEditModal={openEditPropertyModal}
          removeSelected={removeSelected}
          triggerRemoveSelected={triggerRemoveSelected}
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
