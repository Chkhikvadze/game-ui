import { useContext } from 'react'
import { IChatMessage, IMedia } from '../types'
import { ChatContext } from '../context/ChatContext'
import WrapperSecondary from './WrapperSecondary'
import MediaCard from './MediaCard/MediaCard'

type MediaProps = {
  message: IChatMessage
}

const Media = ({ message }: MediaProps) => {
  const { media } = message
  const { updateMessage } = useContext(ChatContext)

  const updateMedia = (newMedia: IMedia) => {
    updateMessage({
      ...message,
      media: newMedia,
    })
  }

  return (
    <WrapperSecondary>
      {media && <MediaCard media={media} updateMedia={updateMedia} />}
    </WrapperSecondary>
  )
}

export default Media
