import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import {
  StyledCollectionImg,
  StyledCollectionSection,
  StyledDetailWrapper,
  StyledPlayerAvatarWrapper,
} from '../ProjectCardStyles'
import styled from 'styled-components'
import ScrollContainer from 'react-indiana-drag-scroll'

interface CollectionDetailProps {
  price?: { minPrice?: number; volume?: number; listed?: number }
  owners?: { ownerImages?: [string]; ownerCount?: number }
  assets?: { assetImages?: [string]; assetCount?: number }
}

const CollectionDetail = ({ price, owners, assets }: CollectionDetailProps) => {
  const nFormatter = (num: number, digits: number) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value
      })
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
  }

  return (
    <StyledDetailWrapper>
      {price && (
        <StyledPriceWrapper>
          <StyledPriceColumn>
            <Typography
              value='Min. Price'
              type={Typography.types.LABEL}
              size={Typography.sizes.xss}
            />
            <StyledValues>
              <Typography
                value={price?.minPrice}
                type={Typography.types.LABEL}
                size={Typography.sizes.LARGE}
              />
            </StyledValues>
          </StyledPriceColumn>
          <StyledPriceColumn>
            <Typography value='Volume' type={Typography.types.LABEL} size={Typography.sizes.xss} />
            <StyledValues>
              <Typography
                value={`${nFormatter(price?.volume || 0, 0)}`}
                type={Typography.types.LABEL}
                size={Typography.sizes.LARGE}
              />
            </StyledValues>
          </StyledPriceColumn>
          <StyledPriceColumn>
            <Typography value='Listed' type={Typography.types.LABEL} size={Typography.sizes.xss} />
            <StyledValues>
              <Typography
                value={`${price?.listed}%`}
                type={Typography.types.LABEL}
                size={Typography.sizes.LARGE}
              />
            </StyledValues>
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
