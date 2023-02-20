import React from 'react'
import styled from 'styled-components'
import { ImageIcon } from '@radix-ui/react-icons'

import { StyledUploadImg } from 'modals/CreateProjectModal'

import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import AddCustomFields from 'components/AddCustomFields'

type assetFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  propertiesOptions: any
  assetOption: any
  isEdit?: any
}

const AssetForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  propertiesOptions = [],
  assetOption,
  isEdit,
}: assetFormType) => {
  const { asset_asset_url, custom_props } = formik?.values

  return (
    <>
      <CustomTextField name='asset_name' placeholder='Name' label='Name' mandatory />
      <StyledUploadImg
        name={'asset_asset_url'}
        onChange={(e: any) => handleChangeFile(e, 'asset_asset_url')}
        placeholder={'Upload Background image'}
        fileUploadType={fileUploadType}
        img={asset_asset_url}
        label={'Asset url'}
        description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
        uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
        onDeleteImg={() => onDeleteImg('asset_asset_url')}
      />
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
