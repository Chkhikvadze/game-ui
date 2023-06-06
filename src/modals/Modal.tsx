import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

type ModalProps = {
  children: any
  close?: () => void
  hideZIndex?: boolean
  modalWidth?: string
  backgroundColor?: string
  fullscreen?: boolean
}

const Modal = ({
  children,
  close,
  hideZIndex,
  modalWidth,
  backgroundColor,
  fullscreen,
  ...rest
}: ModalProps) => {
  React.useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden;')

    return () => document.body.setAttribute('style', 'overflow: auto;')
  }, [])

  return ReactDOM.createPortal(
    <StyledContainer hideZIndex={hideZIndex} {...rest}>
      <StyledOverlay onClick={close} />

      <StyledContentContainer
        modalWidth={modalWidth}
        backgroundColor={backgroundColor}
        fullscreen={fullscreen}
      >
        <StyledModalBodyContainer fullscreen={fullscreen}>{children}</StyledModalBodyContainer>
      </StyledContentContainer>
    </StyledContainer>,
    document.body,
  )
}

const StyledContainer = styled.div<{ hideZIndex?: boolean }>`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0px;
  left: 0px;
  z-index: ${p => (p.hideZIndex ? 0 : 10203041)};
`

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledModalBodyContainer = styled.div<{ fullscreen?: boolean }>`
  padding: ${p => (p.fullscreen ? '0' : '1.5rem 1.85rem')};

  overflow: visible;
`

const StyledContentContainer = styled.div<{
  modalWidth?: string
  backgroundColor?: string
  fullscreen?: boolean
}>`
  position: relative;
  z-index: 101;
  background: ${p => (p.backgroundColor ? p.backgroundColor : 'white')};
  max-width: ${p => (p.modalWidth ? p.modalWidth : '700px')};
  width: ${p => p.fullscreen && '100%'};
  /* border: 1px solid #dee2e6; */
  border-radius: 4px;
  max-height: 100%;
  height: ${p => p.fullscreen && '100%'};
  display: grid;
  grid-template-rows: 1fr auto auto;
  padding: ${p => (p.fullscreen ? '0' : '0 15px')};
  overflow: auto;
`

export default Modal
