import { StyledTextWrapper } from 'pages/Project/Projects/Projects'
import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'

type TabHeaderProps = {
  heading?: string
  paragraph?: string
}

const TabHeader = ({ heading, paragraph }: TabHeaderProps) => (
  <StyledTextWrapper>
    <Heading type={Heading.types.h1} value={heading} size='medium' brandFont customColor={'#fff'} />
    <Typography
      value={paragraph}
      type={Typography.types.P}
      size={Typography.sizes.lg}
      customColor={'rgba(255, 255, 255, 0.6)'}
    />
  </StyledTextWrapper>
)

export default TabHeader
