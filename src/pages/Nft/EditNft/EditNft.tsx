import React from 'react'
import { FormikProvider } from 'formik'

import { useEditNft } from './useEditNft'

import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'
import NftForm from 'pages/Nft/NftForm'


import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import Button from 'oldComponents/atoms/Button'

const EditNft = () => {
  const { formik, handleChangeFile, onDeleteImg, fileUploadType, propertiesOptions, nftOption } =
    useEditNft()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledFormSection>
            <NftForm
              formik={formik}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
              fileUploadType={fileUploadType}
              propertiesOptions={propertiesOptions}
              nftOption={nftOption}
            />
            <Button color="primary" onClick={formik.handleSubmit}>
              Update
            </Button>
          </StyledFormSection>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}


export default EditNft