import { useContext, useState } from 'react'
import { IChatMessage } from '../types'
import ImageCollageCard from './ImageCollageCard'
import WrapperSecondary from './WrapperSecondary'
import { useUpscaleAiMediaService, useAiMediaService } from 'services'
import { ChatContext } from '../context/ChatContext'

type MediaProps = {
  message: IChatMessage
}

const Media = ({ message }: MediaProps) => {
  const { mediaCollage, currentMedia, isMediaGenerating } = message

  const { upscaleAiMediaService } = useUpscaleAiMediaService()

  const [loading, setLoading] = useState(false)

  const { fetchAiMedia } = useAiMediaService()

  const { updateMessage } = useContext(ChatContext)

  const onChoose = async (button: string) => {
    if (!mediaCollage) return

    setLoading(true)

    try {
      const { id } = await upscaleAiMediaService({
        id: mediaCollage.id,
        button,
      })

      const { media } = await fetchAiMedia(id)

      updateMessage({
        ...message,
        currentMedia: {
          url: media,
          type: 'image',
        },
        upscaledMedia: {
          id,
          url: media,
        },
      })
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <WrapperSecondary>
      <ImageCollageCard
        src={currentMedia?.url || ''}
        isGenerating={isMediaGenerating || loading}
        onChooseClick={onChoose}
        type={currentMedia?.type}
      />
    </WrapperSecondary>
  )
}

export default Media
