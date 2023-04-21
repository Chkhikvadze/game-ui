import styled from 'styled-components'

import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Typography from '@l3-lib/ui-core/dist/Typography'

import moment from 'moment'

type GameFooterProps = {
  logo: string
  defaultLogo: string

  title: string
  subTitle: string
}

const GameFooter = ({
  logo,
  defaultLogo,

  title,
  subTitle,
}: GameFooterProps) => {
  return (
    <>
      <StyledAvatarWrapper>
        <Avatar
          size={Avatar.sizes.SMALL}
          src={logo ? logo : defaultLogo}
          type={Avatar.types.IMG}
          rectangle
        />
      </StyledAvatarWrapper>

      <StyledTextWrapper>
        <Typography
          value={title}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#fff'
        />
        <Typography
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledTextWrapper>
    </>
  )
}

export default GameFooter

export const StyledAvatarWrapper = styled.div`
  width: fit-content;
`
export const StyledTextWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`
