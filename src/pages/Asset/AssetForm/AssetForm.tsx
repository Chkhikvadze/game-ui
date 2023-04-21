import { useRef } from 'react'

import Button from '@l3-lib/ui-core/dist/Button'

import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import AddCustomFields from 'components/AddCustomFields'

import FormikTextField from 'components/TextFieldFormik'

import {
  StyledContainer,
  StyledHeader,
  StyleToggleContainer,
  StyledBodyContainer,
  StyledHeaderRightContainer,
  StyledTypography,
  StyledTextFieldForm,
  StyledTypographySm,
  StyledCustomFiedlsContainer,
  StyledGenerateBtn,
} from 'styles/modalFormStyle.css'

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
    <StyledContainer>
      <StyledBodyContainer>
        <FormikTextField name='asset_name' placeholder='Name' label='Name' />

        <FormikTextField name='asset_description' placeholder='Description' label='Description' />
        <FormikTextField name='asset_supply' placeholder='Supply' label='Supply' />
        <FormikTextField name='asset_price' placeholder='Price' label='Price' />
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
      </StyledBodyContainer>

      <StyledCustomFiedlsContainer>
        {!isEdit && (
          <AddCustomFields name='custom_props' formik={formik} data={custom_props || []} />
        )}
      </StyledCustomFiedlsContainer>
    </StyledContainer>
  )
}

export default AssetForm
