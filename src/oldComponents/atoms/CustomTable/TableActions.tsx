import React from 'react'
import DropdownItem from 'oldComponents/molecules/DropdownItem'
import DropdownMenu from 'oldComponents/molecules/DropdownMenu'

import threeDots from 'assets/old/images/threeDots.svg'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }: any) => (
  <DropdownMenu
    trigger={
      <div style={{ cursor: 'pointer' }}>
        <img src={threeDots} alt='Actions' />
      </div>
    }
  >
    {() => children}
  </DropdownMenu>
)

interface IAction {
  //TODO remove
  label: string

  width?: number | any

  color?: string

  onClick?: any
}

export const actionButton = ({ label, width, color, onClick }: IAction) => (
  <DropdownItem label={label} width={width} color={color} onClick={onClick} />
)
