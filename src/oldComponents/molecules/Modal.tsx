import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import CloseIcon from 'assets/old/images/close.svg'
import Typography from 'oldComponents/atoms/Typography'

type ModalProps = {
  header?: string | React.ReactElement,
  footer?: React.ReactElement,
  children: any,
  bodyClassName?: string,
  hideClose?: boolean,
  close?: () => void,
  hideZIndex?: boolean
}

const Modal = ({
  header,
  footer,
  children,
  bodyClassName,
  hideClose,
  close,
  hideZIndex,
  ...rest
}: ModalProps) => {
  React.useEffect(
    () => {
	  document
        .body
        .setAttribute('style', 'overflow: hidden;')
	  
	  return () => document
        .body
        .setAttribute('style', 'overflow: auto;')
    },
    [],
  )
  
  const HeaderComponent = React.useMemo(
    () => typeof header !== 'string'
	  ? header
	  : (
        <StyledHeaderContainer>
		  <Typography color="#000" variant="h4">{header}</Typography>
		  
		  { !hideClose && (
            <StyledCloseIcon
			  onClick={close}
			  src={CloseIcon}
			  alt=""
            />
		  )}
        </StyledHeaderContainer>
	  ),
    [close, header, hideClose],
  )
  
  return ReactDOM.createPortal(
    <StyledContainer hideZIndex={hideZIndex} {...rest}>
	  <StyledOverlay onClick={close}/>
	  
	  <StyledContentContainer>
        {header && HeaderComponent}
		
        <StyledModalBodyContainer>
		  {children}
        </StyledModalBodyContainer>
		
        <StyledModalFooterContainer>
		  {footer}
        </StyledModalFooterContainer>
	  </StyledContentContainer>
    </StyledContainer>,
    document.body,
  )
}

const StyledContainer = styled.div<{hideZIndex?: boolean}>`
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
  z-index: ${p => p.hideZIndex ? 0: 10000}
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
  border-bottom: 1px solid #DEE2E6;
`

const StyledModalBodyContainer = styled.div`
  padding: 1.5rem 1.85rem;
  overflow: scroll;
`

const StyledContentContainer = styled.div`
  position: relative;
  z-index: 101;
  background-color: white;
  max-width: 640px;
  /* max-width: 1500px; */
  border: 1px solid #DEE2E6;
  border-radius: 4px;
  max-height: 95%;
  display: grid;
  grid-template-rows: 1fr auto 1fr;
`

const StyledModalFooterContainer = styled.div`
  padding: 1rem 1.85rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #DEE2E6;
`

const StyledCloseIcon = styled.img`
  cursor: pointer;
`

export default Modal
