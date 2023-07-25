import ShareIcon from '@l3-lib/ui-core/dist/icons/ShareOutline'
import styled from 'styled-components'

const ShareButton = () => {
  return (
    <StyledGroup>
      <ShareIcon currentColor='red' />
      {/* <Icon iconType={Icon.type.SVG} icon={ShareIcon} iconLabel='my bolt svg icon' iconSize={26} /> */}
    </StyledGroup>
  )
}

export default ShareButton

const StyledGroup = styled.div<{ isCount?: boolean }>`
  display: flex;
  align-items: center;
  min-width: 45px;
  justify-content: center;
  min-height: 25px;
  cursor: pointer;
  svg {
    width: 26px;
    path {
      fill: #1c274c;
    }
  }
`
