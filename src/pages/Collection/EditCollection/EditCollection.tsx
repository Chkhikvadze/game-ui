import { useState } from 'react'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import { useEditCollection } from './useEditCollection'

import GeneralForm from './GeneralForm'
import Appearance from './Appearance'

import HeaderWrapper from 'components/HeaderWrapper'

import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import Badge from '@l3-lib/ui-core/dist/Badge'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import { StyledMenuDots, StyledStatusWrapper, StyledTabContext } from 'pages/Game/EditGame/EditGame'

import { FLexSpaceBetween, StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

import CollectionContract from './CollectionContract'
import ToastBanner from 'components/ToastBanner/ToastBanner'

const EditCollection = () => {
  const { t } = useTranslation()
  const {
    formik,
    collection,
    handleDeleteCollection,
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

  const dropDownData = {
    header_title: 'Missing values',
    data: [
      { value: 'Missing name', info: 'row 5' },
      { value: 'Missing media', info: 'row 10' },
      { value: 'Missing collection', info: 'row 15' },
    ],
  }

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
              <MenuButton component={MenuDots}>
                <StyledButtonsWrapper>
                  <StyledClickableDiv onClick={handleDeleteCollection}>
                    <Typography
                      value={t('Delete Collection')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                      customColor={'rgba(250,250,250, 0.8)'}
                    />
                  </StyledClickableDiv>
                </StyledButtonsWrapper>
              </MenuButton>
            </StyledStatusWrapper>
          </StyleHeaderGroup>
        </HeaderWrapper>
        <StyledInnerWrapper>
          <StyledActionsSectionEdit>
            <ToastBanner
              type='negative'
              menuType='dropDown'
              title='Conflicts'
              dropDownData={dropDownData}
            />
            <ToastBanner
              menuType='dropDown'
              type='warning'
              title='Missing elements'
              dropDownData={dropDownData}
            />
            <ToastBanner
              type='normal'
              title='Metadata Update'
              menuType='insideContent'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
              buttonOption={{
                button_title: 'Update',
                button_func: () => console.log('update items'),
              }}
            />
          </StyledActionsSectionEdit>

          <StyledTabContext activeTabId={activeTab} className='tab_pannels_container'>
            <TabPanels>
              <TabPanel>
                <GeneralForm />
              </TabPanel>
              <TabPanel>
                <Appearance />
              </TabPanel>
              <TabPanel>
                <CollectionContract />
              </TabPanel>
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
  margin-right: 5px;
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
const StyledButtonsWrapper = styled.div`
  margin-top: 15px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;

  background: rgba(0, 0, 0, 0.2);

  padding: 16px;

  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);

  border-radius: 6px;
`
const StyledClickableDiv = styled.div`
  cursor: pointer;
`

const StyledActionsSectionEdit = styled.div`
  // margin-bottom: 18px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
`
