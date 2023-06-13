import { useState } from 'react'
import { FormikProvider } from 'formik'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { useEditGame } from 'pages/Game/EditGame/useEditGame'

import HeaderWrapper from 'components/HeaderWrapper'

import Badge from '@l3-lib/ui-core/dist/Badge'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
import Typography from '@l3-lib/ui-core/dist/Typography'

import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import Appearance from './Appearance/Appearance'
import GeneralForm from './GeneralForm/GeneralForm'

import {
  StyledHeaderGroup,
  StyledCenteredWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import Spotlight from 'components/Spotlight/Spotlight'

const EditGame = () => {
  const { formik, gameById, handleDeleteGame } = useEditGame()

  const { t } = useTranslation()

  let dotState = ''
  let badgeLabel = ''

  if (gameById.status === 'Active') {
    dotState = 'positive'
    badgeLabel = 'Live'
  } else if (gameById.status === 'Draft') {
    dotState = 'warning'
    badgeLabel = 'Draft'
  }

  const [activeTab, setActiveTab] = useState(0)

  return (
    <StyledCenteredWrapper>
      <FormikProvider value={formik}>
        <HeaderWrapper>
          <StyledHeaderGroup>
            <TabList>
              <Tab onClick={() => setActiveTab(0)}>General</Tab>
              <Tab onClick={() => setActiveTab(1)}>Appearance</Tab>
            </TabList>
            <StyledStatusWrapper>
              <StyledBadgeWrapper>
                <Badge draft='warning' label={badgeLabel} dot={dotState} />
              </StyledBadgeWrapper>
              <MenuButton component={MenuDots}>
                <StyledButtonsWrapper>
                  <StyledClickableDiv onClick={handleDeleteGame}>
                    <Typography
                      value={t('Delete Game')}
                      type={Typography.types.LABEL}
                      size={Typography.sizes.md}
                      customColor={'rgba(250,250,250, 0.8)'}
                    />
                  </StyledClickableDiv>
                </StyledButtonsWrapper>
              </MenuButton>
            </StyledStatusWrapper>
          </StyledHeaderGroup>
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
                value={gameById.status}
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
            <GameForm
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
      {/* <Spotlight /> */}
    </StyledCenteredWrapper>
  )
}

export default EditGame

export const StyledTabContext = styled(TabsContext)`
  width: 100%;
`

export const StyledStatusWrapper = styled.div`
  display: flex;
  align-items: center;r 
`
export const StyledMenuDots = styled(MenuDots)`
  height: 25px;
`
const StyledBadgeWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
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
