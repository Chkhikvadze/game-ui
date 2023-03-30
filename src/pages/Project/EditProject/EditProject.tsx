import React, { useState } from 'react'
import { useEditProject } from 'pages/Project/EditProject/useEditProject'
import ProjectForm from 'pages/Project/ProjectForm'

import { FormikProvider } from 'formik'

// import Button from '@l3-lib/ui-core/dist/Button'
// import Search from '@l3-lib/ui-core/dist/Search'
import Badge from '@l3-lib/ui-core/dist/Badge'
import Typography from '@l3-lib/ui-core/dist/Typography'
import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

// import FormikAutoSave from 'helpers/FormikAutoSave'

import {
  StyledFormSection,
  // StyledHeaderDiv,
  // StyledHeaderSection,
  StyledMainContainer,
  // StyledSearchWrapper,
} from 'pages/Collection/EditCollection/EditCollection'
import Appearance from './Appearance/Appearance'
import styled from 'styled-components'
import { StyledButtonWrapper, StyledRoot } from '../Projects/Projects'
import GeneralForm from './GeneralForm/GeneralForm'

const EditProject = () => {
  const {
    formik,
    handleChangeFile,
    handleUploadImages,
    onDeleteImg,
    fileUploadType,
    projectById,
    updateToggle,
  } = useEditProject()

  let dotState = ''
  let badgeLabel = ''

  if (projectById.status === 'Active') {
    dotState = 'positive'
    badgeLabel = 'Live'
  } else if (projectById.status === 'Draft') {
    dotState = 'warning'
    badgeLabel = 'Draft'
  }

  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledRoot>
      <FormikProvider value={formik}>
        <StyledStatusWrapper>
          <StyledBadgeWrapper>
            <Badge draft='warning' label={badgeLabel} dot={dotState} />
          </StyledBadgeWrapper>
          <StyledMenuDots />
        </StyledStatusWrapper>
        <StyledTabContext activeTabId={activeTab}>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>General</Tab>
            <Tab onClick={() => setActiveTab(1)}>Appearance</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <GeneralForm />
            </TabPanel>

            <TabPanel>
              <Appearance />
            </TabPanel>
          </TabPanels>
        </StyledTabContext>
      </FormikProvider>

      {/* <FormikProvider value={formik}> */}
      {/* <StyledMainContainer> */}
      {/* <StyledHeaderDiv>
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
          </StyledHeaderDiv> */}
      {/* <StyledFormSection>
            <ProjectForm
              formik={formik}
              handleChangeFile={handleChangeFile}
              onDeleteImg={onDeleteImg}
              fileUploadType={fileUploadType}
              isEdit={true}
              updateToggle={updateToggle}
            /> */}
      {/* <Button color='primary' onClick={formik.handleSubmit}>
              Save
            </Button> */}
      {/* </StyledFormSection>
        </StyledMainContainer> */}
      {/* </FormikProvider> */}
    </StyledRoot>
  )
}

export default EditProject

const StyledTabContext = styled(TabsContext)`
  width: 100%;
`

const StyledStatusWrapper = styled.div`
  position: absolute;
  align-self: flex-end;
  margin-top: 5px;
  display: flex;

  align-items: center;

  @media only screen and (max-width: 1200px) {
    position: static;
    align-self: auto;
    margin-top: auto;
  }
`
const StyledMenuDots = styled(MenuDots)`
  height: 25px;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
