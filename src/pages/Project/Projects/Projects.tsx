import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { useCollectionsImages } from 'services/useCollectionService'
import { usePlayersImages } from 'services/usePlayerService'

import { useProjects } from './useProjects'
import CreateProjectModal from 'modals/CreateProjectModal'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import { GamePageEmptyScreen } from 'components/GamePagesEmptyScreen/GamePagesEmptyScreen'

import Button from '@l3-lib/ui-core/dist/Button'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Add from '@l3-lib/ui-core/dist/icons/Add'
import Typography from '@l3-lib/ui-core/dist/Typography'

import ProjectCard from './Card/ProjectCard'
import GameDetail from './Card/GameDetail'
import GameFooter from './Card/CardFooter/GameFooter'

import videoSample2 from './videoSamples/videoSample2.mp4'
import TabHeader from 'pages/Collection/Collections/TabHeader'

import { FLexSpaceBetween, StyledContainerWrapper } from 'styles/globalStyle.css'
import './project.style.css'

const Projects = () => {
  const { openCreateProjectModal, data } = useProjects()

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
      onImageClick={() => navigate(`/game/${item.id}/general`)}
      onButtonClick={async () => {
        handleCardClick(item.id)
        await refetchCollection()
        refetchPlayers
      }}
      itemInfo={{
        title: item.name,
        description: item.description,
        subTitle: item.category,
        logo: item.logo_image,
        image: item.background_image,
        created: item.created_on,
      }}
      defaultLogo={
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
      }
      defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
      video={videoSample2}
      details={
        <GameDetail
          collections={{
            collectionImages: collections?.images,
            collectionCount: collections?.total,
          }}
          players={{ playerImages: players?.images, playerCount: players?.total }}
        />
      }
      cardFooter={
        <GameFooter
          logo={item.logo_image}
          defaultLogo={
            'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
          }
          title={item.name}
          subTitle={item.category}
        />
      }
    />
  )

  const allProjects = data?.items
  const activeProjects = data?.items?.filter((item: any) => item.status === 'Active')
  const draftProjects = data?.items?.filter((item: any) => item.status === 'Draft')

  const allProjectsCount = allProjects?.length
  const activeProjectsCount = activeProjects?.length
  const draftProjectsCount = draftProjects?.length

  return (
    <>
      <FLexSpaceBetween>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>
        <Button size={Button.sizes.MEDIUM} onClick={openCreateProjectModal} leftIcon={Add}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </FLexSpaceBetween>
      <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
        <TabPanels>
          <TabPanel>
            {activeProjectsCount > 0 && (
              <>
                <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {activeProjects?.slice(0, 4).map((item: any) => renderProjectCard(item))}
                  {activeProjectsCount > 4 && (
                    <Button onClick={() => setActiveTab(1)} kind='tertiary'>
                      See all
                    </Button>
                  )}
                </StyledContainerWrapper>
              </>
            )}
            {draftProjectsCount > 0 && (
              <>
                <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {draftProjects?.slice(0, 4).map((item: any) => renderProjectCard(item))}
                  {draftProjectsCount > 4 && (
                    <div>
                      <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                        See all
                      </Button>
                    </div>
                  )}
                </StyledContainerWrapper>
              </>
            )}

            {allProjectsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>

          <TabPanel>
            {activeProjectsCount > 0 && (
              <>
                <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper>
                  {activeProjects?.map((item: any) => renderProjectCard(item))}
                </StyledContainerWrapper>
              </>
            )}

            {activeProjectsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>

          <TabPanel>
            {draftProjectsCount > 0 && (
              <>
                <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper>
                  {draftProjects?.map((item: any) => renderProjectCard(item))}
                </StyledContainerWrapper>
              </>
            )}

            {draftProjectsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>
        </TabPanels>
      </TabsContext>
      <CreateProjectModal />
    </>
  )
}

export default Projects

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
export const StyledRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  align-self: flex-end;
  margin-top: 5px;

  @media only screen and (max-width: 1200px) {
    position: static;
    align-self: auto;
    margin-top: auto;
  }
`

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const StyledCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 40px;
  margin-bottom: 70px;
  align-items: center;
`
