import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from './Label'

const StyledListItemContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 20px auto;
  grid-column-gap: 16px;
  align-items: center;
`

type ListItemProps = {
  className?: string
  icon?: any
  label: string | React.ReactNode
  size?: string
  onClick?: (event?: React.SyntheticEvent) => void
}

const ListItem = ({ className, icon, label, size, onClick }: ListItemProps) => (
  <StyledListItemContainer className={className} onClick={onClick}>
    {icon}
    {typeof label === 'string' ? <Label size={size}>{label}</Label> : label}
  </StyledListItemContainer>
)

ListItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.element,
  label: PropTypes.any,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

export default ListItem
