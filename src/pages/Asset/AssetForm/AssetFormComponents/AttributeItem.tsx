import Avatar from '@l3-lib/ui-core/dist/Avatar'
import Slider from '@l3-lib/ui-core/dist/Slider'
import styled from 'styled-components'

type AttributeItemProps = {
  image: string
  name: string
}

const AttributeItem = ({ image, name }: AttributeItemProps) => {
  return (
    <StyledAttributeItem>
      <StyledHeader>
        <StyledNameWrapper>
          <Avatar size={Avatar.sizes.SMALL} src={image} type={Avatar.types.IMG} rectangle />
          {name}
        </StyledNameWrapper>
        <div>50/100</div>
      </StyledHeader>

      <Slider color={Slider.colors.POSITIVE} defaultValue={50} />
    </StyledAttributeItem>
  )
}

export default AttributeItem

const StyledAttributeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 14px;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0px 8px;
`

const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
