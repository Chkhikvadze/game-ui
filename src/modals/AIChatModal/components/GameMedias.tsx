import styled from 'styled-components'
import { WrapperSecondary } from './WrapperSecondary'
import { useContext, useState } from 'react'
import ImageCollageCard from './ImageCollageCard'
import { IChatMessage } from '../types'
import { useUpscaleAiMediaService } from 'services/chat/useUpscaleAiMediaService'
import { useAiMediaService } from 'services/chat/useAiMediaService'
import { ChatContext } from '../context/ChatContext'
import { useRemoveMediaBackgroundService } from 'services/chat/useRemoveMediaBackgroundService'

type GameMediasProps = {
  message: IChatMessage
}

const GameMedias = ({ message }: GameMediasProps) => {
  const { mediaCollage, currentMedia, upscaledMedia, mediaWithoutBackground, isMediaGenerating } =
    message

  const { upscaleAiMediaService, loading: isUpscaling } = useUpscaleAiMediaService()
  const { removeMediaBackgroundService, loading: isBackgroundRemoving } =
    useRemoveMediaBackgroundService()
  const { fetchAiMedia } = useAiMediaService()

  const { updateMessage } = useContext(ChatContext)

  const onChoose = async (button: string) => {
    if (!mediaCollage) return

    try {
      const { id } = await upscaleAiMediaService({
        id: mediaCollage.id,
        button,
      })

      const data = await fetchAiMedia(id)

      const url = data.webhook_data.imageUrl

      updateMessage({
        ...message,
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

    if (mediaWithoutBackground) {
      return updateMessage({
        ...message,
        currentMedia: {
          url: mediaWithoutBackground.url,
          type: 'imageWithoutBackground',
        },
      })
    }

    try {
      const url = await removeMediaBackgroundService({
        id: upscaledMedia.id,
      })

      updateMessage({
        ...message,
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

    updateMessage({
      ...message,
      currentMedia: {
        url: upscaledMedia.url,
        type: 'image',
      },
    })
  }

  return (
    <WrapperSecondary>
      <ImageCollageCard
        src={currentMedia?.url || ''}
        isGenerating={isMediaGenerating || isUpscaling || isBackgroundRemoving}
        onChooseClick={onChoose}
        onRemoveBackground={onRemoveBackground}
        onSeeOriginal={onSeeOriginal}
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

const StyledImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  grid-auto-rows: 228px;
`
