import { WrapperSecondary } from './WrapperSecondary'
import { useContext } from 'react'
import ImageCollageCard from './ImageCollageCard'
import { IChatMessage } from '../types'
import { useUpscaleAiMediaService } from 'services/chat/useUpscaleAiMediaService'
import { useAiMediaService } from 'services/chat/useAiMediaService'
import { ChatContext } from '../context/ChatContext'

type GameMediasProps = {
  message: IChatMessage
}

const GameMedias = ({ message }: GameMediasProps) => {
  const { mediaCollage, currentMedia, isMediaGenerating } = message

  const { upscaleAiMediaService, loading: isUpscaling } = useUpscaleAiMediaService()

  const { fetchAiMedia } = useAiMediaService()

  const { updateMessage } = useContext(ChatContext)

  const onChoose = async (button: string) => {
    if (!mediaCollage) return

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
  }

  return (
    <WrapperSecondary>
      <ImageCollageCard
        src={currentMedia?.url || ''}
        isGenerating={isMediaGenerating || isUpscaling}
        onChooseClick={onChoose}
        // onRemoveBackground={onRemoveBackground}
        // onSeeOriginal={onSeeOriginal}
        type={currentMedia?.type}
      />
      {/* <StyledImageWrapper>
        {message?.medias?.map((item: any) => (
          <ImageCard
            key={item}
            src={item}
            isSelected={items.includes(item)}
            onClick={() => handleClick(item)}
          />
        ))}
      </StyledImageWrapper> */}
    </WrapperSecondary>
  )
}

export default GameMedias
