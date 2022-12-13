import React, { useMemo } from 'react'
import styled from 'styled-components'
import { uuid } from 'uuidv4'

import { useProperties } from './useProperties'

import { useUpdateCacheThenServerProperty } from 'services/usePropertyService'

import columnConfig from './columnConfig'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'
import CreateProperty from 'modals/CreatePropertyModal'
import DataGrid from '../../../components/DataGrid'

const Properties = () => {
  const cellEditFn = useUpdateCacheThenServerProperty()

  const {
    openCreateCollectionModal,
    data,
    handleDeleteCollection,
    customProps,
    project_id,
    collectionId,
  } = useProperties()

  const config = columnConfig({
    handleDelete: handleDeleteCollection,
    cellEditFn: cellEditFn,
    customPropCols: customProps || {},
  })

  const newRowTemplate = useMemo(() => {
    if (customProps) {
      const rowId = uuid()

      const newRow: any = {
        custom_props: {},
        data: {
          id: rowId,
        },
        id: rowId,
        collection_id: collectionId,
        project_id: project_id,
      }
      config.forEach((item: any) => {
        newRow[item.field] = ''
      })

      const newRowKeys = Object.keys(newRow)
      const customPropObjectKeys = Object.keys(customProps)

      if (customPropObjectKeys.length) {
        customPropObjectKeys.forEach((item: string) => {
          newRow.custom_props[item] = ''

          if (newRowKeys.includes(item)) {
            delete newRow[item]
          }
        })
      }

      console.log('NEW', newRow)
      console.log('OLD', data?.items)

      return newRow
    }
  }, [config, customProps])

  return (
    <>
      <>
        <StyledButton onClick={openCreateCollectionModal}>Create Property</StyledButton>
        {/* <CustomTable
          templateColumns="1fr repeat(1, 1fr)  repeat(1,1fr)"
          size="14px"
          displayHeader
          columnsConfig={config}
          data={data?.items || []}
          alignItems="end"
          rowDifferentColors
        /> */}
        <DataGrid data={data?.items || []} columnConfig={config} newRowTemplate={newRowTemplate} />
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
