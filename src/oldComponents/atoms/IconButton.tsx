import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from './Label'

type IconButtonType = {
  size?: number,
  onClick?: (event: React.SyntheticEvent) => void,
  className?: string,
  fontSize?: number,
  noBorder?: boolean,
  label: any,
  children: any,
}

const StyledIconButtonContainer = styled.div`
  display: inline-grid;
  justify-items: center;
  grid-row-gap: 5px;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
`

const StyledIconContainer = styled.div<{ size: number, noBorder?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  ${props => !props.noBorder && 'border: 2px solid white;'}
  border-radius: 50%;
`

const StyledLabel = styled(Label)<{ fontSize?: number }>`
  ${props => props.fontSize && `font-size: ${props.fontSize}px !important;`}
`

const IconButton = ({
  size = 50,
  onClick,
  className,
  fontSize,
  noBorder,
  label,
  children,
}: IconButtonType) => (
  <StyledIconButtonContainer onClick={onClick} className={className}>
    <StyledIconContainer noBorder={noBorder} size={size}>
      {children}
    </StyledIconContainer>

    {typeof label === 'string' ? (
      <StyledLabel
        weight={400}
        mb={0}
        fontSize={fontSize}
      >
        {label}
      </StyledLabel>
    ) : label}
  </StyledIconButtonContainer>
)

IconButton.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fontSize: PropTypes.number,
  noBorder: PropTypes.bool,
  label: PropTypes.any,
  children: PropTypes.any,
}

export default IconButton
