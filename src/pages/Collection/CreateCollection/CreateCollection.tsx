import Skeleton from '@l3-lib/ui-core/dist/Skeleton'
import { StyledRoot } from 'oldComponents/atoms/Heading/HeadingStyle'
import { StyledFormSection } from '../EditCollection/EditCollection'

const CreateCollection = () => (
  <StyledRoot>
    <StyledFormSection>
      <div className="l3-style-stories-skeleton_column-box">
        <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.H1} />
      </div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div className="l3-style-stories-skeleton_column-box">
          <Skeleton />
        </div>
        <div className="l3-style-stories-skeleton_column-box">
          <Skeleton />
        </div>
        <div className="l3-style-stories-skeleton_column-box">
          <Skeleton />
        </div>
      </div>
      <div className="l3-style-stories-skeleton_column-box">
        <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.H1} />
      </div>
      <div className="l3-style-stories-skeleton_column-box">
        <Skeleton type={Skeleton.types.TEXT} size={Skeleton.sizes.TEXT.H1} />
      </div>
    </StyledFormSection>
  </StyledRoot>
)

export default CreateCollection
