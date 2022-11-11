import React, { ReactElement } from 'react'
import styled from 'styled-components'

import Collapse from 'oldComponents/atoms/Collapse'

const StyledCollapse = styled(Collapse)`
  align-items: center;
  cursor: pointer;
  position: relative;
`

const StyledDropdownMenu = styled.div<{ref: any}>`
  visibility: hidden;
  position: absolute;
  background-color: white;
  /* border: 1px solid #CED4DA;
  border-radius: 4px; */
  z-index: 10;
  right: 0;
  @media (max-width: 768px) {
    position: static;
  }
`

type DropdownMenuProps = {
  trigger: ReactElement,
  className?: string,
  children: (toggle: (toggled: boolean) => void) => ReactElement,
  labelClassName?: string
}

const DropdownMenu = ({
  trigger,
  className,
  children,
  labelClassName,
}: DropdownMenuProps) => {
  const dropdownRef = React.useRef<HTMLElement>()
  
  const onOpen = () => {
	if ( !dropdownRef.current) return
	
	const {height} = dropdownRef.current.getBoundingClientRect()
	dropdownRef.current.setAttribute(
	  'style',
	  `bottom: -${height + 10}px; visibility: visible;`,
	)
	dropdownRef.current.focus()
  }
  
  return (
	<StyledCollapse
	  onOpen={onOpen}
	  trigger={(toggled) => trigger}
	  className={labelClassName}
	>
	  {(toggle: (toggled: boolean) => void) => (
		<StyledDropdownMenu
		  className={className}
		  tabIndex={0}
		  onBlur={() => setTimeout(() => toggle(false), 130)}
		  ref={dropdownRef}
		>
		  {children(toggle)}
		</StyledDropdownMenu>
	  )}
	</StyledCollapse>
  )
}

export default DropdownMenu
