import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCollectionsImagesService } from 'services'
import { usePlayersImages } from 'services/usePlayerService'
import { useGames } from './useGames'
import CreateGameModal from 'modals/CreateGameModal'
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
import {
  StyledHeaderGroup,
  StyledContainerWrapper,
  StyledInnerWrapper,
} from 'styles/globalStyle.css'
import { findVideo } from 'helpers/detectMedia'
import HeaderWrapper from 'components/HeaderWrapper'
import getDefaultImage from 'helpers/getDefaultImage'

const Games = () => {
  const { openCreateGameModal, data } = useGames()
  const navigate = useNavigate()
  const [gameId, setGameId] = useState('')

  const [activeTab, setActiveTab] = useState(0)

  const handleCardClick = (id: string) => {
    setGameId(id)
  }

  const { data: collections, refetch: refetchCollection } = useCollectionsImagesService({
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

    const defaultImageSrc: any = getDefaultImage(category)?.imageSrc

    const defaultImage = main_media || defaultImageSrc

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
          <TabPanels noAnimation>
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
