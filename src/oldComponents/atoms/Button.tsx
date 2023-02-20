import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
// import ReactTooltip from 'react-tooltip'

// This will be moved inside theme
const getColor = (color: string) => {
  switch (color) {
    case 'primary':
      return '#19b3ff'
    case 'secondary':
      return '#6c757d'
    case 'danger':
      return '#dc3545'
    default:
      return color
  }
}

const StyledButton = styled.button<{ color: string; onClick?: any; disabled?: boolean }>`
  background-color: #19b3ff;
  border: none;
  background-color: ${props => getColor(props.color)};
  color: white;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
  max-height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.4;
    pointer-events
  `}
`

type ButtonProps = {
  color: 'primary' | 'secondary' | 'danger' | string
  children: any
  disabled?: boolean
  onClick?: (event?: ChangeEvent<HTMLFormElement> | undefined) => void
  type?: string
  tooltip?: string | boolean
  loader?: boolean
}

const Button = ({ color, children, type, disabled, tooltip, loader, ...rest }: ButtonProps) => (
  <>
    {tooltip && (
      <>
        <StyledButton
          data-tip
          data-for='registerTip'
          color={color}
          {...rest}
          type='submit'
          disabled={disabled}
        >
          {children}
        </StyledButton>
        {/* <ReactTooltip id="registerTip" place="top" effect="solid">
		 {tooltip}
		 </ReactTooltip> */}
      </>
    )}
    {!tooltip && (
      <>
        <StyledButton color={color} {...rest} type='submit' disabled={disabled}>
          {children}
        </StyledButton>
      </>
    )}
  </>
)

export default Button
