import { IAsset, IMedia } from '../types'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import MediaCard from './MediaCard'

type AssetMediaProps = {
  asset: IAsset
  collectionId: string
}

const AssetMedia = ({ asset, collectionId }: AssetMediaProps) => {
  const { updateMessageCollectionAsset } = useContext(ChatContext)

  const { media } = asset

  const updateMedia = (newMedia: IMedia) => {
    updateMessageCollectionAsset(collectionId, {
      ...asset,
      media: newMedia,
    })
  }

  return media ? <MediaCard media={media} updateMedia={updateMedia} /> : null
}

export default AssetMedia
