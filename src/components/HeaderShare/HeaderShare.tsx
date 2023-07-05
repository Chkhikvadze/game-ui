import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

import Share from '@l3-lib/ui-core/dist/icons/Share'

import { Avatar_1, Avatar_2, Avatar_3 } from 'assets/avatars'

const avatars = [Avatar_1, Avatar_2, Avatar_3, Avatar_1]

const HeaderShare = () => {
  return (
    <StyledSharedColumn>
      <Typography
        value={'Edited 1h ago'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(0, 0, 0, 0.3)'}
      />
      <StyledAvatarsWrapper>
        {avatars.map((avatar: string) => {
          return (
            <StyledAvatar>
              <Avatar size={Avatar.sizes.SMALL} src={avatar} type={Avatar.types.IMG} rectangle />
            </StyledAvatar>
          )
        })}
      </StyledAvatarsWrapper>

      <StyledShareButton>
        <StyledIconWrapper>
          <Share />
        </StyledIconWrapper>

        <Typography
          value={'Share'}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor={'rgba(255, 255, 255, 0.80)'}
        />
      </StyledShareButton>
    </StyledSharedColumn>
  )
}

export default HeaderShare

const StyledSharedColumn = styled.div`
  display: flex;
  align-items: center;

  gap: 15px;
`
const StyledAvatarsWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledAvatar = styled.div`
  margin-left: -5px;
`
const StyledShareButton = styled.div`
  display: flex;
  padding: 0px 10px 0px 4px;
  justify-content: center;
  align-items: center;

  &:hover {
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
  }
`
const StyledIconWrapper = styled.div`
  color: #fff;
  /* background: transparent; */
`
