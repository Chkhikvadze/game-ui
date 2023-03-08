import React, { useState } from 'react'
import styled from 'styled-components'
import { useProjects } from './useProjects'
import CreateProjectModal from 'modals/CreateProjectModal'
import { CustomTable } from 'oldComponents/atoms/CustomTable'
import columnConfig from './columnConfig'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import Button from '@l3-lib/ui-core/dist/Button'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

import ProjectCard from './ProjectCard'

import { useCollectionsImages } from 'services/useCollectionService'
import { usePlayersImages } from 'services/usePlayerService'
import { useNavigate } from 'react-router-dom'

// import videoSample from './videoSamples/videoSample.mp4'
import videoSample2 from './videoSamples/videoSample2.mp4'

const Projects = () => {
  const { openCreateProjectModal, data, handleDeleteProject } = useProjects()
  const config = columnConfig({ handleDelete: handleDeleteProject })

  const navigate = useNavigate()

  const [projectId, setProjectId] = useState('')

  const [activeTab, setActiveTab] = useState(0)

  const handleCardClick = (id: string) => {
    setProjectId(id)
  }

  const { data: collections, refetch: refetchCollection } = useCollectionsImages({
    project_id: projectId,
    limit: 4,
  })
  const { data: players, refetch: refetchPlayers } = usePlayersImages({
    project_id: projectId,
    limit: 4,
  })

  // const playerImages: any = [
  //   'https://www.reuters.com/resizer/NRuMc4-qhlqkYuAlIBGuwHdOrTc=/505x631/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg',
  //   'https://images.barrons.com/im-394091?width=1280&size=1',
  //   'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31',
  //   'https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280',
  // ]
  // const collectionImages = collectionData?.items?.map((item: any) => item.featured_image)

  const renderProjectCard = (item: any) => (
    <ProjectCard
      key={item.id}
      onImageClick={() => navigate(`/game/${item.id}/collections`)}
      onButtonClick={async () => {
        handleCardClick(item.id)
        await refetchCollection()
        refetchPlayers
      }}
      itemInfo={{
        title: item.name,
        description: item.description,
        category: item.category,
        logo: item.logo_image,
        image: item.background_image,
        created: item.created_on,
      }}
      defaultLogo={
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
      }
      defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
      collection={{ image: collections?.images, length: collections?.total }}
      players={{ image: players?.images, length: players?.total }}
      video={videoSample2}
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
        <Button size={Button.sizes.Small} onClick={openCreateProjectModal}>
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
                .map((item: any) => renderProjectCard(item))}

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
                .map((item: any) => renderProjectCard(item))}

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
                .map((item: any) => renderProjectCard(item))}
            </StylesCardsWrapper>
          </TabPanel>

          <TabPanel>
            {renderTabText('Draft', 'Game which are successfully deployed')}

            <StylesCardsWrapper>
              {data?.items
                ?.filter((item: any) => item.status === 'Draft')
                .map((item: any) => renderProjectCard(item))}
            </StylesCardsWrapper>
          </TabPanel>
        </TabPanels>
      </TabsContext>

      {/* <StyledTextWrapper>
        <Heading
          type={Heading.types.h1}
          value='Active'
          size='medium'
          brandFont
          customColor={'#fff'}
        />
        <Typography
          value='Game which are successfully deployed '
          type={Typography.types.P}
          size={Typography.sizes.lg}
          customColor={'rgba(255, 255, 255, 0.6)'}
        />
      </StyledTextWrapper> */}

      {/* <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '40px' }}>
        {data?.items?.map((item: any) => (
          <ProjectCard
            key={item.id}
            onImageClick={() => navigate(`/game/${item.id}/collections`)}
            onButtonClick={() => {
              handleCardClick(item.id)
              refetchCollection()
            }}
            title={item.name}
            description={item.description}
            category={item.category}
            logo={item.logo_image}
            defaultLogo={
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
            }
            image={item.background_image}
            defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
            created={item.created_on}
            collection={{ image: collectionImages, length: collectionData?.items?.length }}
            players={{ image: playerImages, length: 5000 }}
            video={videoSample}
          />
        ))}
      </div> */}
      <CustomTable
        templateColumns='1fr repeat(1, 1fr)  repeat(1,1fr)'
        size='14px'
        displayHeader
        columnsConfig={config}
        data={data?.items || []}
        alignItems='end'
        rowDifferentColors
      />
      <CreateProjectModal />
    </StyledRoot>
  )
}

export default Projects

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
const StyledRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  gap: 24px;
`
const StyledButtonWrapper = styled.div`
  position: absolute;
  align-self: flex-end;
  margin-top: 5px;

  @media only screen and (max-width: 1200px) {
    position: static;
    align-self: auto;
    margin-top: auto;
  }
`

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  margin-top: 24px;
`
const StylesCardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 70px;

  align-items: center;
`
