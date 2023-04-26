import Button from '@l3-lib/ui-core/dist/Button'
import CloseOutline from '@l3-lib/ui-core/dist/icons/CloseOutline'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import PauseOutline from '@l3-lib/ui-core/dist/icons/PauseOutline'
import Typography from '@l3-lib/ui-core/dist/Typography'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { ReactNode, useEffect, useRef, useState } from 'react'

import {
  StyledAvatarWrapper,
  StyledButtonWrapper,
  StyledContentDiv,
  StyledImage,
  StyledImageWrapper,
  StyledNoContent,
  StyledRoot,
  StyledVideo,
} from './GameCardStyles'
import styled from 'styled-components'
import TitleComponent from './CardComponents/TitleComponent'

interface GameCardProps {
  onButtonClick?: (event: unknown) => void
  onImageClick?: (event: unknown) => void
  defaultImage?: string
  defaultLogo?: string
  video?: any
  itemInfo: {
    title: string
    description?: string
    subTitle?: string
    logo?: string
    image?: string
    created?: Date
  }
  details?: ReactNode
  topRightIcon?: ReactNode
  topLeftIcon?: ReactNode
  cardFooter?: ReactNode
  hideButton?: boolean
  outline?: string
  size?: 'large' | 'medium' | 'small'
}

const GameCard = ({
  onButtonClick,
  onImageClick,
  defaultImage,
  defaultLogo,
  video,
  itemInfo,
  details,
  topLeftIcon,
  topRightIcon,
  cardFooter,
  hideButton,
  outline,
  size = 'large',
}: GameCardProps) => {
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

  return (
    <StyledRoot ref={outsideClickRef} outline={outline} size={size}>
      <StyledCardHeader>
        {/* <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}> */}
        {topLeftIcon}

        {showDetails && (
          <StyledIconButtonWrapper>
            <IconButton
              size={IconButton.sizes.SMALL}
              kind={Button.kinds.TERTIARY}
              icon={CloseOutline}
              onClick={(event: unknown) => handleShowDetail(event)}
            />
          </StyledIconButtonWrapper>
        )}
        {!showDetails && <StyledTopRightWrapper>{topRightIcon}</StyledTopRightWrapper>}
        {/* </div> */}
      </StyledCardHeader>

      {video && !showDetails && (
        <StyledVideoButton center={topLeftIcon ? true : false}>
          <IconButton
            onClick={() => handleVideoPress()}
            icon={playVideo ? PauseOutline : PlayOutline}
            size={IconButton.sizes.SMALL}
            kind={Button.kinds.PRIMARY}
          />
        </StyledVideoButton>
      )}
      <StyledImageWrapper showDetails={showDetails}>
        <StyledImage
          src={itemInfo.image ? itemInfo.image : defaultImage}
          alt=''
          showDetails={showDetails}
          onClick={onImageClick}
          loading='lazy'
        />
        {playVideo && (
          <StyledVideo ref={videoRef} showDetails={showDetails} loop>
            <source src={video} type='video/mp4' />
          </StyledVideo>
        )}
        {!showDetails && <StyledNoContent onClick={onImageClick} />}
      </StyledImageWrapper>

      {!showDetails && (
        <StyledFooter>
          {cardFooter}

          {!hideButton && (
            <StyledButtonWrapper>
              <IconButton
                size={IconButton.sizes.SMALL}
                kind={Button.kinds.TERTIARY}
                icon={NavigationChevronUp}
                onClick={(event: unknown) => handleShowDetail(event)}
              />
            </StyledButtonWrapper>
          )}
        </StyledFooter>
      )}

      {showDetails && (
        <StyledContentDiv>
          <>
            <StyledAvatarWrapper>
              <Avatar
                size={Avatar.sizes.SMALL}
                src={itemInfo.logo ? itemInfo.logo : defaultLogo}
                type={Avatar.types.IMG}
                rectangle
              />
            </StyledAvatarWrapper>

            <TitleComponent
              showDetails={showDetails}
              title={itemInfo.title}
              created={itemInfo.created}
              subTitle={itemInfo.subTitle}
            />

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
        </StyledContentDiv>
      )}
    </StyledRoot>
  )
}

export default GameCard

const StyledCardHeader = styled.div`
  position: absolute;
  width: 100%;
  min-height: 50px;
  bottom: 80%;

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
const StyledFooter = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding: 0px 12px 8px 12px;
  padding-bottom: 14px;

  width: 100%;
  height: fit-content;

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%);
  backdrop-filter: blur(50px);
  border-radius: 0px 0px 16px 16px;
`
const StyledIconButtonWrapper = styled.div`
  margin-left: auto;
`
const StyledTopRightWrapper = styled.div`
  margin-left: auto;
`
