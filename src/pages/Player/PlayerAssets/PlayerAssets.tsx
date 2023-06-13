import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

import Heading from '@l3-lib/ui-core/dist/Heading'

import usePlayerAssets from './usePlayerAssets'

import Accordion from '../components/Accordion'
import AssetCard from '../components/AssetCard'

// import MenuButton from '@l3-lib/ui-core/dist/MenuButton'
// import MenuDots from '@l3-lib/ui-core/dist/icons/MenuDots'

import { StyledHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'
import PlayerAssetsEmptyScreen from './PlayerAssetsEmptyScreen/PlayerAssetsEmptyScreen'
import { game_default_image, game_default_logo } from 'pages/Game/Games/Games'

const PlayerAssets = () => {
  const { playerAssetsByCollections, attributesOptions, rewardsOptions, achievementsOptions } =
    usePlayerAssets()

  return (
    <>
      <StyledHeaderGroup>
        <Heading
          type={Heading.types.h1}
          value={`${playerAssetsByCollections?.total_player_assets || '0'} Assets`}
          customColor={'#FFF'}
        />

        {/* <MenuButton component={MenuDots}></MenuButton> */}
      </StyledHeaderGroup>
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
                    const playerAttributes = item.asset?.attributes?.map((value: any) => value.id)
                    const playerAchievements = item.asset?.achievements?.map(
                      (value: any) => value.id,
                    )
                    const playerRewards = item.asset?.rewards?.map((value: any) => value.id)

                    const gameAttributes = attributesOptions?.map((attribute: any) => {
                      if (playerAttributes?.includes(attribute.id)) {
                        return attribute
                      } else return null
                    })
                    const gameAchievements = achievementsOptions?.map((achievement: any) => {
                      if (playerAchievements?.includes(achievement.id)) {
                        return achievement
                      } else return null
                    })
                    const gameRewards = rewardsOptions?.map((reward: any) => {
                      if (playerRewards?.includes(reward.id)) {
                        return reward
                      } else return null
                    })

                    const filteredAttributes = gameAttributes?.filter(
                      (attribute: any) => attribute !== null,
                    )
                    const filteredAchievements = gameAchievements?.filter(
                      (achievement: any) => achievement !== null,
                    )
                    const filteredRewards = gameRewards?.filter((reward: any) => reward !== null)

                    return (
                      <AssetCard
                        key={item.id}
                        title={item.asset?.name}
                        medias={item.asset?.medias?.map((media: any) => media.url)}
                        story={item.asset?.description}
                        supply={item.asset?.supply}
                        status={item.asset?.status}
                        attributes={filteredAttributes}
                        achievements={filteredAchievements}
                        rewards={filteredRewards}
                        mintedAmount={item.asset?.mintedAmount}
                        price={item.asset?.price}
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
