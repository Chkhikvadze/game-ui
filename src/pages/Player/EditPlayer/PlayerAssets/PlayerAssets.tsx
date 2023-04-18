import styled from 'styled-components'

import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import ShowHide from './ShowHide'
import AssetCard from './AssetCard'
import ScrollContainer from 'react-indiana-drag-scroll'

import achive1 from 'assets/avatars/achive1.png'
import achive2 from 'assets/avatars/achive2.png'
import { StyleHeaderGroup, StyledInnerWrapper } from 'styles/globalStyle.css'

const PlayerAssets = () => {
  return (
    <>
      <StyleHeaderGroup>
        <Heading type={Heading.types.h1} value={`12 Assets`} customColor={'#FFF'} />
      </StyleHeaderGroup>

      <StyledInnerWrapper>
        <ShowHide
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
            <AssetCard
              title={'Travis Scott'}
              image={'https://fortnite.gg/img/items/251/bg.jpg?5'}
            />
            <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
            <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
          </StyledScrollDiv>
        </ShowHide>

        <ShowHide
          title={'Gears of war (5)'}
          level='Level 13'
          joinDate='jan 2023'
          logo='https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQbRmfxTlk2vODAonLDpcVXbQz8774cum3jt7neV-dXs_uGEbi--Ko5khf7f7j0LbgJbM0I-rDDzeLkhlkjCjkc8RRVVo347upd7-iZCnGZ8dHDNyk2zO2wwioj-5Wr3a6jp8o1G0XC5TA51pFZb7P6Sd.jpg?r=87a'
        >
          <StyledScrollDiv>
            <AssetCard
              title={'Travis Scott'}
              image={'https://fortnite.gg/img/items/251/bg.jpg?5'}
            />
            <AssetCard title={'Black Adam'} image={'https://fortnite.gg/img/items/8531/bg.jpg?3'} />
          </StyledScrollDiv>
        </ShowHide>
      </StyledInnerWrapper>
    </>
  )
}

export default PlayerAssets

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  gap: 16px;
`

const StyledAchievementsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 8px;

  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`
const StyledAchievements = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 22px;
`

const StyledScrollDiv = styled(ScrollContainer)`
  display: flex;
  gap: 15px;
`
