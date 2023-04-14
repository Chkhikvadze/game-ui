import { useState } from 'react'
import { FormikProvider } from 'formik'

// import FormikAutoSave from 'helpers/FormikAutoSave'

import styled from 'styled-components'

import { useEditCollection } from './useEditCollection'

// import CollectionForm from '../CollectionForm'

import Button from '@l3-lib/ui-core/dist/Button'
import Badge from '@l3-lib/ui-core/dist/Badge'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { FLexSpaceBetween, StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import {
  StyledMenuDots,
  StyledStatusWrapper,
  StyledTabContext,
} from 'pages/Project/EditProject/EditProject'
import GeneralForm from './GeneralForm'
import Appearance from './Appearance'
import HeaderWrapper from 'components/HeaderWrapper'

const EditCollection = () => {
  const {
    formik,
    collection,
    // fileUploadType, handleChangeFile, onDeleteImg, handleDeleteCollection
  } = useEditCollection()

  let dotState = ''
  let badgeLabel = ''

  if (collection.status === 'Active') {
    dotState = 'positive'
    badgeLabel = 'Live'
  } else if (collection.status === 'Draft') {
    dotState = 'warning'
    badgeLabel = 'Draft'
  }

  const [activeTab, setActiveTab] = useState(0)
  return (
    <>
      <FormikProvider value={formik}>
        <HeaderWrapper>
          <StyleHeaderGroup>
            <TabList>
              <Tab onClick={() => setActiveTab(0)}>General</Tab>
              <Tab onClick={() => setActiveTab(1)}>Appearance</Tab>
              <Tab onClick={() => setActiveTab(2)}>Contract</Tab>
            </TabList>
            <StyledStatusWrapper>
              <StyledBadgeWrapper>
                <Badge draft='warning' label={badgeLabel} dot={dotState} />
              </StyledBadgeWrapper>
              <StyledMenuDots />
            </StyledStatusWrapper>
          </StyleHeaderGroup>
        </HeaderWrapper>
        <StyledInnerWrapper>
          <StyledTabContext activeTabId={activeTab} className='tab_pannels_container'>
            <TabPanels>
              <TabPanel>
                <GeneralForm />
              </TabPanel>
              <TabPanel>
                <Appearance />
              </TabPanel>
              <TabPanel>Contract</TabPanel>
            </TabPanels>
          </StyledTabContext>
        </StyledInnerWrapper>

        {/* <StyledHeaderDiv>
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
            <Button onClick={() => formik.handleSubmit()}>Update</Button>
            <StyledSearchWrapper>
                  <Search placeholder='Search' wrapperClassName='l3-storybook-search_size' />
                </StyledSearchWrapper>
          </StyledHeaderSection>
        </StyledHeaderDiv>
        <StyledFormSection className='section_body_container'>
          <CollectionForm
            formik={formik}
            fileUploadType={fileUploadType}
            handleChangeFile={handleChangeFile}
            onDeleteImg={onDeleteImg}
          />
        </StyledFormSection>

        <div>
          <Button onClick={handleDeleteCollection} kind={Button.kinds.SECONDARY}>
            Delete Collection
          </Button>
        </div> */}

        {/* TODO: change after design */}
        {/* <ContractWizard /> */}
      </FormikProvider>
    </>
  )
}

export default EditCollection

export const StyledHeaderDiv = styled(FLexSpaceBetween)`
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
