import { Link, useOutlet } from 'react-router-dom'
import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledGroupContainer,
  StyledHeader,
  StyledMainContainer,
  StyledMainLayout,
} from './LayoutStyle'

import logo from 'assets/images/logo_l3.png'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext, LayoutContext } from 'contexts'
import { useContext } from 'react'
import GameNavigation from 'pages/Navigation/GameNavigation'
import Spotlight from 'components/Spotlight'

const GameRouteLayout = ({ hideNavbar = false }: { hideNavbar?: boolean }) => {
  const { user } = useContext(AuthContext)
  const { expand } = useContext(LayoutContext)

  const { first_name } = user
  const outlet = useOutlet()

  return (
    <StyledAppContainer>
      <StyledMainLayout>
        {!expand && (
          <StyledHeader>
            <div></div>
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
