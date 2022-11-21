import React from "react"
import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar"
import styled from "styled-components"
import "react-pro-sidebar/dist/css/styles.css"
import { menuItemList } from "helper/navigationHelper"
import NavigationButton from "atoms/NavigationButton"


type NavbarProps = {
  showMenu: boolean
}


const Navbar = ({showMenu}: NavbarProps) => {
  
  
  return (
	<StyledNavBar>
	  <StyledProSidebar collapsed={showMenu}>
		{ !showMenu && (
		  <StyledSidebarHeader>
			<StyledHeaderSpan>
			  Menu
			</StyledHeaderSpan>
		  </StyledSidebarHeader>
		)}
		<StyledMenu>
		  {menuItemList &&
			menuItemList?.map((item: any) => (
			  <MenuItem key={item.name} icon={item.icon}>
				<NavigationButton
				  // icon={item.icon}
				  value={item.name}
				  to={item.routeLink}
				/>
			  </MenuItem>
			))}
		</StyledMenu>
	  </StyledProSidebar>
	</StyledNavBar>
  )
}

export default Navbar

const StyledNavBar = styled.div``

const StyledProSidebar = styled(ProSidebar)`
  .pro-sidebar-inner {
    background-color: unset;
  }

  .pro-sidebar-header {
    border-bottom: none;
  }
`

const StyledSidebarHeader = styled(SidebarHeader)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 13px;
  align-items: center;
`

const StyledHeaderSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: rgba(255, 255, 255, 0.9);
  text-transform: capitalize;
`

const StyledMenu = styled(Menu)`
  max-height: 70vh;
  overflow: scroll;
`