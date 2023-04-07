import React, { useRef } from 'react'
import styled from 'styled-components'

import Button from '@l3-lib/ui-core/dist/Button'

import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import AddCustomFields from 'components/AddCustomFields'
import { useEditAsset } from '../EditAsset/useEditAsset'

type assetFormType = {
  //will fix any later
  formik: any
  propertiesOptions: any
  assetOption: any
  isEdit?: boolean
  handleUploadImages?: any
  loadingMediaUpload?: boolean
}

const AssetForm = ({
  formik,
  propertiesOptions = [],
  assetOption,
  isEdit,
  handleUploadImages,
  loadingMediaUpload,
}: assetFormType) => {
  const { custom_props } = formik?.values

  const uploadRef = useRef(null as any)

  const onButtonClick = async (inputFile: any) => {
    inputFile.current.click()
  }

  return (
    <>
      <CustomTextField name='asset_name' placeholder='Name' label='Name' mandatory />

      <CustomTextField
        name='asset_description'
        placeholder='Description'
        label='Description'
        mandatory
      />
      <CustomTextField name='asset_supply' placeholder='Supply' label='Supply' numeric mandatory />
      <CustomTextField name='asset_price' placeholder='Price' label='Price' numeric mandatory />
      <CustomSelectField
        name='asset_properties'
        placeholder='Properties'
        label='Properties'
        options={propertiesOptions || []}
        mandatory
        isMulti
      />
      <CustomSelectField
        name='parent_asset'
        placeholder='Parent asset'
        label='Parent asset'
        options={assetOption || []}
        mandatory
      />

      {!isEdit && (
        <div>
          <Button onClick={() => onButtonClick(uploadRef)} disabled={loadingMediaUpload}>
            {loadingMediaUpload ? 'Uploading' : 'Add Medias'}
          </Button>
          <input
            type='file'
            multiple
            ref={uploadRef}
            style={{ display: 'none' }}
            onChange={e => handleUploadImages(e, 'medias')}
          />
        </div>
      )}

      <StyledCustomFieldContainer>
        {!isEdit && (
          <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
        )}
      </StyledCustomFieldContainer>
    </>
  )
}

export default AssetForm

const StyledCustomFieldContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`
