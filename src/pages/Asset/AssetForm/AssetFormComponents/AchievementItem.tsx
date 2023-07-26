import styled from 'styled-components'

import Close from '@l3-lib/ui-core/dist/icons/Close'
import Check from '@l3-lib/ui-core/dist/icons/Check'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

type AchievementItemProps = {
  image: string
  name: string
  onClick: () => void
}

const AchievementItem = ({ name, image, onClick }: AchievementItemProps) => {
  return (
    <StyledAchievement>
      <Avatar size={Avatar.sizes.SMALL} src={image} type={Avatar.types.IMG} rectangle />

      {name}

      <StyledButton onClick={onClick} className={'button'}>
        <Close size='26' />
        {/* <StyledCheckWrapper>
          <StyledCheck>
            <Check color='#5585cd' />
          </StyledCheck>
        </StyledCheckWrapper> */}
      </StyledButton>
    </StyledAchievement>
  )
}

export default AchievementItem

const StyledCheckWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: #5f94e4;
  border-radius: 10px;
`

const StyledCheck = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
  width: 30px
  height: 30px;
  background: white;
  border-radius: 100px;
`

const StyledAchievement = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  color: white;

  gap: 10px;

  // padding: 6px 8px;

  :hover {
    .button {
      opacity: 1;
    }
  }
`

const StyledButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  cursor: pointer;
  opacity: 0;
`
