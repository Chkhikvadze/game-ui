import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

import Heading from '@l3-lib/ui-core/dist/Heading'

import usePlayerAssets from './usePlayerAssets'

import Accordion from '../components/Accordion'
import AssetCard from '../components/AssetCard'

// import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
// import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import PlayerAssetsEmptyScreen from './PlayerAssetsEmptyScreen/PlayerAssetsEmptyScreen'
import { game_default_image, game_default_logo } from 'pages/Game/Games/Games'

const PlayerAssets = () => {
  const { playerAssetsByCollections } = usePlayerAssets()

  return (
    <>
      <StyleHeaderGroup>
        <Heading
          type={Heading.types.h1}
          value={`${playerAssetsByCollections?.total_player_assets || '0'} Assets`}
          customColor={'#FFF'}
        />

        {/* <MenuButton component={MenuDots}></MenuButton> */}
      </StyleHeaderGroup>
      <StyledInnerWrapper>
        {playerAssetsByCollections?.total_player_assets === 0 ? (
          <PlayerAssetsEmptyScreen />
        ) : (
          playerAssetsByCollections?.items?.map((item: any, index: number) => {
            return (
              <Accordion
                key={index}
                isOpen={index === 0}
                title={`${item.name} (${item.player_assets?.length})`}
                logo={game_default_logo}
              >
                <StyledScrollDiv>
                  {item.player_assets?.map((item: any) => {
                    return (
                      <AssetCard
                        key={item.id}
                        title={item.asset?.name}
                        medias={item.asset?.medias?.map((media: any) => media.url)}
                      />
                    )
                  })}
                </StyledScrollDiv>
              </Accordion>
            )
          })
        )}
      </StyledInnerWrapper>
    </>
  )
}

export default PlayerAssets

const StyledScrollDiv = styled(ScrollContainer)`
  display: flex;
  gap: 15px;
`
