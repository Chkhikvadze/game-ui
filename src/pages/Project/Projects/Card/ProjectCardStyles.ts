import styled from 'styled-components'

export const StyledRoot = styled.div`
  position: relative;
  display: flex;

  flex-direction: column;
  justify-content: flex-end;

  height: 300px;
  width: 260px;
  min-width: 260px;

  border-radius: 16px;
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

export const StyledContentDiv = styled.div<{ showDetails: boolean }>`
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

export const StyledButtonWrapper = styled.div<{ showDetails: boolean }>`
  /* position: ${p => (p.showDetails ? 'absolute' : 'auto')}; */
  display: ${p => p.showDetails && 'none'};
  align-self: flex-end;

  z-index: 102;
`
export const StyledAvatarWrapper = styled.div<{ showDetails: boolean }>`
  margin-top: ${p => p.showDetails && '20px'};
  width: fit-content;
  margin-bottom: 8px;
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
