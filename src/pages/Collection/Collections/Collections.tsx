import React, { useState } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import CreateCollectionModal from 'modals/CreateCollectionModal'

import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import { useCollection } from './useCollection'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import {
  StyledButtonWrapper,
  StyledRoot,
  StyledTextWrapper,
  StylesCardsWrapper,
} from 'pages/Project/Projects/Projects'
import ProjectCard from 'pages/Project/Projects/ProjectCard'

const Collections = () => {
  const navigate = useNavigate()

  const { data } = useCollection()

  const [activeTab, setActiveTab] = useState(0)

  const renderCollectionCard = (item: any) => (
    <ProjectCard
      key={item.id}
      onImageClick={() => navigate(`/collection/${item.id}/general`)}
      // onButtonClick={async () => {
      //   handleCardClick(item.id)
      //   await refetchCollection()
      //   refetchPlayers
      // }}
      itemInfo={{
        title: item.name,
        description: item.description,
        category: item.category,
        logo: item.logo_image,
        image: item.cover_image,
        created: item.created_on,
      }}
      defaultLogo={
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
      }
      defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
    />
  )

  const renderTabText = (heading: string, paragraph: string) => (
    <StyledTextWrapper>
      <Heading
        type={Heading.types.h1}
        value={heading}
        size='medium'
        brandFont
        customColor={'#fff'}
      />
      <Typography
        value={paragraph}
        type={Typography.types.P}
        size={Typography.sizes.lg}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
    </StyledTextWrapper>
  )

  const activeLength = data?.items?.filter((item: any) => item.status === 'Active').length
  const draftLength = data?.items?.filter((item: any) => item.status === 'Draft').length

  return (
    <StyledRoot>
      <StyledButtonWrapper>
        <Button size={Button.sizes.Small} onClick={() => navigate(`../collection/create`)}>
          <Typography value={'+ Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </StyledButtonWrapper>

      <TabsContext activeTabId={activeTab}>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {activeLength > 0 && renderTabText('Active', 'Game which are successfully deployed')}
            <StylesCardsWrapper>
              {data?.items
                ?.filter((item: any) => item.status === 'Active')
                .slice(0, 4)
                .map((item: any) => renderCollectionCard(item))}

              {activeLength > 4 && (
                <div>
                  <Button onClick={() => setActiveTab(1)} kind='tertiary'>
                    See all
                  </Button>
                </div>
              )}
            </StylesCardsWrapper>

            {draftLength > 0 && renderTabText('Draft', 'Game which are successfully deployed')}
            <StylesCardsWrapper>
              {data?.items
                ?.filter((item: any) => item.status === 'Draft')
                .slice(0, 4)
                .map((item: any) => renderCollectionCard(item))}

              {draftLength > 4 && (
                <div>
                  <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                    See all
                  </Button>
                </div>
              )}
            </StylesCardsWrapper>
          </TabPanel>

          <TabPanel>
            {renderTabText('Active', 'Game which are successfully deployed')}

            <StylesCardsWrapper>
              {data?.items
                ?.filter((item: any) => item.status === 'Active')
                .map((item: any) => renderCollectionCard(item))}
            </StylesCardsWrapper>
          </TabPanel>

          <TabPanel>
            {renderTabText('Draft', 'Game which are successfully deployed')}

            <StylesCardsWrapper>
              {data?.items
                ?.filter((item: any) => item.status === 'Draft')
                .map((item: any) => renderCollectionCard(item))}
            </StylesCardsWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateCollectionModal />
    </StyledRoot>
  )
}

export default Collections

// const StyledContainer = styled.div`
//   display: grid;
//   align-items: center;
//   justify-items: center;
//   height: 100%;
// `

export const StyledButton = styled.button`
  border: 1px solid #19b3ff;
  padding: 12px;
  display: inline-block;
  border-radius: 4px;
  margin-top: 20px;
  background-color: white;

  &:hover {
    background-color: #19b3ff;

    ${StyledTypography} {
      color: #fff;
    }
  }
`
