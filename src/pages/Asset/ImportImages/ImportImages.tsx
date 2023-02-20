/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components'

import ButtonLink from 'oldComponents/atoms/ButtonLink'
import FileUploadField from 'atoms/FileUploadField'
import { ImageIcon } from '@radix-ui/react-icons'

// import ReviewImport from './ReviewImport'

// import useImportAsset from './userImportAsset'
// import Button from 'oldComponents/atoms/Button'
import useImportImages from './useImportImages'

const ImportImages = () => {
  const { handleFileChange, selectedFiled, loading } = useImportImages()

  return (
    <>
      <p>
        Optional: If your table has a primary key, make sure it is selected properly so that the
        identifiers will be preserved during import. Only columns of type integer are supported.
      </p>
      <p>
        Preview the data you're importing This preview includes the first 25 records of your data.
        Once you click upload, all of your data will be imported.
      </p>
      <p>
        Click a column header below to change the type. If it's an integer you can create a table
        reference with an existing Database table.
      </p>
      <br />
      <div style={{ color: '#fff' }}>{loading ? 'Loading...' : ''}</div>
      <br />
      <div style={{ display: 'flex' }}>
        {selectedFiled.files.map((item: any, index: number) => (
          <StyledImageWrapper>
            {selectedFiled.uploaded_files[index] ? (
              <img src={selectedFiled.uploaded_files[index]} width='100px' />
            ) : (
              item.name
            )}
          </StyledImageWrapper>
        ))}
      </div>

      <StyledFormSection>
        <div style={{ width: '200px', height: '100px' }}>
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
            webkitdirectory
            mozdirectory
            msdirectory
            odirectory
            directory
            multiple
            id='folder'
          />
        </div>
      </StyledFormSection>
    </>
  )
}

export default ImportImages

export const StyledActionsContainer = styled.div`
  display: flex;
  justify-items: flex-end;
`

export const StyledModalButtonLink = styled(ButtonLink)`
  text-decoration: none;
  margin-right: 12px;
  margin-top: 3px;
`

export const StyledUploadImg = styled(FileUploadField)`
  width: 100%;
  height: 300px;
`

export const StyledFormSection = styled.div<{ columns?: string }>`
  gap: 30px;
  & .root_container {
    width: fit-content;
  }
`

const StyledImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-left: 10px;
  border: 1px solid black;
`
