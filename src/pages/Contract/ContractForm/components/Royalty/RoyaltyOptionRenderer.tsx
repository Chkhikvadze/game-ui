import styled from 'styled-components'
import Tags from '@l3-lib/ui-core/dist/Tags'
import Typography from '@l3-lib/ui-core/dist/Typography'

type RoyaltyOptionRendererProps = {
  label: string
  text: string
}

const RoyaltyOptionRenderer = ({ label, text }: RoyaltyOptionRendererProps) => {
  return (
    <StyledNewCategory>
      {text && (
        <Typography
          value={text}
          type={Typography.types.LABEL}
          size={Typography.sizes.lg}
          customColor={'#FFF'}
        />
      )}

      <Tags key={label} label={label} readOnly outlined={true} color={Tags.colors.white} />
    </StyledNewCategory>
  )
}

export default RoyaltyOptionRenderer

const StyledNewCategory = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`
