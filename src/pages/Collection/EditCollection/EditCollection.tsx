import React from "react"
import { FormikProvider } from "formik"

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import { StyledFromSection } from "pages/ApiKeys/ApiKeysStyle"


import { useEditCollection } from './useEditCollection'

import Button from "oldComponents/atoms/Button"
import CollectionForm from '../CollectionForm'

const EditCollection = () => {
  const { formik, fileUploadType, handleChangeFile, onDeleteImg } = useEditCollection()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledFromSection>
            <CollectionForm
              formik={formik}
              fileUploadType={fileUploadType}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
            />
            <Button color={'primary'} onClick={() => formik.handleSubmit()}>
              Update
            </Button>
          </StyledFromSection>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}


export default EditCollection