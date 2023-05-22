import { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import MarkedIconOutlineSvg from '../assets/MarkedIconOutlineSvg'
import { saveAs } from 'file-saver'
import Button from '@l3-lib/ui-core/dist/Button'
// import AddIcon from '@l3-lib/ui-core/dist/icons/Add'
import DoneIcon from '@l3-lib/ui-core/dist/icons/Done'
import loadingStarSvg from '../assets/loading_star.svg'
import reloadIconSvg from '../assets/reload_icon.svg'

type ImageCollageCardProps = {
  src: string
  isSelected?: boolean
  isGenerating?: boolean
  onChooseClick?: (button: string) => void
  onRemoveBackground?: () => void
  onSeeOriginal?: () => void
  type?: 'collage' | 'image' | 'imageWithoutBackground'
}

const ImageCollageCard = ({
  src,
  isSelected = false,
  isGenerating,
  onChooseClick,
  onRemoveBackground,
  onSeeOriginal,
  type,
  ...props
}: ImageCollageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReload, setReload] = useState(false)

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const onReloadClick = (e: any) => {
    e.stopPropagation()

    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000)
  }

  const handleDownload = () => {
    saveAs(src)
  }

  const isLoading = isGenerating || !isLoaded || isReload

  return (
    <StyledWrapper>
      <StyledImageContainer isSelected={isSelected} {...props}>
        <StyledMainImage
          src={src}
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

        <StyledHoverContainer onClick={onReloadClick}>
          <img src={reloadIconSvg} alt='' />
        </StyledHoverContainer>

        {type === 'collage' && onChooseClick && !isGenerating && isLoaded && (
          <div>
            <StyledUpscaleButton onClick={() => onChooseClick('U1')}>1</StyledUpscaleButton>
            <StyledUpscaleButton onClick={() => onChooseClick('U2')}>2</StyledUpscaleButton>
            <StyledUpscaleButton onClick={() => onChooseClick('U3')}>3</StyledUpscaleButton>
            <StyledUpscaleButton onClick={() => onChooseClick('U4')}>4</StyledUpscaleButton>
          </div>
        )}
      </StyledImageContainer>

      {!isGenerating && (
        <StyledButtons>
          {type === 'image' && onRemoveBackground && (
            <Button onClick={onRemoveBackground}>Remove Background</Button>
          )}

          {type === 'imageWithoutBackground' && onSeeOriginal && (
            <Button onClick={onSeeOriginal}>See Original</Button>
          )}

          <Button onClick={handleDownload}>Download</Button>
        </StyledButtons>
      )}
    </StyledWrapper>
  )
}

export default ImageCollageCard

const StyledWrapper = styled.div`
  width: 100%;
  /* height: 100%; */
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

const StyledImageContainer = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`

const StyledUpscaleButton = styled(MarkedIconOutlineSvg)`
  position: absolute;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  cursor: pointer;
  width: 24px;
  height: 24px;

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
