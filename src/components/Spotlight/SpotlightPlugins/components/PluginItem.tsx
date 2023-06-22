import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'

type PluginItemProps = {
  image: string
  title: string
  description: string
}

const PluginItem = ({ image, title, description }: PluginItemProps) => {
  return (
    <StyledPluginItem>
      <StyledImg src={image} />
      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={Typography.sizes.sm}
        customColor={'#FFF'}
      />
      <StyledDescription>{description}</StyledDescription>
    </StyledPluginItem>
  )
}

export default PluginItem

const StyledPluginItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  width: 170px;
  height: 180.78px;

  background: rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1),
    inset 0px 0.620864px 4.96691px rgba(255, 255, 255, 0.35),
    inset -0.620864px 0.620864px 0.620864px -1.24173px rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(50px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
`
const StyledImg = styled.img`
  max-height: 80px;
  min-height: 80px;
`

const StyledDescription = styled.span`
  color: #fff;
  font-style: normal;
  font-weight: 450;
  font-size: 10px;
  line-height: 12px;
  /* or 120% */

  text-align: center;
`
