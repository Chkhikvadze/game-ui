import styled from 'styled-components'
import WrapperSecondary from '../WrapperSecondary'
import { IAsset, IChatMessage, ICollection } from '../../types'
import AssetMedia from '../AssetMedia'

type CollectionMediasProps = {
  message: IChatMessage
}

const CollectionMedias = ({ message }: CollectionMediasProps) => {
  return (
    <WrapperSecondary>
      <StyledImageWrapper>
        {message?.collections?.map((collection: ICollection) => {
          return collection.assets?.map((asset: IAsset) => (
            <AssetMedia key={asset.id} asset={asset} collectionId={collection.id} />
          ))
        })}
      </StyledImageWrapper>
    </WrapperSecondary>
  )
}

export default CollectionMedias

const StyledImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`
