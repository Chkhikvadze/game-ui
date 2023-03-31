import styled from 'styled-components'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Tags from '@l3-lib/ui-core/dist/Tags'

type DeploySummaryCardProps = {
  headerTitle?: string
  headerValue?: string
  properties: {
    title: string
    value: string
  }[]
}

const DeploySummaryCard = ({ headerTitle, headerValue, properties }: DeploySummaryCardProps) => {
  console.log(Tags.colors)
  return (
    <StyledWrapper>
      {headerTitle && (
        <StyledProperty isHeader>
          <Typography
            value={headerTitle}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor='#fff'
          />
          {headerValue && (
            <Tags label={headerValue} readOnly color={Tags.colors.gradient_gray} />

            // <Typography
            //   value={headerValue}
            //   type={Typography.types.P}
            //   size={Typography.sizes.sm}
            //   customColor='#fff'
            // />
          )}
        </StyledProperty>
      )}

      {properties.map(({ title, value }) => (
        <StyledProperty key={title}>
          <Typography
            value={title}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
            customColor='#fff'
          />
          <Typography
            value={value}
            type={Typography.types.P}
            size={Typography.sizes.sm}
            customColor='#fff'
          />
        </StyledProperty>
      ))}
    </StyledWrapper>
  )
}

export default DeploySummaryCard

const StyledWrapper = styled.ul`
  background: rgba(0, 0, 0, 0.2);
  box-shadow: inset 0px 1px 20px rgba(8, 8, 16, 0.1);
  border-radius: 16px;
  padding: 16px;
`

export const StyledProperty = styled.li<{ isHeader?: boolean }>`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;

  ${props => props.isHeader && `border-bottom: 1px solid rgba(0, 0, 0, 0.1);`}
`
