import styled, { css } from 'styled-components'

export const StyledRoot = styled.div<{ outline?: string; size?: string }>`
  position: relative;
  display: flex;

  flex-direction: column;
  justify-content: flex-end;

  height: 300px;
  width: 481px;
  min-width: 481px;

  border-radius: 16px;

  /* outline: ${p => p.outline === 'normal' && '4px solid #73fafd'};
  outline: ${p => p.outline === 'warning' && '4px solid #FDFE53'}; */
  box-shadow: ${p => p.outline === 'normal' && '0 0 0 4px #73fafd'};
  box-shadow: ${p => p.outline === 'warning' && '0 0 0 4px #FDFE53'};

  ${p =>
    p.size === 'medium' &&
    css`
      width: 320px;
      min-width: 320px;
    `};
  ${p =>
    p.size === 'small' &&
    css`
      width: 260px;
      min-width: 260px;
    `};
`

export const StyledImageWrapper = styled.div<{ showDetails: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;
  overflow: hidden;

  cursor: ${p => !p.showDetails && 'pointer'};
`

export const StyledPlayButtonWrapper = styled.div`
  position: absolute;
  z-index: 101;
  bottom: 80%;
  /* left: 5%; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
`
export const StyledVideo = styled.video<{ showDetails: boolean }>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;

  border-radius: ${p => (p.showDetails ? '16px' : '16px 16px 0px 0px')};
`

export const StyledImage = styled.img<{ showDetails?: boolean }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: ${p => (p.showDetails ? '16px' : '16px 16px 0px 0px')};
`

export const StyledNoContent = styled.div`
  background: linear-gradient(175.64deg, rgba(0, 0, 0, 0) 3.54%, #000000 96.46%);
  position: absolute;

  height: 33%;
  width: 100%;
`

export const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  gap: 10px;

  padding: 12px 40px;

  width: 100%;

  position: absolute;
  height: 100%;

  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  border-radius: 16px;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const StyledDetailWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const StyledPlayerSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const StyledPlayerAvatarWrapper = styled.div`
  display: flex;
  gap: 0;
`
export const StyledCollectionSection = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const StyledTextWrapper = styled.div<{ showDetails: boolean }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: ${p => (p.showDetails ? 'center' : 'flex-start')};
  overflow: ${p => (p.showDetails ? 'none' : 'hidden')};
`

export const StyledButtonWrapper = styled.div`
  align-self: flex-end;
`
export const StyledAvatarWrapper = styled.div`
  margin-top: 20px;
  width: fit-content;
`
export const StyledCollectionWrapper = styled.div`
  display: flex;
  gap: 6px;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const StyledCollectionImg = styled.img`
  width: 96px;
  height: 96px;
`
