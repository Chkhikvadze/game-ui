import Heading from '@l3-lib/ui-core/dist/Heading'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'

type CollectionFooterProps = {
  title: string
  subTitle: string
}

const CollectionFooter = ({ title, subTitle }: CollectionFooterProps) => {
  return (
    <StyledRoot>
      <StyledTextWrapper>
        <Heading type={Heading.types.h1} value={title} customColor='#fff' />

        <Typography
          value={subTitle}
          type={Typography.types.LABEL}
          size={Typography.sizes.xss}
          customColor='rgba(255, 255, 255, 0.8)'
        />
      </StyledTextWrapper>
    </StyledRoot>
  )
}

export default CollectionFooter

const StyledRoot = styled.div`
  position: absolute;
  margin-bottom: 120px;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 300px;
  overflow: hidden;
`
