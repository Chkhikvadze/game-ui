import React from 'react'
import { FormikProvider } from 'formik'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import { StyledFromSection } from 'pages/ApiKeys/ApiKeysStyle'

import { useEditNft } from './useEditNft'
import Button from 'oldComponents/atoms/Button'
import NftForm from 'pages/Nft/NftForm'

const EditNft = () => {
  const { formik } = useEditNft()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledFromSection>
            <NftForm useHook={useEditNft} />
            <Button color="primary" onClick={formik.handleSubmit}>
              Update
            </Button>
          </StyledFromSection>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}


export default EditNft