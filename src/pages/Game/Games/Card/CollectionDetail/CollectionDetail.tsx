import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import {
  StyledCollectionImg,
  StyledCollectionSection,
  StyledDetailWrapper,
  StyledPlayerAvatarWrapper,
} from '../GameCardStyles'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'
import { volumeFormatter } from './CollectionDetailUtils'
import PriceColumn from './PriceColumn'

interface CollectionDetailProps {
  price: { minPrice: number; volume: number; listed: number }
  owners: { ownerImages: string[]; ownerCount: number }
  assets: { assetImages: string[]; assetCount: number }
}

const CollectionDetail = ({ price, owners, assets }: CollectionDetailProps) => {
  return (
    <StyledDetailWrapper>
      {price && (
        <StyledPriceWrapper>
          <StyledPriceColumn>
            <PriceColumn title={'Min. Price'} value={price?.minPrice.toString()} />
          </StyledPriceColumn>
          <StyledPriceColumn>
            <PriceColumn title={'Volume'} value={`${volumeFormatter(price?.volume || 0, 0)}`} />
          </StyledPriceColumn>
          <StyledPriceColumn>
            <PriceColumn title={'Listed'} value={`${price?.listed}%`} />
          </StyledPriceColumn>
        </StyledPriceWrapper>
      )}

      {owners && (
        <StyledOwnersWrapper>
          <Typography
            value={`Owners (${owners.ownerCount})`}
            type={Typography.types.LABEL}
            size={Typography.sizes.sm}
          />
          <StyledPlayerAvatarWrapper>
            {owners?.ownerImages &&
              owners?.ownerImages
                .slice(0, 10)
                .map((image: string) => (
                  <StyledAvatar
                    key={image}
                    size={Avatar.sizes.SMALL}
                    src={image}
                    type={Avatar.types.IMG}
                    rectangle
                  />
                ))}
          </StyledPlayerAvatarWrapper>
        </StyledOwnersWrapper>
      )}

      <StyledCollectionSection>
        <Typography
          value={assets?.assetCount !== undefined && `Assets (${assets.assetCount})`}
          type={Typography.types.LABEL}
          size={Typography.sizes.sm}
          customColor='#fff'
        />
        <ScrollContainer>
          <StyledCollectionScroll>
            {assets?.assetImages &&
              assets.assetImages.map((image: string) => (
                <StyledCollectionImg key={image} src={image} alt='' />
              ))}
          </StyledCollectionScroll>
        </ScrollContainer>
      </StyledCollectionSection>
    </StyledDetailWrapper>
  )
}

export default CollectionDetail

const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 6px;
`

const StyledPriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  gap: 12px;
`
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
const StyledOwnersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`
const StyledAvatar = styled(Avatar)`
  width: 25px;
`
