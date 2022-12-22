import React from 'react'

import { ImageIcon } from '@radix-ui/react-icons'

import { StyledUploadImg } from 'modals/CreateProjectModal'

import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'

type nftFormType = {
  formik: any
  handleChangeFile: any
  onDeleteImg: any
  fileUploadType: any
  propertiesOptions: any
  nftOption: any
}

const NftForm = ({
  formik,
  handleChangeFile,
  onDeleteImg,
  fileUploadType,
  propertiesOptions = [],
  nftOption,
}: nftFormType) => {
  const { nft_asset_url } = formik?.values

  return (
    <>
      <CustomTextField name="nft_name" placeholder="Name" label="Name" mandatory />
      <StyledUploadImg
        name={'nft_asset_url'}
        onChange={(e: any) => handleChangeFile(e, 'nft_asset_url')}
        placeholder={'Upload Background image'}
        fileUploadType={fileUploadType}
        img={nft_asset_url}
        label={'Asset url'}
        description={`This image will appear as a background image of the game. 1500 x 1700 recommended.`}
        uploadIcon={<ImageIcon style={{ width: 50, height: 50, color: '#fff' }} />}
        onDeleteImg={() => onDeleteImg('nft_asset_url')}
      />
      <CustomTextField
        name="nft_description"
        placeholder="Description"
        label="Description"
        mandatory
      />
      <CustomTextField name="nft_supply" placeholder="Supply" label="Supply" numeric mandatory />
      <CustomSelectField
        name="nft_properties"
        placeholder="Properties"
        label="Properties"
        options={propertiesOptions || []}
        mandatory
        isMulti
      />
      <CustomSelectField
        name="parent_nft"
        placeholder="Parent nft"
        label="Parent nft"
        options={nftOption || []}
        mandatory
      />
    </>
  )
}

export default NftForm