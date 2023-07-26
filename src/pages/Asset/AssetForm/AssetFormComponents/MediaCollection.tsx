import React from 'react'
import Close from '@l3-lib/ui-core/dist/icons/Close'
import styled, { css } from 'styled-components'
import Icon from '@l3-lib/ui-core/dist/Icon'

type MediaCollectionProps = {
  medias: any[] // Replace with the appropriate type for your media data
  bgImage: string
  setBgImage: (url: string) => void
  setSelectedPhotoIndex: (index: number) => void
  handleDeletePhoto: (url: string) => void
  selectedPhotoIndex: number
}

const MediaCollection: React.FC<MediaCollectionProps> = ({
  medias,
  bgImage,
  setBgImage,
  setSelectedPhotoIndex,
  handleDeletePhoto,
  selectedPhotoIndex,
}) => {
  return (
    <StyledCollectionScrollWrapper>
      <StyledCollectionScroll>
        {medias?.map((media: any, index: number) => (
          <StyledMedia
            key={index}
            backgroundImage={media.url}
            onClick={() => {
              setBgImage(media.url)
              setSelectedPhotoIndex(index)
            }}
            selected={bgImage === media.url}
          >
            {selectedPhotoIndex === index && (
              <DeleteButtonContainer>
                <StyledIcon
                  onClick={() => {
                    handleDeletePhoto(media.url)
                    setSelectedPhotoIndex(-1)
                  }}
                  iconSize={20}
                  icon={Close}
                />
              </DeleteButtonContainer>
            )}
          </StyledMedia>
        ))}
      </StyledCollectionScroll>
    </StyledCollectionScrollWrapper>
  )
}

const StyledCollectionScrollWrapper = styled.div`
  width: 240px;
  height: 48px;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
  padding: 4px 6px;

  &::-webkit-scrollbar {
    width: 0;
    background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
  }
  scrollbar-width: none;
`

const StyledCollectionScroll = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`

const StyledMedia = styled.div<{ selected: boolean; backgroundImage: string }>`
  min-width: 38px;
  width: 38px;
  height: 38px;
  border-radius: 6px;
  border: 2px solid transparent;
  background-image: ${props => `url(${props.backgroundImage})`};
  background-size: cover;
  background-position: center;
  position: relative;

  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      border: 1px solid #73fafd;
    `};
`

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }

  ${StyledMedia}:hover & {
    opacity: 1;
    outline: none;
  }
`

const StyledIcon = styled(Icon)`
  outline: none;
`

export default MediaCollection
