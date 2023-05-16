import styled from 'styled-components'
import MarkedIconOutlineSvg from '../assets/MarkedIconOutlineSvg'

const ImageCard = ({ src, isSelected, ...props }: any) => {
  return (
    <StyledImageContainer isSelected={isSelected} {...props}>
      <img src={src} alt='media' />
      {isSelected && (
        <StyledSvgContainer>
          <MarkedIconOutlineSvg />
        </StyledSvgContainer>
      )}
    </StyledImageContainer>
  )
}

export default ImageCard

const StyledImageContainer = styled.div<{ isSelected?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  box-shadow: 0px 3.52941px 10.5882px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(176.471px);
  border-radius: 10px;
  overflow: hidden;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }

  ${({ isSelected }) =>
    !isSelected &&
    `
    border: 2px solid rgba(255, 255, 255, 0.3);
  
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

const StyledSvgContainer = styled.div`
  position: absolute;
  right: 7px;
  top: 8px;
`
