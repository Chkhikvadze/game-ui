import ReactDOM from 'react-dom'
import styled from 'styled-components'

type FullScreenModalProps = {
  children: any
  background_color?: string
}

const FullScreenModal = ({ children, ...rest }: FullScreenModalProps) => {
  return ReactDOM.createPortal(
    <StyledContainer {...rest}>
      <StyledLayer>{children}</StyledLayer>
    </StyledContainer>,
    document.body,
  )
}

const StyledContainer = styled.div<{ hideZIndex?: boolean }>`
  height: 100vh;
  width: 100%;
  overflow: auto;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 0;
  z-index: 10203040;
  background-image: url(${p => p.theme.body.backgroundImageSecondary});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`

const StyledLayer = styled.div`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  overflow: auto;
  width: 100%;
  min-height: 100vh;
`

export default FullScreenModal
