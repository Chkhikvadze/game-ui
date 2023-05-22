import { v4 as uuidv4 } from 'uuid'
import { useRemoveMediaBackgroundService } from 'services/chat/useRemoveMediaBackgroundService'
import { useUpscaleAiMediaService } from 'services/chat/useUpscaleAiMediaService'
import { IAsset } from '../types'
import ImageCollageCard from './ImageCollageCard'
import { useAiMediaService } from 'services/chat/useAiMediaService'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

type AssetMediaProps = {
  asset: IAsset
  collectionId: string
}

const AssetMedia = ({ asset, collectionId }: AssetMediaProps) => {
  const { upscaleAiMediaService, loading: isUpscaling } = useUpscaleAiMediaService()
  const { removeMediaBackgroundService, loading: isBackgroundRemoving } =
    useRemoveMediaBackgroundService()

  const { fetchAiMedia } = useAiMediaService()

  const { updateMessageCollectionAsset } = useContext(ChatContext)

  const { currentMedia, mediaCollage, upscaledMedia, mediaWithoutBackground } = asset

  const onChoose = async (button: string) => {
    if (!mediaCollage) return

    try {
      const { id } = await upscaleAiMediaService({
        id: mediaCollage.id,
        button,
      })

      const { media: url } = await fetchAiMedia(id)

      updateMessageCollectionAsset(collectionId, {
        ...asset,
        medias: [
          {
            id: uuidv4(),
            url,
            is_main: true,
            format: '',
          },
        ],
        currentMedia: {
          url,
          type: 'image',
        },
        upscaledMedia: {
          id,
          url,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveBackground = async () => {
    if (!upscaledMedia) return

    // If media without background already exists, just use it and don't call API
    if (mediaWithoutBackground) {
      const { url } = mediaWithoutBackground

      return updateMessageCollectionAsset(collectionId, {
        ...asset,
        medias: [
          {
            id: uuidv4(),
            url,
            is_main: true,
            format: '',
          },
        ],
        currentMedia: {
          url,
          type: 'imageWithoutBackground',
        },
      })
    }

    try {
      const url = await removeMediaBackgroundService({
        id: upscaledMedia.id,
      })

      updateMessageCollectionAsset(collectionId, {
        ...asset,
        currentMedia: {
          url,
          type: 'imageWithoutBackground',
        },
        mediaWithoutBackground: {
          url,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onSeeOriginal = () => {
    if (!upscaledMedia) return

    const { url } = upscaledMedia

    updateMessageCollectionAsset(collectionId, {
      ...asset,
      medias: [
        {
          id: uuidv4(),
          url,
          is_main: true,
          format: '',
        },
      ],
      currentMedia: {
        url,
        type: 'image',
      },
    })
  }

  console.log(asset)

  return (
    <ImageCollageCard
      key={asset.id}
      src={currentMedia?.url || ''}
      isGenerating={isUpscaling || isBackgroundRemoving}
      onChooseClick={onChoose}
      onRemoveBackground={onRemoveBackground}
      onSeeOriginal={onSeeOriginal}
      type={currentMedia?.type}
    />
  )
}

export default AssetMedia
