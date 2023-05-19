import styled, { css } from 'styled-components'
import MarkedIconOutlineSvg from '../assets/MarkedIconOutlineSvg'
import { useState } from 'react'
import Button from '@l3-lib/ui-core/dist/Button'
import loadingStarSvg from '../assets/loading_star.svg'
import reloadIconSvg from '../assets/reload_icon.svg'

type ImageCollageCardProps = {
  src: string
  isSelected?: boolean
  isGenerating?: boolean
  onChooseClick?: (button: string) => void
  onRemoveBackground?: () => void
  type?: 'collage' | 'image' | 'imageWithoutBackground'
  // type: 'collage' | 'image' | 'imageWithoutBackground'
}

const ImageCollageCard = ({
  src,
  isSelected = false,
  isGenerating,
  onChooseClick,
  onRemoveBackground,
  type,
  ...props
}: ImageCollageCardProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isReload, setReload] = useState(false)

  const handleImageLoad = () => {
    setIsLoading(true)
  }

  const onReloadClick = (e: any) => {
    e.stopPropagation()

    setReload(true)
    setTimeout(() => {
      setReload(false)
    }, 2000)
  }

  return (
    <StyledWrapper>
      <StyledImageContainer isSelected={isSelected} {...props}>
        <StyledMainImage
          src={src}
          alt='media'
          onLoad={handleImageLoad}
          isLoading={isGenerating || !isLoading || isReload}
        />
        {isSelected && (
          <StyledSvgContainer>
            <MarkedIconOutlineSvg />
          </StyledSvgContainer>
        )}

        {!isLoading && (
          <StyledGeneratingContainer>
            <img src={loadingStarSvg} alt='' />
            <p>In progress</p>
          </StyledGeneratingContainer>
        )}

        {(isReload || isGenerating) && (
          <StyledGeneratingContainer>
            <img src={loadingStarSvg} alt='' />
            <p>Generating</p>
          </StyledGeneratingContainer>
        )}

        <StyledHoverContainer onClick={onReloadClick}>
          <img src={reloadIconSvg} alt='' />
        </StyledHoverContainer>
      </StyledImageContainer>

      <StyledButtons>
        {type === 'collage' && onChooseClick && (
          <>
            <Button onClick={() => onChooseClick('U1')}>1</Button>
            <Button onClick={() => onChooseClick('U2')}>2</Button>
            <Button onClick={() => onChooseClick('U3')}>3</Button>
            <Button onClick={() => onChooseClick('U4')}>4</Button>
          </>
        )}

        {type === 'image' && onRemoveBackground && (
          <Button onClick={onRemoveBackground}>Remove Background</Button>
        )}

        {type === 'imageWithoutBackground' && <Button>See Original</Button>}
      </StyledButtons>
    </StyledWrapper>
  )
}

export default ImageCollageCard

const StyledWrapper = styled.div`
  width: 100%;
  object-fit: contain;
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
  height: 100%;
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
