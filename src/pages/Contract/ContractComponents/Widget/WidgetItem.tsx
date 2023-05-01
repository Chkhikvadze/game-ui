import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'

type WidgetItemProps = {
  itemTitle: string
  itemValue?: string | number
  image?: string
  itemSubtitle?: string
}

const WidgetItem = ({ itemTitle, itemValue, image, itemSubtitle }: WidgetItemProps) => {
  return (
    <StyledWidgetItem>
      <StyledDiv>
        {image && (
          <Avatar size={Avatar.sizes.SMALL} src={image} type={Avatar.types.IMG} rectangle />
        )}
        <StyledTitleWrapper>
          <Typography
            value={itemTitle}
            type={Typography.types.LABEL}
            size={Typography.sizes.md}
            customColor={'#FFF'}
          />
          <Typography
            value={itemSubtitle}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor={'rgba(255, 255, 255, 0.6)'}
          />
        </StyledTitleWrapper>
      </StyledDiv>

      <Typography
        value={itemValue}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'rgba(255, 255, 255, 0.8)'}
      />
    </StyledWidgetItem>
  )
}

export default WidgetItem

const StyledWidgetItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0px;
`

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledDiv = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`
