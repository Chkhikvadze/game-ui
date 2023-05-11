import ReactDOM from 'react-dom'
import styled from 'styled-components'

type FullScreenModalProps = {
  children: any
  background_color?: string
  dark_layer?: boolean
}

const FullScreenModal = ({ children, dark_layer, ...rest }: FullScreenModalProps) => {
  return ReactDOM.createPortal(
    <StyledContainer {...rest}>
      <StyledLayer dark_layer={dark_layer}>{children}</StyledLayer>
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

const StyledLayer = styled.div<{ dark_layer?: boolean }>`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);
  overflow: auto;
  width: 100%;
  min-height: 100vh;
  ${({ dark_layer }) =>
    dark_layer &&
    `
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 1.93289px 5.79866px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(96.6443px);
  `}
`

export default FullScreenModal
