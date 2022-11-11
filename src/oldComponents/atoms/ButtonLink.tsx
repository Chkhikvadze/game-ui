import React from 'react'
import styled from 'styled-components'


type ButtonLinkProps = {
  onClick?: (event: object) => any,
  disabledTabIndex?: boolean
  children: any
  style: any
}

const ButtonLink = ({children, disabledTabIndex, ...props}: ButtonLinkProps) => (
  <StyledButton tabIndex={disabledTabIndex ? -1 : 0}  {...props} >
    {children}
  </StyledButton>
)

export default ButtonLink

const StyledButton = styled.button`
  border: none;
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  text-decoration-line: underline;
  color: #0a7cb9;
  height: fit-content;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  display: -webkit-inline-box;
  width: fit-content;
`