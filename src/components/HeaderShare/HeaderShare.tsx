import styled, { css } from 'styled-components'

import { useAssignedUserListService } from 'services'
import { RandomAvatar } from 'helpers/RandomImage'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Share from '@l3-lib/ui-core/dist/icons/Share'
import Tooltip from '@l3-lib/ui-core/dist/Tooltip'

import { avatarsArray } from 'assets/avatars'

type HeaderShareProps = {
  activeUsers?: any
}

const HeaderShare = ({ activeUsers = [] }: HeaderShareProps) => {
  const { data: assignedUserList } = useAssignedUserListService()

  return (
    <StyledSharedColumn>
      <Typography
        value={'Edited 1h ago'}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(0, 0, 0, 0.3)'}
      />
      <StyledAvatarsWrapper>
        {assignedUserList.map((user: any) => {
          const { assigned_user_first_name, id, assigned_user_id } = user

          return (
            <Tooltip
              key={id}
              content={() => <span>{assigned_user_first_name}</span>}
              position={Tooltip.positions.TOP}
            >
              <StyledAvatar active={activeUsers.includes(assigned_user_id)}>
                <RandomAvatar imageArray={avatarsArray} />
              </StyledAvatar>
            </Tooltip>
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
const StyledAvatar = styled.div<{ active: boolean }>`
  margin-left: -5px;
  opacity: 0.5;
  ${p =>
    p.active &&
    css`
      opacity: 1;
    `};
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
