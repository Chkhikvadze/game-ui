import { v4 as uuidv4 } from 'uuid'
import { IChatMessage, IMedia, MessageTypeEnum } from '../../types'
import WrapperSecondary from '../WrapperSecondary'
import MediaCard from '../MediaCard/MediaCard'
import { useChatState } from '../../hooks/useChat'

type MediaProps = {
  message: IChatMessage
}

const Media = ({ message }: MediaProps) => {
  const { media, type } = message
  const { updateMessage, setGameMedias } = useChatState()

  const updateMedia = (newMedia: IMedia) => {
    updateMessage(message.id, {
      media: newMedia,
    })

    if (type === MessageTypeEnum.GameMedias) {
      setGameMedias([
        {
          id: uuidv4(),
          url: newMedia.current.url,
          is_main: true,
          format: '',
        },
      ])
    }
  }

  return (
    <WrapperSecondary>
      {media && <MediaCard media={media} updateMedia={updateMedia} />}
    </WrapperSecondary>
  )
}

export default Media
