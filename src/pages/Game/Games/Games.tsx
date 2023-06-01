import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import { useCollectionsImages } from 'services/useCollectionService'
import { usePlayersImages } from 'services/usePlayerService'

import { useGames } from './useGames'
import CreateGameModal from 'modals/CreateGameModal'
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

import GameCard from './Card/GameCard'
import GameDetail from './Card/GameDetail'
import GameFooter from './Card/CardFooter/GameFooter'

import TabHeader from 'pages/Collection/Collections/TabHeader'

// import GameDefaultLogo from '../../../assets/images/defaultImage.png'

import {
  StyledHeaderGroup,
  StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import { findVideo } from 'helpers/detectMedia'
import HeaderWrapper from 'components/HeaderWrapper'
import Action from '../../../assets/images/action.webp'
import Cards from '../../../assets/images/cards.webp'
import Adventure from '../../../assets/images/adventure.webp'
import Animal from '../../../assets/images/animal.webp'
import Arcade from '../../../assets/images/arcade.webp'
import ArtAndCreativity from '../../../assets/images/artAndCreativity.webp'
import Multiplayer from '../../../assets/images/multiplayer.webp'
import Puzzle from '../../../assets/images/puzzle.webp'
import Racing from '../../../assets/images/racing.webp'
import RPG from '../../../assets/images/rpg.webp'
import SciFi from '../../../assets/images/sci-fi.webp'
import Shooting from '../../../assets/images/shooting.webp'
import Simulation from '../../../assets/images/simulation.webp'
import Skill from '../../../assets/images/skill.webp'
import Sport from '../../../assets/images/sport.webp'
import Strategy from '../../../assets/images/strategy .webp'
import Vehicle from '../../../assets/images/vehicle.webp'
import Zombie from '../../../assets/images/zoombie.webp'

export const game_default_image =
  'https://i.guim.co.uk/img/media/01512e0bd1d78a9a85026844386c02c544c01084/38_0_1200_720/master/1200.jpg?width=1200&quality=85&auto=format&fit=max&s=cef05f7f90efd180648f5aa5ce0d3690'

export const game_default_logo =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'

const Games = () => {
  const { openCreateGameModal, data } = useGames()
  const navigate = useNavigate()
  const [gameId, setGameId] = useState('')

  const [activeTab, setActiveTab] = useState(0)

  const handleCardClick = (id: string) => {
    setGameId(id)
  }

  const { data: collections, refetch: refetchCollection } = useCollectionsImages({
    game_id: gameId,
    limit: 4,
  })

  const { data: players, refetch: refetchPlayers } = usePlayersImages({
    game_id: gameId,
    limit: 4,
  })

  const renderGameCard = (item: any) => {
    const { main_media, medias, category } = item
    const media_video = findVideo(medias)

    const defaultLogo = item.logo_image

    // console.log(item.logo_image)

    // console.log('category', category)

    // Map category to the respective default image
    const categoryToDefaultImageMap: { [key: string]: string } = {
      Action: Action,
      'Board & Card': Cards,
      Adventure: Adventure,
      Animal: Animal,
      Arcade: Arcade,
      'Art & Creativity': ArtAndCreativity,
      Multiplayer: Multiplayer,
      Puzzle: Puzzle,
      Racing: Racing,
      RPG: RPG,
      'Sci-Fi': SciFi,
      Shooting: Shooting,
      Simulation: Simulation,
      'Skill Games': Skill,
      Sports: Sport,
      Strategy: Strategy,
      Vehicle: Vehicle,
      Zombie: Zombie,
    }

    // Set the default image based on category if no custom image is uploaded
    const defaultImage = main_media || categoryToDefaultImageMap[category]

    const cardFooter = (
      <GameFooter
        logo={item.logo_image}
        defaultLogo={defaultLogo}
        title={item.name}
        subTitle={item.category}
      />
    )

    const gameDetails = (
      <GameDetail
        collections={{
          collectionImages: collections?.images,
          collectionCount: collections?.total,
        }}
        players={{ playerImages: players?.images, playerCount: players?.total }}
      />
    )

    const itemInfo = {
      title: item.name,
      description: item.description,
      subTitle: item.category,
      logo: item.logo_image,
      image: item.background_image,
      created: item.created_on,
    }

    return (
      <GameCard
        key={item.id}
        onImageClick={() => navigate(`/game/${item.id}/general`)}
        onButtonClick={async () => {
          handleCardClick(item.id)
          await refetchCollection()
          refetchPlayers()
        }}
        itemInfo={itemInfo}
        defaultLogo={defaultLogo}
        defaultImage={defaultImage}
        video={media_video ? media_video['url'] : ''}
        details={gameDetails}
        cardFooter={cardFooter}
      />
    )
  }

  const allGames = data?.items
  const activeGames = data?.items?.filter((item: any) => item.status === 'Active')
  const draftGames = data?.items?.filter((item: any) => item.status === 'Draft')

  const allGamesCount = allGames?.length
  const activeGamesCount = activeGames?.length
  const draftGamesCount = draftGames?.length

  return (
    <>
      <HeaderWrapper>
        <StyledHeaderGroup>
          <TabList>
            <Tab onClick={() => setActiveTab(0)}>All</Tab>
            <Tab onClick={() => setActiveTab(1)}>Active</Tab>
            <Tab onClick={() => setActiveTab(2)}>Draft</Tab>
          </TabList>
          <Button size={Button.sizes.MEDIUM} onClick={openCreateGameModal} leftIcon={Add}>
            <Typography value={'Create'} type={Typography.types.LABEL} size={Typography.sizes.md} />
          </Button>
        </StyledHeaderGroup>
      </HeaderWrapper>
      <StyledInnerWrapper>
        <TabsContext activeTabId={activeTab} className='tab_pannels_container'>
          <TabPanels>
            <TabPanel>
              {activeGamesCount > 0 && (
                <>
                  <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper className='wrapper_card'>
                    {activeGames?.slice(0, 4).map((item: any) => renderGameCard(item))}
                    {activeGamesCount > 4 && (
                      <Button onClick={() => setActiveTab(1)} kind='tertiary'>
                        See all
                      </Button>
                    )}
                  </StyledContainerWrapper>
                </>
              )}
              {draftGamesCount > 0 && (
                <>
                  <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper className='wrapper_card'>
                    {draftGames?.slice(0, 4).map((item: any) => renderGameCard(item))}
                    {draftGamesCount > 4 && (
                      <div>
                        <Button onClick={() => setActiveTab(2)} kind='tertiary'>
                          See all
                        </Button>
                      </div>
                    )}
                  </StyledContainerWrapper>
                </>
              )}

              {allGamesCount === 0 && <GamePageEmptyScreen />}
            </TabPanel>

            <TabPanel>
              {activeGamesCount > 0 && (
                <>
                  <TabHeader heading='Active' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper>
                    {activeGames?.map((item: any) => renderGameCard(item))}
                  </StyledContainerWrapper>
                </>
              )}

              {activeGamesCount === 0 && <GamePageEmptyScreen />}
            </TabPanel>

            <TabPanel>
              {draftGamesCount > 0 && (
                <>
                  <TabHeader heading='Draft' paragraph='Game which are successfully deployed' />
                  <StyledContainerWrapper>
                    {draftGames?.map((item: any) => renderGameCard(item))}
                  </StyledContainerWrapper>
                </>
              )}

              {draftGamesCount === 0 && <GamePageEmptyScreen />}
            </TabPanel>
          </TabPanels>
        </TabsContext>
      </StyledInnerWrapper>
      <CreateGameModal />
    </>
  )
}

export default Games

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
