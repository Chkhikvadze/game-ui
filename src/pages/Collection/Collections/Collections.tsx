import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import CreateCollectionModal from 'modals/CreateCollectionModal'

import { useCollection } from './useCollection'

import Button from '@l3-lib/ui-core/dist/Button'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tab from '@l3-lib/ui-core/dist/Tab'
import TabList from '@l3-lib/ui-core/dist/TabList'
import TabPanel from '@l3-lib/ui-core/dist/TabPanel'
import TabPanels from '@l3-lib/ui-core/dist/TabPanels'
import TabsContext from '@l3-lib/ui-core/dist/TabsContext'
import Add from '@l3-lib/ui-core/dist/icons/Add'

import TabHeader from './TabHeader'

import ProjectCard from 'pages/Project/Projects/Card/ProjectCard'
import CollectionDetail from 'pages/Project/Projects/Card/CollectionDetail'
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import CollectionFooter from 'pages/Project/Projects/Card/CardFooter/CollectionFooter'

import { GamePageEmptyScreen } from 'components/GamePagesEmptyScreen/GamePagesEmptyScreen'
import Eth from 'assets/icons/eth.svg'
import videoSample2 from '../../Project/Projects/videoSamples/videoSample2.mp4'

import { ASSET_IMAGES, OWNER_IMAGES } from './CollectionsUtils'
import { FLexSpaceBetween, StyledContainerWrapper } from 'styles/globalStyle.css'

const Collections = () => {
  const navigate = useNavigate()

  const { data, openCreateCollectionModal } = useCollection()

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
          owners={{ ownerImages: OWNER_IMAGES, ownerCount: 101 }}
          assets={{ assetImages: ASSET_IMAGES, assetCount: 101 }}
        />
      }
      cardFooter={<CollectionFooter title={item.name} subTitle={'101 Owners'} />}
      topLeftIcon={
        <StyledIconWrapper>
          {/* <IconButton
            icon={() => <Etherscan />}
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.TERTIARY}
          /> */}
          <img src={Eth} alt='' />
        </StyledIconWrapper>
      }
      topRightIcon={
        <StyledTopRightIcon>
          <Typography value={'0.96'} type={Typography.types.LABEL} size={Typography.sizes.LARGE} />
        </StyledTopRightIcon>
      }
      // minPrice={0.96}
      video={videoSample2}
    />
  )

  const allCollections = data?.items
  const activeCollections = data?.items?.filter((item: any) => item.status === 'Active')
  const draftCollections = data?.items?.filter((item: any) => item.status === 'Draft')

  const allCollectionsCount = allCollections?.length
  const activeCollectionsCount = activeCollections?.length
  const draftCollectionsCount = draftCollections?.length

  return (
    <>
      <FLexSpaceBetween>
        <TabList>
          <Tab onClick={() => setActiveTab(0)}>All</Tab>
          <Tab onClick={() => setActiveTab(1)}>Active</Tab>
          <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
        </TabList>
        <Button size={Button.sizes.MEDIUM} onClick={openCreateCollectionModal} leftIcon={Add}>
          <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
        </Button>
      </FLexSpaceBetween>

      <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
        <TabPanels>
          <TabPanel>
            {activeCollectionsCount > 0 && (
              <>
                <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {activeCollections?.slice(0, 4).map((item: any) => renderCollectionCard(item))}
                  {activeCollectionsCount > 4 && (
                    <Button onClick={() => setActiveTab(1)} kind='tertiary'>
                      See all
                    </Button>
                  )}
                </StyledContainerWrapper>
              </>
            )}

            {draftCollectionsCount > 0 && (
              <>
                <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {draftCollections?.slice(0, 4).map((item: any) => renderCollectionCard(item))}
                  {draftCollectionsCount > 4 && (
                    <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                      See all
                    </Button>
                  )}
                </StyledContainerWrapper>
              </>
            )}
            {allCollectionsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>

          <TabPanel>
            {activeCollectionsCount > 0 && (
              <>
                <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {activeCollections?.map((item: any) => renderCollectionCard(item))}
                </StyledContainerWrapper>
              </>
            )}
            {activeCollectionsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>

          <TabPanel>
            {draftCollectionsCount > 0 && (
              <>
                <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                <StyledContainerWrapper className='wrapper_card'>
                  {draftCollections?.map((item: any) => renderCollectionCard(item))}
                </StyledContainerWrapper>
              </>
            )}

            {draftCollectionsCount === 0 && <GamePageEmptyScreen />}
          </TabPanel>
        </TabPanels>
      </TabsContext>

      <CreateCollectionModal />
    </>
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
const StyledIconWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledTopRightIcon = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 4px 6px 4px 6px;
  width: 68px;

  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(1px);

  display: flex;
  align-items: center;
  justify-content: center;
`
