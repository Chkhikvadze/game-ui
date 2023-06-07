import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

type ModalProps = {
  children: any
  hideZIndex?: boolean
  secondaryBg?: boolean
  dark_layer?: boolean
  isTransparent?: boolean
}

const Modal = ({
  children,
  hideZIndex,
  isTransparent,
  secondaryBg,
  dark_layer,
  ...rest
}: ModalProps) => {
  React.useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden;')

    return () => document.body.setAttribute('style', 'overflow: auto;')
  }, [])

  return ReactDOM.createPortal(
    <StyledContainer hideZIndex={hideZIndex} transparent={isTransparent} {...rest}>
      <StyledLayer secondaryBg={secondaryBg} dark_layer={dark_layer}>
        {children}
      </StyledLayer>
    </StyledContainer>,
    document.body,
  )
}

const StyledContainer = styled.div<{ hideZIndex?: boolean; transparent?: boolean }>`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: ${p => (p.hideZIndex ? 0 : 10203041)};

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  ${props =>
    !props.transparent &&
    css`
      background-image: url(${p => p.theme.body.backgroundImageSecondary});
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    `}
`

const StyledLayer = styled.div<{
  secondaryBg?: boolean
  dark_layer?: boolean
}>`
  position: relative;
  z-index: 101;

  max-width: 100%;
  width: 100%;
  /* border: 1px solid #dee2e6; */
  border-radius: 4px;
  max-height: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto auto;
  padding: 0;
  overflow: auto;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(100px);
  -webkit-backdrop-filter: blur(100px);

  background: ${p =>
    p.secondaryBg && 'radial-gradient(107.39% 52.7% at 50% 50%, #3e4ea9 0%, #111b52 100%)'};

  ${({ dark_layer }) =>
    dark_layer &&
    `
  background: rgba(0, 0, 0, 0.7);
  box-shadow: 0px 1.93289px 5.79866px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(96.6443px);
  `}
`

export default Modal
