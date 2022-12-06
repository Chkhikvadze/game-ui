import React from 'react'
import { FormikProvider } from 'formik'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import CustomSelectField from 'oldComponents/atoms/CustomSelect'
import CustomTextField from 'oldComponents/molecules/CustomTextField/CustomTextField'

import { StyledFromSection } from 'pages/ApiKeys/ApiKeysStyle'

import { nft_type_options } from 'utils/constants'
import { useEditNft } from './useEditNft'
import Button from 'oldComponents/atoms/Button'
import NftForm from 'pages/Nft/NftForm'


const EditNft = () => {
  const { formik } = useEditNft()
  
  console.log(formik.values)
  
  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledFromSection>
            <NftForm useHook={useEditNft} />
            <Button color='primary' onClick={formik.handleSubmit}>
              Update
            </Button>
          </StyledFromSection>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}


export default EditNft