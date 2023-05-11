type ImageProps = {
  url: string
}

const Image = ({ url }: ImageProps) => {
  return (
    <div className='message__wrapper'>
      <img className='message__img' src={url} alt='dalle generated' loading='lazy' />
    </div>
  )
}

export default Image
