import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from 'contexts'
import useViewport from 'hooks/useViewport'

// import BurgerMenuIcon from 'atoms/BurgerMenuIcon'
import NavbarItems from './components/NavbarItems'
import logo from 'assets/old/images/logo.png'
import menu from 'assets/old/images/navbar/menu.png'

import { StyledNavBarLeftContainer, StyledNavHeaderContainer } from './Style'
import MenuBar from 'oldComponents/atoms/Menubar'
import BurgerMenu from 'oldComponents/atoms/BurgerMenu'

const NavHeader = () => {
  const {isAuthenticated, user} = useContext(AuthContext)
  const [menuOpened, toggleMenu] = React.useState(false)
  const {width} = useViewport()
  const [showMenu, setShowMenu] = useState(false)
  
  const showHideMenu = () => {
	setShowMenu( !showMenu)
  }
  
  return (
	<React.Fragment>
	  <StyledNavHeaderContainer>
		<StyledNavBarLeftContainer>
		  <BurgerMenu onItemClick={showHideMenu}/>
		  <Link
			to={isAuthenticated ? `${user.role === 'admin' ? '/admin/users': '/dashboard'}`: '/'}
		  >
			<img src={logo} alt="BetterFleet" width={width < 768 ? 200: 250}/>
		  </Link>
		</StyledNavBarLeftContainer>
		
		{width < 768 ? (
		  <img src={menu} width={36} onClick={() => toggleMenu(true)} alt="burger menu"/>
		): (
		  <NavbarItems/>
		)}
	  </StyledNavHeaderContainer>
	  {menuOpened && <NavbarItems mobile/>}
	  
	  <MenuBar showMenu={showMenu} onItemClick={showHideMenu}/>
	</React.Fragment>
  )
}

export default NavHeader
