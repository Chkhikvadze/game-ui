import styled from 'styled-components'

const ImageCard = ({ src }: any) => {
  return (
    <StyledImageContainer>
      <img src={src} alt='media' />
    </StyledImageContainer>
  )
}

export default ImageCard

const StyledImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
  }
`
