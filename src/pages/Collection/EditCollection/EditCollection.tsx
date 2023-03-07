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
import Typography from '@l3-lib/ui-core/dist/Typography'
import FormikAutoSave from 'helpers/FormikAutoSave'

const EditCollection = () => {
  const { formik, fileUploadType, handleChangeFile, onDeleteImg, toast, setToast } =
    useEditCollection()

  return (
    <>
      <StyledRoot>
        <FormikProvider value={formik}>
          <StyledMainContainer>
            <StyledHeaderDiv>
              <StyledBadgeWrapper>
                <Badge dot='warning' />
                <Typography
                  value='Draft'
                  type={Typography.types.LABEL}
                  size={Typography.sizes.md}
                  customColor='#fff'
                />
              </StyledBadgeWrapper>
              <StyledHeaderSection>
                <FormikAutoSave debounceMs={1000} />
                <Button kind={Button.kinds.TERTIARY}>Preview</Button>
                {/* <Button onClick={() => formik.handleSubmit()}>Update</Button> */}
                <StyledSearchWrapper>
                  <Search placeholder='Search' wrapperClassName='l3-storybook-search_size' />
                </StyledSearchWrapper>
              </StyledHeaderSection>
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
          </StyledMainContainer>
        </FormikProvider>
      </StyledRoot>
    </>
  )
}

export default EditCollection

export const StyledHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  position: sticky;
  top: 0;
  z-index: 100;
`
export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`

export const StyledFormSection = styled.div<{ columns?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  width: 65%;
`
export const StyledBadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
export const StyledHeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  width: 100%;
`

export const StyledSearchWrapper = styled.div`
  margin-left: 20px;
  /* width: 400px; */
`
