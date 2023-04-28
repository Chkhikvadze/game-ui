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
                logo='https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
              >
                <StyledScrollDiv>
                  {item.player_assets?.map((item: any) => {
                    return (
                      <AssetCard
                        key={item.id}
                        title={item.asset?.name}
                        image={item.asset?.medias[0]?.url}
                      />
                    )
                  })}
                </StyledScrollDiv>
              </Accordion>
            )
          })
        )}
      </StyledInnerWrapper>
      {/* <Accordion
        title={'Fortnite (5)'}
        isOpen
        level='Level 23'
        joinDate='Aug 2022'
        logo='https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png'
      >
        <StyledAchievementsContainer>
          <Typography
            value='Achievement'
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <StyledAchievements>
            <Avatar size={Avatar.sizes.SMALL} src={achive1} type={Avatar.types.IMG} rectangle />
            <Avatar size={Avatar.sizes.SMALL} src={achive2} type={Avatar.types.IMG} rectangle />
          </StyledAchievements>
        </StyledAchievementsContainer>
        <StyledScrollDiv>
          <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
          <AssetCard
            title={'Warrior Jake'}
            image={
              'https://progameguides.com/wp-content/uploads/2019/10/fortnite-outfit-8-ball-vs-scratch.jpg?fit=875%2C915'
            }
          />
          <AssetCard title={'Travis Scott'} image={'https://fortnite.gg/img/items/251/bg.jpg?5'} />
          <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
          <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
        </StyledScrollDiv>
      </Accordion> */}
    </>
  )
}

export default PlayerAssets

const StyledScrollDiv = styled(ScrollContainer)`
  display: flex;
  gap: 15px;
`
