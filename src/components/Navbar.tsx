import React, { useContext } from 'react'
import styled from 'styled-components'
import 'react-pro-sidebar/dist/css/styles.css'

import Menu from '@l3-lib/ui-core/dist/Menu'
import MenuItem from '@l3-lib/ui-core/dist/MenuItem'
import MenuTitle from '@l3-lib/ui-core/dist/MenuTitle'
import DialogContentContainer from '@l3-lib/ui-core/dist/DialogContentContainer'
import { useNavigate, useLocation } from 'react-router-dom'
import BurgerMenuIconSvg from 'assets/svgComponents/BurgerMenuIconSvg'
import Label from 'atoms/Label'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext } from 'contexts'

import { StyledFlex } from 'styles/globalStyle.css'
import LeftArrowIconSvg from 'assets/svgComponents/LeftArrowIconSvg'

type NavbarProps = {
  showMenu: boolean
  setShowMenu: any
  navbarTitle?: any
  navbarItems?: any
  showHeader?: boolean
}

const Navbar = ({
  showMenu,
  setShowMenu,
  navbarTitle = null,
  navbarItems,
  showHeader = true,
}: NavbarProps) => {
  let navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const fullName = user && `${user.first_name} ${user.last_name}`

  const { pathname } = useLocation()
  const pathArr = pathname && pathname.split('/')
  const mainPathName = pathArr[1]

  const goBack = () => {
    if (mainPathName === 'game') {
      navigate('/')
    }
    if (mainPathName === 'collection') {
      navigate('/game')
    }
  }

  return (
    <StyledNavBar showMenu={showMenu}>
      <StyledTopColumn showMenu={showMenu}>
        {!showMenu && showHeader && (
          <StyledBackButton onClick={goBack}>
            <LeftArrowIconSvg /> Back
          </StyledBackButton>
        )}
        <StyledBurgerIcon onClick={() => setShowMenu((prevValue: boolean) => !prevValue)}>
          <BurgerMenuIconSvg />
        </StyledBurgerIcon>
      </StyledTopColumn>
      <DialogContentContainer size={'size_big'} collapsed={showMenu}>
        <StyledMenu size={Menu.sizes.LARGE} collapsed={showMenu} className="navbar__menu">
          {navbarTitle && (
            <MenuTitle caption={navbarTitle} size={'size_big'} collapsed={showMenu} />
          )}
          {navbarItems &&
            navbarItems?.map((item: any) => (
              <MenuItem
                collapsed={showMenu}
                icon={item.icon}
                title={item.name}
                onClick={() => navigate(item.routeLink)}
              />
            ))}
        </StyledMenu>
      </DialogContentContainer>

      <StyledAvatarColumn showMenu={showMenu}>
        <AvatarDropDown />
        {!showMenu && <Label color={'white'}>{fullName}</Label>}
      </StyledAvatarColumn>
    </StyledNavBar>
  )
}

export default Navbar

const StyledNavBar = styled.nav<{ showMenu?: boolean }>`
  padding: ${(p) => (p.showMenu ? '23px 16px' : '46px 32px')};
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: auto 1fr auto;
`

const StyledBurgerIcon = styled.div`
  align-self: center;
  cursor: pointer;
`

const StyledBackButton = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: white;
  display: flex;
  gap: 25px;
  align-items: center;
  svg {
    path {
      fill: #fff;
      fill-opacity: 1;
    }
  }
`

const StyledTopColumn = styled(StyledFlex)<{ showMenu?: boolean }>`
  margin-bottom: 24px;
  justify-content: ${(p) => (p.showMenu ? 'center' : null)};
`

const StyledAvatarColumn = styled.div<{ showMenu?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  justify-content: ${(p) => (p.showMenu ? 'center' : null)};
`

const StyledMenu = styled(Menu)`
  width: -webkit-fill-available;
`
