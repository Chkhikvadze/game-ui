import React from 'react'
import { useEditProject } from 'pages/Project/EditProject/useEditProject'
import ProjectForm from 'pages/Project/ProjectForm'

import { FormikProvider } from 'formik'

import Button from '@l3-lib/ui-core/dist/Button'
import Search from '@l3-lib/ui-core/dist/Search'
import Badge from '@l3-lib/ui-core/dist/Badge'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Toast from '@l3-lib/ui-core/dist/Toast'

import FormikAutoSave from 'helpers/FormikAutoSave'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import {
  StyledBadgeWrapper,
  StyledFormSection,
  StyledHeaderDiv,
  StyledHeaderSection,
  StyledMainContainer,
  StyledSearchWrapper,
} from 'pages/Collection/EditCollection/EditCollection'

const EditProject = () => {
  const {
    formik,
    handleChangeFile,
    onDeleteImg,
    fileUploadType,
    projectById,
    toast,
    setToast,
    updateToggle,
  } = useEditProject()

  let dotState = ''

  if (projectById.status === 'Active') {
    dotState = 'positive'
  } else if (projectById.status === 'Draft') {
    dotState = 'warning'
  }

  return (
    <StyledRoot>
      <FormikProvider value={formik}>
        <StyledMainContainer>
          <StyledHeaderDiv>
            <StyledBadgeWrapper>
              <Badge dot={dotState} />
              <Typography
                value={projectById.status}
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
                customColor='#fff'
              />
            </StyledBadgeWrapper>
            <StyledHeaderSection>
              <FormikAutoSave debounceMs={1000} />
              <Button kind={Button.kinds.TERTIARY}>Preview</Button>
              <StyledSearchWrapper>
                <Search placeholder='Search' wrapperClassName='l3-storybook-search_size' />
              </StyledSearchWrapper>
            </StyledHeaderSection>
          </StyledHeaderDiv>
          <StyledFormSection>
            <ProjectForm
              formik={formik}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
              fileUploadType={fileUploadType}
              isEdit={true}
              updateToggle={updateToggle}
            />
            {/* <Button color='primary' onClick={formik.handleSubmit}>
              Save
            </Button> */}
          </StyledFormSection>
          <Toast
            label={toast.message}
            type={toast.type}
            autoHideDuration={5000}
            open={toast.open}
            onClose={() => setToast({ open: false })}
          />
        </StyledMainContainer>
      </FormikProvider>
    </StyledRoot>
  )
}

export default EditProject
