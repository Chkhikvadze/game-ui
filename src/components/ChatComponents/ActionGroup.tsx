import styled from 'styled-components'
import LikeButton from './LikeButton'
import DislikeButton from './DislikeButton'
import ShareButton from './ShareButton'

const ActionGroup = () => {
  return (
    <StyledActionGroup>
      <LikeButton />
      <DislikeButton />
      <ShareButton />
    </StyledActionGroup>
  )
}

export default ActionGroup

const StyledActionGroup = styled.div`
  display: flex;
  //   gap: 10px;
  align-items: center;
`
