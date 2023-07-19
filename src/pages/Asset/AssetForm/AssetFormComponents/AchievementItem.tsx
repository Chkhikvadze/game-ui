import styled from 'styled-components'

import Close from '@l3-lib/ui-core/dist/icons/Close'
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
        <Close />
      </StyledButton>
    </StyledAchievement>
  )
}

export default AchievementItem

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

  margin-left: auto;

  opacity: 0;
`
