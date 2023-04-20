/* eslint-disable jsx-a11y/media-has-caption */
import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'

import { isImage, isVideo } from 'helpers/detectMedia'

const ScrollableMediaUpload = ({ media_array, loading, onSetDefaultImage }: any) => {
  return (
    <StyledCollectionScroll>
      {media_array?.map((item: any) => {
        const isMainMedia = item.is_main

        return (
          <>
            {isImage(item.url) && (
              <StyledImageWrapper key={item.id} isMain={isMainMedia}>
                <StyledImage src={item.url} alt={item.url} loading='lazy' />
                {item.id && (
                  <>
                    {isMainMedia ? (
                      <StyledHoverOverlay isMain={isMainMedia}>
                        <StyledMainImgContainer isMain={isMainMedia}>
                          <StyledImgInfoText>Main background</StyledImgInfoText>
                          <StyledImgInfoText>Size 480 * 320</StyledImgInfoText>
                        </StyledMainImgContainer>
                      </StyledHoverOverlay>
                    ) : (
                      <StyledHoverOverlay>
                        <StyledMainImgContainer
                          onClick={() => onSetDefaultImage(item.id)}
                          isMain={isMainMedia}
                        >
                          <StyledImgInfoText>Set as main</StyledImgInfoText>
                          <StyledImgInfoText>Size 480 * 320</StyledImgInfoText>
                        </StyledMainImgContainer>
                      </StyledHoverOverlay>
                    )}
                  </>
                )}
              </StyledImageWrapper>
            )}
            {isVideo(item.url) && (
              <StyledWrapper>
                <video src={item.url} width='100%' height='100%' controls></video>
              </StyledWrapper>
            )}
          </>
        )
      })}

      {loading && <StyledLoadingContainer className='loading'>Loading...</StyledLoadingContainer>}
    </StyledCollectionScroll>
  )
}

export default ScrollableMediaUpload

const StyledCollectionScroll = styled(ScrollContainer)`
  display: flex;
  gap: 16px;
  position: relative;
`

const StyledHoverOverlay = styled.div<{ isMain?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  ${({ isMain }) =>
    isMain &&
    `
    background: rgba(255, 255, 255, 0.1);
    // mix-blend-mode: lighten;
`}
`

export const StyledMainImgContainer = styled.div<{ isMain?: boolean }>`
  width: 100%;
  position: absolute;
  height: auto;
  bottom: 0;
  display: grid;
  align-items: center;
  justify-content: start;
  padding: 16px 24px 20px 24px;
  border-radius: 0px 0px 8px 8px;
  display: grid;
  visibility: ${p => (p.isMain ? 'visible' : 'hidden')};

  ${({ isMain }) =>
    isMain &&
    `
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  `}
`

export const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  width: 480px;
  height: 325px;

  min-width: 480px;
  min-height: 325px;

  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`

export const StyledImageWrapper = styled(StyledWrapper)<{ isMain?: boolean }>`
  ${({ isMain }) =>
    !isMain &&
    `
  &:hover ${StyledMainImgContainer} {
    visibility: visible;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
  }

  &:hover ${StyledHoverOverlay} {
    background: rgba(255, 255, 255, 0.2);
    mix-blend-mode: unset;
  }
  `}
`

const StyledImgInfoText = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
`

export const StyledLoadingContainer = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  width: 100%;
  height: 100%;
  color: rgb(255, 255, 255);
  text-align: center;
  display: grid;
  align-items: center;
`
