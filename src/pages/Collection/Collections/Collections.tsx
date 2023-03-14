import { useState } from 'react'
import styled from 'styled-components'

import { useNavigate } from 'react-router-dom'

import CreateCollectionModal from 'modals/CreateCollectionModal'

import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import { useCollection } from './useCollection'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'

import { StyledButtonWrapper, StyledRoot, StyledCardWrapper } from 'pages/Project/Projects/Projects'
import ProjectCard from 'pages/Project/Projects/Card/ProjectCard'
import TabHeader from './TabHeader'
import CollectionDetail from 'pages/Project/Projects/Card/CollectionDetail'

import videoSample2 from '../../Project/Projects/videoSamples/videoSample2.mp4'

const Collections = () => {
  const navigate = useNavigate()

  const { data } = useCollection()

  const [activeTab, setActiveTab] = useState(0)

  const ownerImages: any = [
    'https://www.reuters.com/resizer/NRuMc4-qhlqkYuAlIBGuwHdOrTc=/505x631/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg',
    'https://images.barrons.com/im-394091?width=1280&size=1',
    'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31',
    'https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280',
    'https://www.reuters.com/resizer/NRuMc4-qhlqkYuAlIBGuwHdOrTc=/505x631/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg',
    'https://images.barrons.com/im-394091?width=1280&size=1',
    'https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31',
    'https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280',
  ]

  const assetImages: any = [
    'https://cdn.vox-cdn.com/thumbor/aTS1AK_qBkTeDb-y1WyYG38YGaU=/0x0:3840x2160/1200x628/filters:focal(1920x1080:1921x1081)/cdn.vox-cdn.com/uploads/chorus_asset/file/22418611/Lego_Star_Wars.jpg',
    'https://cdn.vox-cdn.com/thumbor/aTS1AK_qBkTeDb-y1WyYG38YGaU=/0x0:3840x2160/1200x628/filters:focal(1920x1080:1921x1081)/cdn.vox-cdn.com/uploads/chorus_asset/file/22418611/Lego_Star_Wars.jpg',
    'https://cdn.vox-cdn.com/thumbor/aTS1AK_qBkTeDb-y1WyYG38YGaU=/0x0:3840x2160/1200x628/filters:focal(1920x1080:1921x1081)/cdn.vox-cdn.com/uploads/chorus_asset/file/22418611/Lego_Star_Wars.jpg',
  ]

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
        subTitle: '101 Owners',
        logo: item.logo_image,
        image: item.cover_image,
        created: item.created_on,
      }}
      defaultLogo={
        'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
      }
      defaultImage='https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'
      details={
        <CollectionDetail
          price={{ minPrice: 0.96, volume: 123000, listed: 3 }}
          owners={{ ownerImages: ownerImages, ownerCount: 101 }}
          assets={{ assetImages: assetImages, assetCount: 101 }}
        />
      }
      blockchain={'ethereum'}
      minPrice={0.96}
      video={videoSample2}
    />
  )

  const activeCollections = data?.items?.filter((item: any) => item.status === 'Active')
  const draftCollections = data?.items?.filter((item: any) => item.status === 'Draft')

  const activeCollectionsCount = activeCollections?.length
  const draftCollectionsCount = draftCollections?.length

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
            {activeCollectionsCount > 0 && (
              <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
            )}
            <StyledCardWrapper>
              {activeCollections?.slice(0, 4).map((item: any) => renderCollectionCard(item))}

              {activeCollectionsCount > 4 && (
                <div>
                  <Button onClick={() => setActiveTab(1)} kind='tertiary'>
                    See all
                  </Button>
                </div>
              )}
            </StyledCardWrapper>

            {draftCollectionsCount > 0 && (
              <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
            )}
            <StyledCardWrapper>
              {draftCollections?.slice(0, 4).map((item: any) => renderCollectionCard(item))}

              {draftCollectionsCount > 4 && (
                <div>
                  <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                    See all
                  </Button>
                </div>
              )}
            </StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
            <StyledCardWrapper>
              {activeCollections?.map((item: any) => renderCollectionCard(item))}
            </StyledCardWrapper>
          </TabPanel>

          <TabPanel>
            <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
            <StyledCardWrapper>
              {draftCollections?.map((item: any) => renderCollectionCard(item))}
            </StyledCardWrapper>
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
