import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import { ReactNode } from 'react'

type DeploySummaryCardProps = {
  items: {
    title: string
    value?: ReactNode
    isBig?: boolean
    hasSeparator?: boolean
    isValueBadge?: boolean
  }[]
}

const DeploySummaryCard = ({ items }: DeploySummaryCardProps) => {
  return (
    <StyledWrapper>
      {items.map(({ title, value, isValueBadge, isBig, hasSeparator }) => (
        <StyledProperty key={title} hasSeparator={hasSeparator} isBig={isBig}>
          <Typography
            value={title}
            type={Typography.types.LABEL}
            size={isBig ? Typography.sizes.md : Typography.sizes.sm}
            customColor='#fff'
          />
          {value !== undefined && isValueBadge && (
            <StyledValues>
              <Typography
                value={value}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor='#fff'
              />
            </StyledValues>
          )}

          {value !== undefined && !isValueBadge && (
            <Typography
              value={value}
              type={Typography.types.P}
              size={Typography.sizes.sm}
              customColor='#fff'
            />
          )}
        </StyledProperty>
      ))}
    </StyledWrapper>
  )
}

export default DeploySummaryCard

const StyledValues = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 8px 12px;
`

const StyledWrapper = styled.ul`
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
  padding: 16px;
`

export const StyledProperty = styled.li<{ hasSeparator?: boolean; isBig?: boolean }>`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
  /* padding: ${props => (props.isBig ? '8px 0' : '16px 0')}; */

  ${props => props.hasSeparator && `border-bottom: 1px solid rgba(0, 0, 0, 0.1);`}
`
