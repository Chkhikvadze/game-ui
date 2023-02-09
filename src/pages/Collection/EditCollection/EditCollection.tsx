import React from 'react'
import { FormikProvider } from 'formik'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'

import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

import { useEditCollection } from './useEditCollection'

// import Button from 'oldComponents/atoms/Button'
import CollectionForm from '../CollectionForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Search from '@l3-lib/ui-core/dist/Search'
import styled from 'styled-components'

const EditCollection = () => {
  const { formik, fileUploadType, handleChangeFile, onDeleteImg } = useEditCollection()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              position: 'relative',
            }}
          >
            <StyledHeaderDiv>
              <div>
                <span>Draft</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <Search placeholder="Search" wrapperClassName="l3-storybook-search_size" />
                <Button kind={Button.kinds.TERTIARY}>Preview</Button>
                <Button onClick={() => formik.handleSubmit()}>Update</Button>
              </div>
            </StyledHeaderDiv>
            <StyledFormSection>
              <CollectionForm
                formik={formik}
                fileUploadType={fileUploadType}
                handleChangeFile={handleChangeFile}
                onDeleteImg={onDeleteImg}
                isEdit={true}
              />
            </StyledFormSection>
          </div>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default EditCollection

const StyledHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
`
