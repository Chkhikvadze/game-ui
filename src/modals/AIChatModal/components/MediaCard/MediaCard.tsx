import { memo, useState } from 'react'
import styled, { css } from 'styled-components'
import { saveAs } from 'file-saver'
import DownloadIcon from '@l3-lib/ui-core/dist/icons/Download'
import SwitchIcon from '@l3-lib/ui-core/dist/icons/Switch'
import { IMedia } from '../../types'
import MarkedIconOutlineSvg from '../../assets/MarkedIconOutlineSvg'
import loadingStarSvg from '../../assets/loading_star.svg'
import reloadIconSvg from '../../assets/reload_icon.svg'
import useMediaCard from './useMediaCard'

type MediaCardProps = {
  media: IMedia
  updateMedia?: (media: IMedia) => void
}

const MediaCard = ({ media, updateMedia }: MediaCardProps) => {
  const isGenerating = false
  const isSelected = false

  const { type, url } = media.current

  const [isLoaded, setIsLoaded] = useState(false)

  const { handleUpscale, handleRemoveBackground, handleSwitchBackgroundMode, loading } =
    useMediaCard({
      media,
      updateMedia,
    })

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const handleDownload = () => {
    saveAs(url)
  }

  const isLoading = loading || isGenerating || !isLoaded

  return (
    <StyledImageContainer isSelected={isSelected}>
      <StyledMainImage
        src={url}
        alt='media'
        onLoadStart={() => setIsLoaded(false)}
        onLoad={handleImageLoad}
        isLoading={isLoading}
      />

      {isSelected && (
        <StyledSvgContainer>
          <MarkedIconOutlineSvg />
        </StyledSvgContainer>
      )}

      {/* {!isLoaded && (
          <StyledGeneratingContainer>
            <img src={loadingStarSvg} alt='' />
            <p>In progress</p>
          </StyledGeneratingContainer>
        )} */}

      {isLoading && (
        <StyledGeneratingContainer>
          <img src={loadingStarSvg} alt='' />
          <p>Generating</p>
        </StyledGeneratingContainer>
      )}

      <StyledHoverContainer>
        {!isLoading && (
          <StyledButtons>
            {type === 'upscaled' && handleRemoveBackground && (
              <StyledButton>
                <StyledSwitchIcon onClick={handleRemoveBackground} />
              </StyledButton>
            )}

            {type === 'upscaledWithoutBackground' && handleSwitchBackgroundMode && (
              <StyledButton>
                <StyledSwitchIcon onClick={handleSwitchBackgroundMode} />
              </StyledButton>
            )}

            <StyledButton>
              <DownloadIcon onClick={handleDownload} />
            </StyledButton>

            <img src={reloadIconSvg} alt='' />
          </StyledButtons>
        )}
      </StyledHoverContainer>

      {type === 'collage' && !isLoading && (
        <div>
          <StyledUpscaleButton onClick={() => handleUpscale('U1')}>1</StyledUpscaleButton>
          <StyledUpscaleButton onClick={() => handleUpscale('U2')}>2</StyledUpscaleButton>
          <StyledUpscaleButton onClick={() => handleUpscale('U3')}>3</StyledUpscaleButton>
          <StyledUpscaleButton onClick={() => handleUpscale('U4')}>4</StyledUpscaleButton>
        </div>
      )}
    </StyledImageContainer>
  )
}

export default memo(MediaCard)

const StyledImageContainer = styled.div<{ isSelected?: boolean }>`
  position: relative;
  max-width: 100%;
  /* height: 100%; */
  object-fit: contain;
  box-shadow: 0px 3.52941px 10.5882px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(176.471px);
  border-radius: 10px;
  overflow: hidden;

  ${({ isSelected }) =>
    !isSelected &&
    css`
      border: 2px solid rgba(255, 255, 255, 0.3);
      :hover {
        ${StyledHoverContainer} {
          display: block;
        }
      }
    `}

  ${({ isSelected }) =>
    isSelected &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 10px;
        padding: 1.5px;
        background: linear-gradient(180deg, #73fafd 0%, #50b1d7 100%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        border: none;
      }
    `}
`

const StyledMainImage = styled.img<{ isLoading?: boolean }>`
  width: 100%;
  height: 100%;
  visibility: ${p => (p.isLoading ? 'hidden' : 'visible')};
`

const StyledSvgContainer = styled.div`
  position: absolute;
  right: 7px;
  top: 8px;
`

const StyledHoverContainer = styled(StyledSvgContainer)`
  display: none;
  cursor: pointer;
`

const StyledGeneratingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.8);
  }
`

const StyledButtons = styled.div`
  display: flex;
  gap: 4px;
`

const StyledButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`

const StyledSwitchIcon = styled(SwitchIcon)`
  width: 16px;
  height: 16px;

  path {
    fill: #fff;
  }
`

const StyledUpscaleButton = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:nth-child(1) {
    top: 8px;
    left: 7px;
  }

  &:nth-child(2) {
    top: 8px;
    left: calc(50% + 7px);
  }

  &:nth-child(3) {
    top: calc(50% + 8px);
    left: 7px;
  }

  &:nth-child(4) {
    top: calc(50% + 8px);
    left: calc(50% + 7px);
  }
`
