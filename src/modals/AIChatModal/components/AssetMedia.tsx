import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { IAsset, IMedia } from '../types'
import { ChatContext } from '../context/ChatContext'
import MediaCard from './MediaCard'

type AssetMediaProps = {
  asset: IAsset
  collectionId: string
}

const AssetMedia = ({ asset, collectionId }: AssetMediaProps) => {
  const { updateMessageCollectionAsset, updateAsset } = useContext(ChatContext)

  const { media } = asset

  const updateMedia = (newMedia: IMedia) => {
    updateMessageCollectionAsset(collectionId, {
      ...asset,
      media: newMedia,
    })

    updateAsset(collectionId, asset.id, {
      medias: [
        {
          id: uuidv4(),
          url: newMedia.current.url,
          is_main: true,
          format: '',
        },
      ],
    })
  }

  return media ? <MediaCard media={media} updateMedia={updateMedia} /> : null
}

export default AssetMedia
