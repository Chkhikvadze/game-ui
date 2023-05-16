import styled from 'styled-components'
import MarkedIconOutlineSvg from '../assets/MarkedIconOutlineSvg'
import { useState } from 'react'
import loadingStarSvg from '../assets/loading_star.svg'
import reloadIconSvg from '../assets/reload_icon.svg'

const ImageCard = ({ src, isSelected, ...props }: any) => {
  const [isLoading, setIsLoading] = useState(false)

  const [isReload, setReload] = useState(false)
  console.log('🚀 ~ isReload:', isReload)

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
    <StyledImageContainer isSelected={isSelected} {...props}>
      <StyledMainImage
        src={src}
        alt='media'
        onLoad={handleImageLoad}
        isLoading={!isLoading || isReload}
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

      {isReload && (
        <StyledGeneratingContainer>
          <img src={loadingStarSvg} alt='' />
          <p>Generating</p>
        </StyledGeneratingContainer>
      )}

      <StyledHoverContainer onClick={onReloadClick}>
        <img src={reloadIconSvg} alt='' />
      </StyledHoverContainer>
    </StyledImageContainer>
  )
}

export default ImageCard

const StyledMainImage = styled.img<{ isLoading?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
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
    `
    border: 2px solid rgba(255, 255, 255, 0.3);
    :hover{
      ${StyledHoverContainer}{
        display: block;
      }
    }
  
  `}

  ${({ isSelected }) =>
    isSelected &&
    `



  
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
