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
import { StyledTypography } from 'pages/ApiKeys/ApiKeysStyle'

import CollectionFooter from 'pages/Game/Games/Card/CardFooter/CollectionFooter'

import { CollectionPagesEmptyScreen } from './collectionEmptyScreen/CollectionPagesEmptyScreen'
import Eth from 'assets/icons/eth.svg'

import { ASSET_IMAGES, OWNER_IMAGES } from './CollectionsUtils'
import {
  StyledHeaderGroup,
  StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import { findVideo } from 'helpers/detectMedia'
import HeaderWrapper from 'components/HeaderWrapper'
import { useModal } from 'hooks'
import Accessories from '../../../assets/images/collectionImage/accesories.webp'
import Animals from '../../../assets/images/collectionImage/animals.webp'
import Backpacks from '../../../assets/images/collectionImage/backpacks.webp'
import Cards from '../../../assets/images/collectionImage/cards.webp'
import Castles from '../../../assets/images/collectionImage/castles.webp'
import Clothes from '../../../assets/images/collectionImage/clothes.webp'
import Eastereggs from '../../../assets/images/collectionImage/eastereggs.webp'
import Glasses from '../../../assets/images/collectionImage/glasses.webp'
import Gods from '../../../assets/images/collectionImage/gods.webp'
import Helmets from '../../../assets/images/collectionImage/helmets.webp'
import Houses from '../../../assets/images/collectionImage/houses .webp'
import Jewellery from '../../../assets/images/collectionImage/jewellery.webp'
import Lands from '../../../assets/images/collectionImage/lands.webp'
import Motors from '../../../assets/images/collectionImage/motors.webp'
import Nitros from '../../../assets/images/collectionImage/nitros.webp'
import Poison from '../../../assets/images/collectionImage/poison.webp'
import Action from '../../../assets/images/action.webp'
import Reptitels from '../../../assets/images/collectionImage/reptitels.webp'
import Shields from '../../../assets/images/collectionImage/shields.webp'
import Ships from '../../../assets/images/collectionImage/ships.webp'
import Skins from '../../../assets/images/collectionImage/skins.webp'
import SteerinfWheels from '../../../assets/images/collectionImage/steerinfWheels.webp'
import Trophys from '../../../assets/images/collectionImage/trophys.webp'
import Tyres from '../../../assets/images/collectionImage/tyres.webp'
import Vehicles from '../../../assets/images/collectionImage/vehicles.webp'
import Warriors from '../../../assets/images/collectionImage/warriors.webp'
import Wepons from '../../../assets/images/collectionImage/wepons.webp'
import Worlds from '../../..//assets/images/collectionImage/worlds.webp'

const default_image = Action

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

  const renderCollectionCard = (item: any) => {
    const { main_media, medias, categories } = item
    console.log('items', categories)

    const media_video = findVideo(medias)

    const item_info = {
      title: item.name,
      description: item.description,
      subTitle: '101 Owners',
      logo: item.logo_image,
      image: item.cover_image,
      created: item.created_on,
    }

    const categoryValues = item.categories.map((category: any) => category.value)

    const categoryToDefaultImageMap: { [key: string]: string } = {
      Shields: Shields,
      Helmets: Helmets,
      // Sea:,
      // Jungle:,
      // Birds:,
      // Reptile:,
      // Mammals:,
      Jewelry: Jewellery,
      // Tattos:,
      Glasses: Glasses,
      // Coins:,
      Cards: Cards,
      // Cars:,
      // Villages:,
      Worlds: Worlds,
      // Gems:,
      // Boards:,
      // 'Front wing':,
      Wheels: SteerinfWheels,
      Tyres: Tyres,
      Motors: Motors,
      Nitros: Nitros,
      //  'Bulletproof vest':,
      Skins: Skins,
      Backpacks: Backpacks,
      Weapons: Wepons,
      'Easter eggs': Eastereggs,
      Poisons: Poison,
      Reptile: Reptitels,
      Vehicles: Vehicles,
      Houses: Houses,
      Animals: Animals,
      Ships: Ships,
      Clothes: Clothes,
      Accessories: Accessories,
      Trophies: Trophys,
      // Balls:,
      Castles: Castles,
      Lands: Lands,
      Warriors: Warriors,
      // 'Military vehicles':,
      Goods: Gods,
    }
    const default_collection_image =
      main_media || categoryToDefaultImageMap[categoryValues[0]] || default_image

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
            price={{ minPrice: 0.96, volume: 123000, listed: 3 }}
            owners={{ ownerImages: OWNER_IMAGES, ownerCount: 101 }}
            assets={{ assetImages: ASSET_IMAGES, assetCount: 101 }}
          />
        }
        cardFooter={<CollectionFooter title={item.name} subTitle={'101 Owners'} />}
        topLeftIcon={
          <StyledIconWrapper>
            <img src={Eth} alt='' />
          </StyledIconWrapper>
        }
        topRightIcon={
          <StyledTopRightIcon>
            <Typography
              value={'0.96'}
              type={Typography.types.LABEL}
              size={Typography.sizes.LARGE}
            />
          </StyledTopRightIcon>
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
        <StyledHeaderGroup>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>All</Tab>
            <Tab onClick={() => setActiveTab(1)}>Active</Tab>
            <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
          </TabList>
          <Button size={Button.sizes.MEDIUM} onClick={onCreateCollection} leftIcon={Add}>
            <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>
        </StyledHeaderGroup>
      </HeaderWrapper>

      <StyledInnerWrapper>
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
              {allCollectionsCount === 0 && <CollectionPagesEmptyScreen />}
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
              {activeCollectionsCount === 0 && <CollectionPagesEmptyScreen />}
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
  min-width: 32px;
  min-height: 32px;

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
