import { useState } from 'react'
import { useEditProject } from 'pages/Project/EditProject/useEditProject'

import { FormikProvider } from 'formik'

import Badge from '@l3-lib/ui-core/dist/Badge'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Appearance from './Appearance/Appearance'
import styled from 'styled-components'

import GeneralForm from './GeneralForm/GeneralForm'
import { FLexSpaceBetween, StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import HeaderWrapper from 'components/HeaderWrapper'

const EditProject = () => {
  const { formik, projectById } = useEditProject()

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
    <>
      <FormikProvider value={formik}>
        <HeaderWrapper>
          <StyleHeaderGroup>
            <TabList>
              <Tab onClick={() => setActiveTab(0)}>General</Tab>
              <Tab onClick={() => setActiveTab(1)}>Appearance</Tab>
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
            </TabPanels>
          </StyledTabContext>
        </StyledInnerWrapper>
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
    </>
  )
}

export default EditProject

export const StyledTabContext = styled(TabsContext)`
  width: 100%;
`

export const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;
`
export const StyledMenuDots = styled(MenuDots)`
  height: 25px;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`
