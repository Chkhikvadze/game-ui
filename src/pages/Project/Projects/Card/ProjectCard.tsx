import Button from '@l3-lib/ui-core/dist/Button'
import CloseOutline from '@l3-lib/ui-core/dist/icons/CloseOutline'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import PauseOutline from '@l3-lib/ui-core/dist/icons/PauseOutline'
import Etherscan from '@l3-lib/ui-core/dist/icons/Etherscan'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'

// import ScrollContainer from 'react-indiana-drag-scroll'

import {
  StyledAvatarWrapper,
  StyledButtonWrapper,
  StyledContentDiv,
  StyledImage,
  StyledImageWrapper,
  StyledNoContent,
  StyledRoot,
  StyledTextWrapper,
  StyledVideo,
} from './ProjectCardStyles'
import styled from 'styled-components'

interface ProjectCardProps {
  onButtonClick?: (event: unknown) => void
  onImageClick?: (event: unknown) => void
  defaultImage?: string
  defaultLogo?: string
  video?: string
  itemInfo: {
    title?: string
    description?: string
    subTitle?: string
    logo?: string
    image?: string
    created?: Date
  }
  details?: any
  blockchain?: string
  minPrice?: number
}

const ProjectCard = ({
  onButtonClick,
  onImageClick,
  defaultImage,
  defaultLogo,
  video,
  itemInfo,
  details,
  blockchain,
  minPrice,
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
            : itemInfo.subTitle
        }
        type={Typography.types.LABEL}
        size={Typography.sizes.xss}
        customColor='rgba(255, 255, 255, 0.8)'
      />
    </StyledTextWrapper>
  )

  const renderImageElement = (
    <StyledImageWrapper showDetails={showDetails}>
      <StyledImage
        src={itemInfo.image ? itemInfo.image : defaultImage}
        alt=''
        showDetails={showDetails}
        onClick={onImageClick}
      />
      {playVideo && (
        <StyledVideo ref={videoRef} showDetails={showDetails} loop>
          <source src={video} type='video/mp4' />
        </StyledVideo>
      )}
      {!showDetails && <StyledNoContent onClick={onImageClick} />}
    </StyledImageWrapper>
  )

  return (
    <StyledRoot ref={outsideClickRef}>
      <StyledCardHeader>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          {blockchain && (
            <IconButton
              icon={() => <Etherscan />}
              size={IconButton.sizes.SMALL}
              kind={Button.kinds.PRIMARY}
            />
          )}

          {showDetails && (
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                size={IconButton.sizes.SMALL}
                kind={Button.kinds.TERTIARY}
                icon={CloseOutline}
                onClick={(event: unknown) => handleShowDetail(event)}
              />
            </div>
          )}
          {minPrice && !showDetails && (
            <StyledValues primary>
              <Typography
                value={minPrice}
                type={Typography.types.LABEL}
                size={Typography.sizes.LARGE}
              />
            </StyledValues>
          )}
        </div>
      </StyledCardHeader>

      {video && !showDetails && (
        <StyledVideoButton center={blockchain ? true : false}>
          <IconButton
            onClick={() => handleVideoPress()}
            icon={playVideo ? PauseOutline : PlayOutline}
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.PRIMARY}
          />
        </StyledVideoButton>
      )}

      {renderImageElement}

      <StyledContentDiv showDetails={showDetails}>
        {!showDetails && renderTitleTextElement}

        <StyledButtonWrapper showDetails={showDetails}>
          <IconButton
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.TERTIARY}
            icon={showDetails ? CloseOutline : NavigationChevronUp}
            onClick={(event: unknown) => handleShowDetail(event)}
          />
        </StyledButtonWrapper>

        {showDetails && (
          <>
            <StyledAvatarWrapper showDetails={showDetails}>
              <Avatar
                size={Avatar.sizes.SMALL}
                src={itemInfo.logo ? itemInfo.logo : defaultLogo}
                type={Avatar.types.IMG}
                rectangle
              />
            </StyledAvatarWrapper>

            {renderTitleTextElement}

            {details}

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
          </>
        )}
      </StyledContentDiv>
    </StyledRoot>
  )
}

export default ProjectCard

const StyledValues = styled.div<{ primary: boolean }>`
  background: ${p => (p.primary ? '#000' : '#ffffff33')};
  border-radius: 6px;
  padding: 4px 6px 4px 6px;
  width: 68px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledCardHeader = styled.div`
  position: absolute;
  width: 100%;

  bottom: 85%;

  z-index: 101;

  padding-left: 14px;
  padding-right: 14px;

  display: flex;
  justify-content: space-between;
`
const StyledVideoButton = styled.div<{ center?: boolean }>`
  position: absolute;

  z-index: 101;

  bottom: ${p => (p.center ? '50%' : '85%')};
  left: ${p => (p.center ? '44%' : '5%')};
`