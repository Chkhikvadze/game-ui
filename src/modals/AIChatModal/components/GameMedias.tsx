import styled from 'styled-components'
import ImageCard from './ImageCard'
import { WrapperSecondary } from './WrapperSecondary'
import { useContext, useState } from 'react'
import ImageCollageCard from './ImageCollageCard'
import { IChatMessage } from '../types'
import { useUpscaleAiMediaService } from 'services/chat/useUpscaleAiMediaService'
import { useAiMediaService } from 'services/chat/useAiMediaService'
import { ChatContext } from '../context/ChatContext'

type GameMediasProps = {
  message: IChatMessage
}

const GameMedias = ({ message }: GameMediasProps) => {
  const [items, setItems] = useState<any>([])
  const { mediaCollage, currentMedia, mediaWithoutBackground, isMediaGenerating } = message

  const { upscaleAiMediaService, loading } = useUpscaleAiMediaService()
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

  const onRemoveBackground = () => {}

  const handleClick = (item: any) => {
    if (items.includes(item)) {
      // Remove the item from the array
      const updatedItems = items.filter((i: any) => i !== item)
      setItems(updatedItems)
    } else {
      // Push the item into the array
      const updatedItems = items.concat(item)
      setItems(updatedItems)
    }
  }

  return (
    <WrapperSecondary>
      <ImageCollageCard
        src={currentMedia?.url || ''}
        isGenerating={isMediaGenerating || loading}
        onChooseClick={onChoose}
        onRemoveBackground={onRemoveBackground}
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
