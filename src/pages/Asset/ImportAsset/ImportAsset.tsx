import React from 'react'
import styled from 'styled-components'

import FileUploadField from 'atoms/FileUploadField'
import { ImageIcon } from '@radix-ui/react-icons'

import ReviewImport from './ReviewImport'

import useImportAsset from './userImportAsset'
import Button from '@l3-lib/ui-core/dist/Button'

const ImportAsset = () => {
  const { handleFileChange, step, parsedCsvData, setStep, handleDownloadTemplate } =
    useImportAsset()

  function renderTabs(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        return (
          <div style={{ width: '200px', height: '100px' }}>
            <Button onClick={handleDownloadTemplate}>Download template</Button>
            <br />
            <StyledUploadImg
              name={'asset_asset_url'}
              onChange={handleFileChange}
              placeholder={'Import asset'}
              fileUploadType={''}
              img={''}
              label=''
              description=''
              uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
              onDeleteImg={() => {}}
            />
          </div>
        )

      case 1:
        return (
          <>
            <ReviewImport data={parsedCsvData} setStep={setStep} />
          </>
        )

      default:
        return <>Error..!</>
    }
  }

  return (
    <>
      <div>
        Optional: If your table has a primary key, make sure it is selected properly so that the
        identifiers will be preserved during import. Only columns of type integer are supported.
      </div>
      <div>
        Preview the data you're importing This preview includes the first 25 records of your data.
        Once you click upload, all of your data will be imported.
      </div>
      <div>
        Click a column header below to change the type. If it's an integer you can create a table
        reference with an existing Database table.
      </div>
      <StyledFormSection>{renderTabs(step)}</StyledFormSection>
    </>
  )
}

export default ImportAsset

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`

export const StyledFormSection = styled.div<{ columns?: string }>`
  gap: 30px;
  /* width: 1200px; */
  & .root_container {
    width: fit-content;
  }
`
