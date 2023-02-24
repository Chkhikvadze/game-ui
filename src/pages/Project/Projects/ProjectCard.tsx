import Button from '@l3-lib/ui-core/dist/Button'
import CloseOutline from '@l3-lib/ui-core/dist/icons/CloseOutline'
import NavigationChevronUp from '@l3-lib/ui-core/dist/icons/NavigationChevronUp'
import PlayOutline from '@l3-lib/ui-core/dist/icons/PlayOutline'
import PauseOutline from '@l3-lib/ui-core/dist/icons/PauseOutline'
import Typography from '@l3-lib/ui-core/dist/Typography'
import styled from 'styled-components'
import Avatar from '@l3-lib/ui-core/dist/Avatar'
import IconButton from '@l3-lib/ui-core/dist/IconButton'
import { useRef, useState } from 'react'
import moment from 'moment'

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
    <StyledRoot>
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
            {players?.length && (
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography
                  value={`${players?.length} Players`}
                  type={Typography.types.LABEL}
                  size={Typography.sizes.sm}
                  customColor='#fff'
                />
                <div style={{ display: 'flex', gap: '0' }}>
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
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <Typography
                value={collection && `${collection.length} Collection`}
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
            </div>

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

const StyledRoot = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;
  justify-content: flex-end;

  height: 300px;
  width: 260px;

  border-radius: 16px;
`

const StyledImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  overflow: hidden;

  cursor: pointer;
`

const StyledPlayButtonWrapper = styled.div`
  position: absolute;
  z-index: 100;
  bottom: 80%;
  left: 5%;
`
const StyledVideo = styled.video<{ showDetails?: any }>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;

  border-radius: ${p => (p.showDetails ? '16px' : '16px 16px 0px 0px')};
`

const StyledImage = styled.img<{ showDetails?: any }>`
  /* object-fit: cover; */
  width: 100%;
  height: 100%;
  border-radius: ${p => (p.showDetails ? '16px' : '16px 16px 0px 0px')};
`

const StyledNoContent = styled.div`
  background: linear-gradient(175.64deg, rgba(0, 0, 0, 0) 3.54%, #000000 96.46%);
  position: absolute;

  height: 33%;
  width: 100%;
`

const StyledContentDiv = styled.div<{ showDetails?: any }>`
  display: flex;
  flex-direction: ${p => (p.showDetails ? 'column' : 'row')};
  justify-content: ${p => (p.showDetails ? 'flex-start' : 'center')};
  align-items: center;
  /* padding: 0px 12px 0px 6px; */
  gap: 10px;

  padding: ${p => (p.showDetails ? '12px' : '0px 12px 8px 12px')};

  width: 100%;

  position: ${p => (p.showDetails ? 'absolute' : 'auto')};
  height: ${p => (p.showDetails ? '100%' : 'fit-content')};
  /* height: fit-content; */
  background: ${p =>
    p.showDetails
      ? 'rgba(0, 0, 0, 0.7)'
      : 'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.4) 100%)'};
  box-shadow: ${p => (p.showDetails ? '0px 2px 6px rgba(0, 0, 0, 0.15)' : 'auto')};
  backdrop-filter: ${p => (p.showDetails ? 'blur(100px)' : 'blur(50px)')};
  border-radius: ${p => (p.showDetails ? '16px' : '0px 0px 16px 16px')};

  overflow: ${p => (p.showDetails ? 'scroll' : 'unset')};
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledDetailWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledTextWrapper = styled.div<{ showDetails?: any }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: ${p => (p.showDetails ? 'center' : 'flex-start')};
  overflow: ${p => (p.showDetails ? 'none' : 'hidden')};
`

const StyledButtonWrapper = styled.div<{ showDetails?: any }>`
  position: ${p => (p.showDetails ? 'absolute' : 'auto')};
  align-self: flex-end;
`
const StyledAvatarWrapper = styled.div<{ showDetails?: any }>`
  margin-top: ${p => p.showDetails && '20px'};
  width: fit-content;
  margin-bottom: 8px;
`
const StyledCollectionWrapper = styled.div`
  display: flex;
  gap: 6px;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledCollectionImg = styled.img`
  width: 96px;
  height: 96px;
`
