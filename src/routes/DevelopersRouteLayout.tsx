import { Link, useLocation, useOutlet } from 'react-router-dom'
import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledGroupContainer,
  StyledHeader,
  StyledMainContainer,
  StyledMainLayout,
  StyledNavigationColumn,
} from './LayoutStyle'

import logo from 'assets/images/l3_logo.svg'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext, LayoutContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import GameNavigation from 'pages/Navigation/GameNavigation'
import Spotlight from 'components/Spotlight'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import { includes } from 'lodash'
import DevelopersNavigation from 'pages/Navigation/DevelopersNavigation'
import ArrowNavigation from 'pages/Navigation/ArrowNavigation'

const DevelopersRouteLayout = () => {
  const { user } = useContext(AuthContext)
  const { expand, onChangeLayout } = useContext(LayoutContext)

  const { first_name } = user
  const outlet = useOutlet()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    setActive(pathArr)
  }, [pathname])

  const isCollection = includes(active, 'collection')

  const hideNavbar = includes(active, 'collection')

  const isExpandMode = expand && isCollection

  return (
    <StyledAppContainer>
      {/* <StyledMainLayout> */}
      <StyledHeader>
        <StyledNavigationColumn>
          <ArrowNavigation />
          <Breadcrumbs />
        </StyledNavigationColumn>
        {!isExpandMode && (
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        )}
        {!isExpandMode && <div></div>}
      </StyledHeader>

      <StyledMainContainer expand={isExpandMode} id='main_container_test'>
        {!hideNavbar && (
          <StyledGroupContainer mt='24'>
            <div id='game_navigation'>
              <DevelopersNavigation />
            </div>
          </StyledGroupContainer>
        )}
        {outlet}
      </StyledMainContainer>
      <StyledFooter>
        <StyledAvatarContainer>
          <AvatarDropDown />
          <span>{first_name}</span>
        </StyledAvatarContainer>
        <div>
          <Spotlight />
        </div>
        <div></div>
      </StyledFooter>
      {/* </StyledMainLayout> */}
    </StyledAppContainer>
  )
}

export default DevelopersRouteLayout
