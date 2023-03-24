import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Badge from '@l3-lib/ui-core/dist/Badge'

type MiniCardProps = {
  title: string
  description: string
  selected: boolean
  image: string
  suggested: boolean
  onClick: () => void
}

const MiniCard = ({ title, description, selected, image, suggested, onClick }: MiniCardProps) => {
  return (
    <StyledWrapper onClick={onClick}>
      <StyledRoot selected={selected} image={image}>
        <StyledHeading value={title} />
        <Typography
          value={description}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor={'rgba(255, 255, 255, 0.8)'}
        />
        {suggested && (
          <StyledBadgeWrapper>
            <Badge type='secondary' label='Suggested' />
          </StyledBadgeWrapper>
        )}
      </StyledRoot>
    </StyledWrapper>
  )
}

export default MiniCard

const StyledRoot = styled.div<{ selected: boolean; image: string }>`
  height: 160px;
  width: 260px;
  min-width: 260px;

  border-radius: 16px;

  padding: 16px;

  /* background-color: grey; */

  display: flex;
  flex-direction: column;

  outline: ${p => p.selected && '4px solid #73fafd'};

  background-image: ${p =>
    p.image &&
    `linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%), url(${p.image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  cursor: pointer;
`
const StyledHeading = styled(Heading)`
  font-size: 40px;
  color: #fff;
`

const StyledBadgeWrapper = styled.div`
  margin-top: auto;
  margin-left: auto;
`
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`
