import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import Typography from 'oldComponents/atoms/Typography'

const StyledTypography = styled(Typography)<{ active?: boolean; fontSize?: number }>`
  ${p => p.active && 'color: white;'};
  ${p => p.fontSize && `font-size: ${p.fontSize}px`};
`

const StyledSubMenuContainer = styled.div<{ subMenuPosition: string; width: any }>`
  display: none;
  position: absolute;
  left: ${props => (props.subMenuPosition === 'left' ? `-100%` : '100%')};
  top: 0px;
  padding: 16px;
  /* background-color: #e9ecef; */
  width: ${props => (props.width === 'auto' ? props.width : `${props.width}px`)};
  border: 1px solid #ced4da;
  border-radius: 4px;
`

const StyledImage = styled.img<{ active: boolean }>`
  ${props => props.active && 'filter: brightness(0) invert(1);'}
`

const StyledDropdownItem = styled.div<{ active: boolean; width: number; icon?: any }>`
  display: grid;
  ${p => p.icon && 'grid-template-columns: 24px auto'};
  grid-column-gap: 8px;
  width: ${props => props.width}px;
  ${p => (p.icon ? 'padding: 8px' : 'padding: 16px')};
  cursor: pointer;
  position: relative;
  border: 1px solid #a3a1a1;

  &:hover {
    /* background-color: #19b3ff; */
    /* ${StyledTypography} { color: white; } */
    /* ${StyledImage} { filter: brightness(0) invert(1); } */
    background-color: #e9ecef;
    ${StyledSubMenuContainer} {
      display: block;
    }
  }

  ${props => props.active && 'background-color: #e9ecef'}
`

const StyledSubLabel = styled.div`
  font-size: 12px;
  margin-top: 5px;
  padding-bottom: 5px;
  color: #868e96;
  /* border-bottom: 1px solid #ced4da; */
  white-space: nowrap;
`

type DropdownItemType = {
  children?: React.ReactChild
  icon?: any
  label: any
  subLabel?: any
  fontSize?: number
  className?: string
  onClick?: () => void
  width?: any
  subMenuPosition?: 'left' | 'right'
  to?: string
  subMenuLabel?: string
  color?: string
}

const DropdownItem = ({
  children,
  icon,
  label,
  subLabel,
  fontSize,
  subMenuLabel,
  className,
  width = 200,
  subMenuPosition = 'right',
  to,
  color,
  ...rest
}: DropdownItemType) => {
  const { pathname } = useLocation()
  const isActive = to === pathname

  return (
    <StyledDropdownItem className={className} active={isActive} width={width} icon={icon} {...rest}>
      {icon && <StyledImage active={isActive} src={icon} alt='Icon' width={24} />}
      <StyledTypography variant='caption' color={color} weight={400} fontSize={fontSize}>
        {label}
        {subLabel && <StyledSubLabel>{subLabel}</StyledSubLabel>}
        {children && children}
      </StyledTypography>

      {subMenuLabel && (
        <StyledSubMenuContainer width={width} subMenuPosition={subMenuPosition}>
          <Typography variant='label' weight={400}>
            {subMenuLabel}
          </Typography>
        </StyledSubMenuContainer>
      )}
    </StyledDropdownItem>
  )
}

export default DropdownItem
