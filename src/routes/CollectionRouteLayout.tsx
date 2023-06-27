import { Link, useOutlet } from 'react-router-dom'
import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledHeader,
  StyledMainContainer,
  StyledMainLayout,
} from './LayoutStyle'

import logo from 'assets/images/logo_l3.png'
import AvatarDropDown from 'components/AvatarDropDown'
import { AuthContext } from 'contexts'
import { useContext } from 'react'
import GameNavigation from 'pages/Navigation/GameNavigation'

const CollectionRouteLayout = () => {
  const { user } = useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  return (
    <StyledAppContainer>
      <StyledMainLayout>
        <StyledHeader>
          <div></div>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
          <div></div>
        </StyledHeader>
        <StyledMainContainer id='main_container_test'>
          <GameNavigation />
          {outlet}
        </StyledMainContainer>
        <StyledFooter>
          <StyledAvatarContainer>
            <AvatarDropDown />
            <span>{first_name}</span>
          </StyledAvatarContainer>
          <div>Footer</div>
          <div></div>
        </StyledFooter>
      </StyledMainLayout>
    </StyledAppContainer>
  )
}

export default CollectionRouteLayout
