import React from 'react'
import styled from 'styled-components'

const StyledAlertContainer = styled.div`
  padding: 0.75rem 1.25rem;
  color: ${props => props.color === 'danger'
    ? '#721c24'
    : '#155724'};
  background-color: ${props => props.color === 'danger'
    ? '#f8d7da'
    : '#c3e6cb'};
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  position: relative;
`
const StyledIcon = styled.div<{color?: any}>`
  position: absolute;
  background-color: ${(props) =>
    props.color === 'danger' ? '#f8d7da' : '#c3e6cb'};
  width: 20px;
  height: 20px;
  top: -5px;
  right: -5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`

type AlertProps = {
  color?: string
  children: any
  closeAlert?: any
}

const Alert = ({ color, children, closeAlert }: AlertProps) => (
  <StyledAlertContainer color={color}>
    <div>{children}</div>
    {closeAlert && <StyledIcon color={color} onClick={closeAlert}>x</StyledIcon>} 
  </StyledAlertContainer>
)

export default Alert
