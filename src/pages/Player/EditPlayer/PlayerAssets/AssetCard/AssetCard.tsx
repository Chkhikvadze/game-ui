import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'

import Add from '@l3-lib/ui-core/dist/icons/Add'
import StarOutline from '@l3-lib/ui-core/dist/icons/StarOutline'

import attr1 from 'assets/avatars/attr1.png'
import attr2 from 'assets/avatars/attr2.png'
import attr3 from 'assets/avatars/attr3.png'

import icon1 from './assets/icon1.png'
import icon2 from './assets/icon2.png'
import icon3 from './assets/icon3.png'
import icon4 from './assets/icon4.png'

type AssetCardProps = {
  title: string
  image: string
}

const AssetCard = ({ title, image }: AssetCardProps) => {
  return (
    <StyledRoot>
      <StyledActions>
        <StyledHeader>
          <StyledHeaderCenter>
            <Typography
              value={title}
              type={Typography.types.LABEL}
              size={Typography.sizes.lg}
              customColor={'#FFF'}
            />
            <StyledTag
              label='Legendary'
              size='small'
              outlined
              readOnly
              color={'gradient_blue'}
              leftIcon={StarOutline}
            />
          </StyledHeaderCenter>

          <StyledHeaderRight>
            <Typography
              value='0,96'
              type={Typography.types.LABEL}
              size={Typography.sizes.sm}
              customColor={'#FFF'}
            />
          </StyledHeaderRight>
        </StyledHeader>
        <StyledAttributesWrapper>
          <StyledAvatar size={Avatar.sizes.SMALL} src={attr1} type={Avatar.types.IMG} rectangle />
          <StyledAvatar size={Avatar.sizes.SMALL} src={attr2} type={Avatar.types.IMG} rectangle />
          <StyledAvatar size={Avatar.sizes.SMALL} src={attr3} type={Avatar.types.IMG} rectangle />
          <IconButton
            size={IconButton.sizes.SMALL}
            icon={Add}
            kind={IconButton.kinds.TERTIARY}
            ariaLabel='Add'
          />
        </StyledAttributesWrapper>
        <StyledFooter>
          <img src={icon1} alt='' />
          <img src={icon2} alt='' />
          <img src={icon3} alt='' />
          <img src={icon4} alt='' />
        </StyledFooter>
      </StyledActions>
      <StyledImg src={image} alt='' />
    </StyledRoot>
  )
}

export default AssetCard

const StyledRoot = styled.div`
  position: relative;

  width: 266px;
  min-width: 266px;
  height: 300px;

  border-radius: 16px;
`
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`
const StyledActions = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  justify-content: flex-end;
`
const StyledFooter = styled.div`
  /* position: absolute; */
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  padding: 6px 19px;
  gap: 6px;

  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);

  width: 100%;
  min-height: 42px;
  border-radius: 0 0 16px 16px;
`
const StyledHeader = styled.div`
  position: relative;
  width: 100%;

  margin-bottom: auto;

  display: flex;
  justify-content: center;
  /* align-items: flex-start; */

  padding-top: 12px;
`
const StyledHeaderCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTag = styled(Tags)`
  backdrop-filter: blur(8px);
`
const StyledAttributesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  align-items: flex-end;

  margin-right: 10px;
`
const StyledAvatar = styled(Avatar)`
  margin-right: 5px;
`
const StyledHeaderRight = styled.div`
  position: absolute;
  right: 3%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;

  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1.48148px 4.44444px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(74.0741px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 4.44444px;
`
