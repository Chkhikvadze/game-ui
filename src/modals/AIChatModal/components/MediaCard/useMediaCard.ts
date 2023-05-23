import { useState } from 'react'
import { IMedia } from 'modals/AIChatModal/types'
import {
  useAiMediaService,
  useRemoveMediaBackgroundService,
  useUpscaleAiMediaService,
} from 'services'

type UseMediaCardProps = {
  media: IMedia
  updateMedia?: (media: IMedia) => void
}

const useMediaCard = ({ media, updateMedia }: UseMediaCardProps) => {
  const [loading, setLoading] = useState(false)
  const { collage, upscaled, upscaledWithoutBackground } = media

  const { upscaleAiMediaService } = useUpscaleAiMediaService()
  const { removeMediaBackgroundService } = useRemoveMediaBackgroundService()
  const { fetchAiMedia } = useAiMediaService()

  const handleRemoveBackground = async () => {
    if (!upscaled || !updateMedia) return

    // If media without background already exists, just use it and don't call API
    if (upscaledWithoutBackground) {
      const { url } = upscaledWithoutBackground

      return updateMedia({
        ...media,
        current: {
          url,
          type: 'upscaledWithoutBackground',
        },
      })
    }

    setLoading(true)

    try {
      const url = await removeMediaBackgroundService({
        id: upscaled.id,
      })

      updateMedia({
        ...media,
        current: {
          url,
          type: 'upscaledWithoutBackground',
        },
        upscaledWithoutBackground: {
          url,
        },
      })
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleSwitchBackgroundMode = () => {
    if (!upscaled || !updateMedia) return

    const { url } = upscaled

    updateMedia({
      ...media,
      current: {
        url,
        type: 'upscaled',
      },
    })
  }

  const handleUpscale = async (button: string) => {
    if (!updateMedia) return

    setLoading(true)

    try {
      const { id } = await upscaleAiMediaService({
        id: collage.id,
        button,
      })

      const { media: url } = await fetchAiMedia(id)

      const newMedia: IMedia = {
        ...media,
        current: {
          url,
          type: 'upscaled',
        },
        upscaled: {
          id,
          url,
        },
      }

      updateMedia(newMedia)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return {
    handleUpscale,
    handleRemoveBackground,
    handleSwitchBackgroundMode,
    loading,
  }
}

export default useMediaCard
