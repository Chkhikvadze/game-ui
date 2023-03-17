import styled from 'styled-components'

import Card from '@l3-lib/ui-core/dist/Card'
import { StyledCardWrapper } from './CollectionForm'

type CollectionCardProps = {
  title: string
  onClick: () => void
  onChange: (e: unknown) => void
  image: string
  description?: string
  inputRef: any
  defaultImage: string
  small?: boolean
}

const CollectionCard = ({
  title,
  onClick,
  image,
  description,
  inputRef,
  onChange,
  defaultImage,
  small,
}: CollectionCardProps) => {
  return (
    <StyledCardWrapper small={small}>
      <Card
        title={title}
        description={description}
        onButtonClick={onClick}
        image={image}
        defaultImage={defaultImage}
        hasButton={true}
        textColor='rgba(255, 255, 255, 0.6)'
      />
      <input type='file' ref={inputRef} style={{ display: 'none' }} onChange={onChange} />
    </StyledCardWrapper>
  )
}

export default CollectionCard
