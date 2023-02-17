// import React, { useState } from 'react'
import { FormikProvider } from 'formik'

import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import styled from 'styled-components'

// import { StyledFormSection } from 'pages/ApiKeys/ApiKeysStyle'

import { useEditCollection } from './useEditCollection'

// import Button from 'oldComponents/atoms/Button'
import CollectionForm from '../CollectionForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Search from '@l3-lib/ui-core/dist/Search'
import Toast from '@l3-lib/ui-core/dist/Toast'
import Badge from '@l3-lib/ui-core/dist/Badge'

const EditCollection = () => {
  const { formik, fileUploadType, handleChangeFile, onDeleteImg, toast, setToast } =
    useEditCollection()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              // position: 'relative',
              gap: '20px',
            }}
          >
            <StyledHeaderDiv>
              <div>
                <span style={{ color: '#fff' }}>Draft</span>
                <Badge dot='warning' />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '30px',
                  width: '100%',
                }}
              >
                <Button kind={Button.kinds.TERTIARY}>Preview</Button>
                <Button onClick={() => formik.handleSubmit()}>Update</Button>
                <StyledSearchWrapper>
                  <Search placeholder='Search' wrapperClassName='l3-storybook-search_size' />
                </StyledSearchWrapper>
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

            <Toast
              type={toast.type}
              autoHideDuration={5000}
              open={toast.open}
              onClose={() => setToast({ open: false })}
            >
              {toast.message}
            </Toast>
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
  gap: 20px;

  position: sticky;
  top: 0;
  z-index: 100;
`
export const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 65%;
`
const StyledSearchWrapper = styled.div`
  margin-left: 20px;
  /* width: 400px; */
`
