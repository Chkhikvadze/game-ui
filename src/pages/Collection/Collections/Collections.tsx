import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

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

import GameCard from 'pages/Game/Games/Card/GameCard'
import CollectionDetail from 'pages/Game/Games/Card/CollectionDetail'

import CollectionFooter from 'pages/Game/Games/Card/CardFooter/CollectionFooter'

import { CollectionPagesEmptyScreen } from './collectionEmptyScreen/CollectionPagesEmptyScreen'
import Eth from 'assets/icons/eth.svg'

import { ASSET_IMAGES, OWNER_IMAGES } from './CollectionsUtils'
import {
  StyleHeaderGroup,
  StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import { findVideo } from 'helpers/detectMedia'
import HeaderWrapper from 'components/HeaderWrapper'
import { useModal } from 'hooks'
import { useContractByCollectionIdService } from 'services'
import ContractChain from 'components/ContractChains/ContractChain'

const default_image =
  'https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'

const default_logo =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'

const Collections = () => {
  const params = useParams()
  const game_id: string = params?.gameId!
  const { openModal } = useModal()

  const onCreateCollection = () => {
    openModal({ name: 'create-collection-modal', data: { game_id } })
  }

  const navigate = useNavigate()

  const { data } = useCollection({ game_id })

  const [activeTab, setActiveTab] = useState(0)

  const CollectionCard = (item: any) => {
    const { main_media, medias, id: collectionId } = item

    const media_video = findVideo(medias)

    const default_collection_image = main_media ? main_media : default_image

    const item_info = {
      title: item.name,
      description: item.description,
      subTitle: '101 Owners',
      logo: item.logo_image,
      image: item.cover_image,
      created: item.created_on,
    }

    const { data: collectionContract } = useContractByCollectionIdService({
      id: collectionId,
    })

    const price = collectionContract?.config?.player_mint_fee
    const contractChain = collectionContract?.blockchain

    return (
      <GameCard
        key={item.id}
        size={'medium'}
        onImageClick={() => navigate(`/collection/${item.id}/general`)}
        // onButtonClick={async () => {
        //   handleCardClick(item.id)
        //   await refetchCollection()
        //   refetchPlayers
        // }}
        itemInfo={item_info}
        defaultLogo={default_logo}
        defaultImage={default_collection_image}
        details={
          <CollectionDetail
            price={{ minPrice: price || 0, volume: 123000, listed: 3 }}
            owners={{ ownerImages: OWNER_IMAGES, ownerCount: 101 }}
            assets={{ assetImages: ASSET_IMAGES, assetCount: 101 }}
          />
        }
        cardFooter={<CollectionFooter title={item.name} subTitle={'101 Owners'} />}
        topLeftIcon={contractChain && <ContractChain chainName={contractChain} />}
        topRightIcon={
          price && (
            <StyledTopRightIcon>
              <Typography
                value={price}
                type={Typography.types.LABEL}
                size={Typography.sizes.LARGE}
              />
            </StyledTopRightIcon>
          )
        }
        // minPrice={0.96}
        video={media_video ? media_video['url'] : ''}
      />
    )
  }

  const allCollections = data?.items
  const activeCollections = data?.items?.filter((item: any) => item.status === 'Active')
  const draftCollections = data?.items?.filter((item: any) => item.status === 'Draft')

  const allCollectionsCount = allCollections?.length
  const activeCollectionsCount = activeCollections?.length
  const draftCollectionsCount = draftCollections?.length

  return (
    <>
      <HeaderWrapper>
        <StyleHeaderGroup>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>All</Tab>
            <Tab onClick={() => setActiveTab(1)}>Active</Tab>
            <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
          </TabList>
          <Button size={Button.sizes.MEDIUM} onClick={onCreateCollection} leftIcon={Add}>
            <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>
        </StyleHeaderGroup>
      </HeaderWrapper>

      <StyledInnerWrapper>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              {activeCollectionsCount > 0 && (
                <>
                  <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper className='wrapper_card'>
                    {activeCollections?.slice(0, 4).map((item: any) => {
                      return <CollectionCard {...item} key={item.id} />
                    })}
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
                    {draftCollections?.slice(0, 4).map((item: any) => {
                      return <CollectionCard {...item} key={item.id} />
                    })}
                    {draftCollectionsCount > 4 && (
                      <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                        See all
                      </Button>
                    )}
                  </StyledContainerWrapper>
                </>
              )}
              {allCollectionsCount === 0 && <CollectionPagesEmptyScreen />}
            </TabPanel>

            <TabPanel>
              {activeCollectionsCount > 0 && (
                <>
                  <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper className='wrapper_card'>
                    {activeCollections?.map((item: any) => {
                      return <CollectionCard {...item} key={item.id} />
                    })}
                  </StyledContainerWrapper>
                </>
              )}
              {activeCollectionsCount === 0 && <CollectionPagesEmptyScreen />}
            </TabPanel>

            <TabPanel>
              {draftCollectionsCount > 0 && (
                <>
                  <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper className='wrapper_card'>
                    {draftCollections?.map((item: any) => {
                      return <CollectionCard {...item} key={item.id} />
                    })}
                  </StyledContainerWrapper>
                </>
              )}

              {draftCollectionsCount === 0 && <CollectionPagesEmptyScreen />}
            </TabPanel>
          </TabPanels>
        </TabsContext>
      </StyledInnerWrapper>
      {/* <CreateCollectionModal /> */}
    </>
  )
}

export default Collections

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
