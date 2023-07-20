import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

type ModalProps = {
  header?: string | React.ReactElement
  footer?: React.ReactElement
  children: any
  bodyClassName?: string
  hideClose?: boolean
  close?: () => void
  hideZIndex?: boolean
  modalWidth?: string
  hideModalOverflow?: boolean
}

const Modal = ({
  header,
  footer,
  children,
  bodyClassName,
  hideClose,
  close,
  hideZIndex,
  modalWidth,
  hideModalOverflow = false,
  ...rest
}: ModalProps) => {
  React.useEffect(() => {
    document.body.setAttribute('style', 'overflow: hidden;')

    return () => document.body.setAttribute('style', 'overflow: auto;')
  }, [])

  const HeaderComponent = React.useMemo(
    () =>
      typeof header !== 'string' ? (
        header
      ) : (
        <StyledHeaderContainer>
          {!hideClose && <StyledCloseIcon onClick={close} alt='' />}
        </StyledHeaderContainer>
      ),
    [close, header, hideClose],
  )

  return ReactDOM.createPortal(
    <StyledContainer hideZIndex={hideZIndex} {...rest} className='add_modal'>
      <StyledOverlay onClick={close} />

      <StyledContentContainer
        variant='wider'
        modalWidth={modalWidth}
        hideModalOverflow={hideModalOverflow}
      >
        {header && HeaderComponent}

        <StyledModalBodyContainer>{children}</StyledModalBodyContainer>

        {footer && <StyledModalFooterContainer>{footer}</StyledModalFooterContainer>}
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
  z-index: ${p => (p.hideZIndex ? 0 : 10000)};
`

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`

const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.85rem;
  border-bottom: 1px solid #dee2e6;
`

const StyledModalBodyContainer = styled.div`
  padding: 1.5rem 1.85rem;
`

const StyledContentContainer = styled.div<{
  variant?: string
  modalWidth?: string
  hideModalOverflow?: boolean
}>`
  position: relative;
  z-index: 101;
  background-color: white;
  max-width: ${p => (p.variant === 'wider' ? '1250px' : '640px')};
  border: 1px solid #dee2e6;
  border-radius: 4px;
  overflow: ${p => (p.hideModalOverflow ? 'unset' : 'auto')};
  width: ${p => (p.modalWidth ? p.modalWidth : null)};
  max-height: 90%;
  scroll-behavior: smooth;
`

const StyledModalFooterContainer = styled.div`
  padding: 1rem 1.85rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #dee2e6;
`

const StyledCloseIcon = styled.img`
  cursor: pointer;
`

export default Modal
