import styled, { css } from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import achievementImg from './assets/achievement.png'
import attributeImg from './assets/attribute.png'
import rewardImg from './assets/reward.png'
import DoneIcon from '@l3-lib/ui-core/dist/icons/Check'
import { memo } from 'react'

type AssetResourceCardProps = {
  title: string
  description: string
  tag?: string
  selected?: boolean
  type: 'achievement' | 'attribute' | 'reward'
  onClick?: () => void
}

const typeToImg = {
  achievement: achievementImg,
  attribute: attributeImg,
  reward: rewardImg,
}

const AssetResourceCard = ({
  title,
  description,
  tag,
  selected = false,
  type,
  onClick,
}: AssetResourceCardProps) => {
  return (
    <StyledWrapper selected={selected} onClick={onClick}>
      {selected && (
        <StyledAction>
          <DoneIcon size='16' />
        </StyledAction>
      )}

      <StyledBanner>
        {tag && <StyledTag>{tag}</StyledTag>}
        <StyledImg src={typeToImg[type]} alt='Trophy' />
      </StyledBanner>

      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={Typography.sizes.md}
        customColor={'#FFF'}
      />

      <Typography
        value={description}
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor={'rgba(255, 255, 255, 0.6)'}
      />
    </StyledWrapper>
  )
}

export default memo(AssetResourceCard)

const StyledWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  width: 230px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 13px;
  gap: 8px;
  isolation: isolate;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(50px);
  border-radius: 10.5882px;
  transition: background 0.15s ease-in-out;
  background: rgba(0, 0, 0, 0.1);

  ${props =>
    props.selected &&
    css`
      background: rgba(255, 255, 255, 0.1);
      border: 3px solid #73fafd;
      /* border-image-source: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%); */
    `}

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

const StyledBanner = styled.div`
  position: relative;
`

const StyledAction = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 66.67px;
  padding: 1.33px;
  position: absolute;
  top: 8px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledTag = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  word-break: keep-all;
  white-space: nowrap;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  border-radius: 4px;

  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`

const StyledImg = styled.img`
  /* margin-top: 10px; */
`
