import Typography from '@l3-lib/ui-core/dist/Typography'
import moment from 'moment'
import { StyledTextWrapper } from '../ProjectCardStyles'

interface TitleComponentProps {
  showDetails: boolean
  title: string
  created?: Date
  subTitle?: string
}

const TitleComponent = ({ showDetails, title, created, subTitle }: TitleComponentProps) => {
  return (
    <StyledTextWrapper showDetails={showDetails}>
      <Typography
        value={title}
        type={Typography.types.LABEL}
        size={showDetails ? Typography.sizes.md : Typography.sizes.sm}
        customColor='#fff'
      />
      <Typography
        value={showDetails ? `Created: ${moment(created).format('MMM YYYY')}` : subTitle}
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )
}

export default TitleComponent
