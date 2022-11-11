import React from 'react'
import delay from 'lodash/delay'
import styled from 'styled-components'

const StyledContainer = styled.div``

type CollapseType = {
  className?: string,
  initialOpened?: boolean,
  trigger: (toggled: boolean) => React.ReactElement,
  onOpen?: () => void,
  children: any,
}

const Collapse = ({
  className,
  initialOpened = false,
  trigger,
  onOpen,
  children,
}: CollapseType) => {
  const [isToggled, toggle] = React.useState<boolean>(initialOpened)

  const onTriggerClick = () => {
    toggle(toggled => !toggled)
    if (!isToggled && onOpen) { delay(onOpen, 0) }
  }

  const clonedTrigger = React.cloneElement(
    trigger(isToggled),
    { onClick: onTriggerClick },
  )

  return (
    <StyledContainer className={className}>
      {clonedTrigger}
      {isToggled && (typeof children === 'function' ? children(toggle) : children)}
    </StyledContainer>
  )
}

export default Collapse
