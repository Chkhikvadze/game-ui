import Typography from '@l3-lib/ui-core/dist/Typography'

import { StyledTextWrapper } from './GameFooter'

type CollectionFooterProps = {
  title: string
  subTitle: string
}

const CollectionFooter = ({ title, subTitle }: CollectionFooterProps) => {
  return (
    <StyledTextWrapper>
      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={Typography.sizes.lg}
        customColor='#fff'
      />
      <Typography
        value={subTitle}
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )
}

export default CollectionFooter
