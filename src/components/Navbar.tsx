import React from 'react'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css'
import { menuItemList } from 'helper/navigationHelper'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import MenuTitle from '@l3-lib/ui-core/dist/MenuTitle'
import DialogContentContainer from '@l3-lib/ui-core/dist/DialogContentContainer'
import { useNavigate } from 'react-router-dom'

type NavbarProps = {
  showMenu: boolean
}

const Navbar = ({ showMenu }: NavbarProps) => {
  let navigate = useNavigate()

  return (
    <StyledNavBar>
      <DialogContentContainer size={'size_big'} collapsed={showMenu}>
        <Menu size={Menu.sizes.LARGE} collapsed={showMenu}>
          <MenuTitle caption="Big menu" size={'size_big'} collapsed={showMenu} />
          {menuItemList &&
            menuItemList?.map((item: any) => (
              <MenuItem
                collapsed={showMenu}
                icon={item.icon}
                title={item.name}
                onClick={() => navigate(item.routeLink)}
              />
            ))}
        </Menu>
      </DialogContentContainer>
      {/* {/* </StyledMenu> */}
    </StyledNavBar>
  )
}

export default Navbar

const StyledNavBar = styled.div``
