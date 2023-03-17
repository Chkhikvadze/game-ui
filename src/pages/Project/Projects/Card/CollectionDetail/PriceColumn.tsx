import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

type PriceColumnProps = {
  title: string
  value: string
}

const PriceColumn = ({ title, value }: PriceColumnProps) => {
  return (
    <StyledPriceColumn>
      <Typography value={title} type={Typography.types.LABEL} size={Typography.sizes.xss} />
      <StyledValues>
        <Typography value={value} type={Typography.types.LABEL} size={Typography.sizes.LARGE} />
      </StyledValues>
    </StyledPriceColumn>
  )
}

export default PriceColumn

const StyledPriceColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 4px;
`
const StyledValues = styled.div`
  background: #ffffff33;
  border-radius: 6px;
  padding: 4px 6px 4px 6px;
  width: 68px;

  display: flex;
  align-items: center;
  justify-content: center;
`
