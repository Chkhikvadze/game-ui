import Button from '@l3-lib/ui-core/dist/Button'
import CloseOutline from '@l3-lib/ui-core/dist/icons/CloseOutline'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import PauseOutline from '@l3-lib/ui-core/dist/icons/PauseOutline'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'

import {
  StyledAvatarWrapper,
  StyledButtonWrapper,
  StyledCollectionImg,
  StyledCollectionSection,
  StyledCollectionWrapper,
  StyledContentDiv,
  StyledDetailWrapper,
  StyledImage,
  StyledImageWrapper,
  StyledNoContent,
  StyledPlayButtonWrapper,
  StyledPlayerAvatarWrapper,
  StyledPlayerSection,
  StyledRoot,
  StyledTextWrapper,
  StyledVideo,
} from './ProjectCardStyles'

interface ProjectCardProps {
  onButtonClick?: (event: unknown) => void
  onImageClick?: (event: unknown) => void
  defaultImage?: string
  defaultLogo?: string
  collection?: { image: [string]; length: number }
  players?: { image: [string]; length: number }
  video?: string
  itemInfo: {
    title?: string
    description?: string
    category?: string
    logo?: string
    image?: string
    created?: Date
  }
}

const ProjectCard = ({
  onButtonClick,
  onImageClick,
  defaultImage,
  defaultLogo,
  collection,
  players,
  video,
  itemInfo,
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false)
  const [playVideo, setPlayVideo] = useState(false)

  const videoRef = useRef(null as any)
  const outsideClickRef = useRef(null as any)

  const handleVideoPress = async () => {
    if (playVideo) {
      await setPlayVideo(false)
      videoRef.current.pause()
    } else {
      await setPlayVideo(true)
      videoRef.current.play()
    }
  }

  const handleShowDetail = (event: unknown) => {
    setShowDetails(!showDetails)
    if (onButtonClick && !showDetails) {
      onButtonClick(event)
    }
  }

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target) &&
        showDetails
      ) {
        setShowDetails(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [outsideClickRef, showDetails])

  const renderTitleTextElement = (
    <StyledTextWrapper showDetails={showDetails}>
      <Typography
        value={itemInfo.title}
        type={Typography.types.LABEL}
        size={showDetails ? Typography.sizes.md : Typography.sizes.sm}
        customColor='#fff'
      />
      <Typography
        value={
          showDetails
            ? `Created: ${moment(itemInfo.created).format('MMM YYYY')}`
            : itemInfo.category
        }
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )

  const renderImageElement = (
    <StyledImageWrapper>
      <StyledPlayButtonWrapper>
        {video && !showDetails && (
          <IconButton
            onClick={() => handleVideoPress()}
            icon={playVideo ? PauseOutline : PlayOutline}
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.PRIMARY}
          />
        )}
      </StyledPlayButtonWrapper>

      <StyledImage
        onClick={onImageClick}
        src={itemInfo.image ? itemInfo.image : defaultImage}
        alt=''
        showDetails={showDetails}
      />
      {playVideo && (
        <StyledVideo ref={videoRef} showDetails={showDetails} loop>
          <source src={video} type='video/mp4' />
        </StyledVideo>
      )}
      {!showDetails && <StyledNoContent></StyledNoContent>}
    </StyledImageWrapper>
  )

  return (
    <StyledRoot ref={outsideClickRef}>
      {renderImageElement}

      <StyledContentDiv showDetails={showDetails}>
        <StyledAvatarWrapper showDetails={showDetails}>
          <Avatar
            size={Avatar.sizes.SMALL}
            src={itemInfo.logo ? itemInfo.logo : defaultLogo}
            type={Avatar.types.IMG}
            rectangle
          />
        </StyledAvatarWrapper>

        {renderTitleTextElement}

        <StyledButtonWrapper showDetails={showDetails}>
          <IconButton
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.TERTIARY}
            icon={showDetails ? CloseOutline : NavigationChevronUp}
            onClick={(event: unknown) => handleShowDetail(event)}
          />
        </StyledButtonWrapper>

        {showDetails && (
          <StyledDetailWrapper>
            <StyledPlayerSection>
              <Typography
                value={players?.length !== undefined && `${players.length} Players`}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor='#fff'
              />
              <StyledPlayerAvatarWrapper>
                {players?.image &&
                  players.image
                    .slice(0, 4)
                    .map((image: string) => (
                      <Avatar
                        key={image}
                        size={Avatar.sizes.SMALL}
                        src={image}
                        type={Avatar.types.IMG}
                        rectangle
                      />
                    ))}
              </StyledPlayerAvatarWrapper>
            </StyledPlayerSection>

            <StyledCollectionSection>
              <Typography
                value={collection?.length !== undefined && `${collection.length} Collections`}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
                customColor='#fff'
              />
              <StyledCollectionWrapper>
                {collection?.image &&
                  collection.image.map((image: string) => (
                    <StyledCollectionImg key={image} src={image} alt='' />
                  ))}
              </StyledCollectionWrapper>
            </StyledCollectionSection>

            {itemInfo.description && (
              <div>
                <Typography
                  value={'Quick take: '}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor='#fff'
                />
                <Typography
                  value={itemInfo.description}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.xss}
                  customColor='rgba(255, 255, 255, 0.8)'
                />
              </div>
            )}
          </StyledDetailWrapper>
        )}
      </StyledContentDiv>
    </StyledRoot>
  )
}

export default ProjectCard
