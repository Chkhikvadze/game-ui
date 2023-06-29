import { Link, useLocation, useOutlet } from 'react-router-dom'
import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledGroupContainer,
  StyledHeader,
  StyledMainContainer,
  StyledMainLayout,
} from './LayoutStyle'

import logo from 'assets/images/l3_logo.svg'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext, LayoutContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'
import GameNavigation from 'pages/Navigation/GameNavigation'
import Spotlight from 'components/Spotlight'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import { includes } from 'lodash'

const GameRouteLayout = () => {
  const { user } = useContext(AuthContext)
  const { expand } = useContext(LayoutContext)

  const { first_name } = user
  const outlet = useOutlet()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []

    setActive(pathArr)
  }, [pathname])

  const hideNavbar = includes(active, 'collection')

  return (
    <StyledAppContainer>
      <StyledMainLayout>
        {!expand && (
          <StyledHeader>
            <div>
              <Breadcrumbs />
            </div>
            <Link to='/'>
              <img src={logo} alt='Logo' />
            </Link>
            <div></div>
          </StyledHeader>
        )}
        <StyledMainContainer expand={expand} id='main_container_test'>
          {!hideNavbar && (
            <StyledGroupContainer mt='24'>
              <GameNavigation />
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
      </StyledMainLayout>
    </StyledAppContainer>
  )
}

export default GameRouteLayout
