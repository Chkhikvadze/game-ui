import React from 'react'
import { Link, Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'
import logo from 'assets/images/l3_logo.svg'

import {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledFooter,
  StyledAvatarContainer,
  StyledLogoContainer,
  StyledNavigationColumn,
} from './LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'

import Spotlight from 'components/Spotlight/Spotlight'
import ChatSwitcher from 'components/ChatSwitcher'
import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      {/* <StyledMainLayout className='main_layout'> */}
      <StyledHeader id='main_header'>
        <StyledNavigationColumn>
          <ArrowNavigation />
          <Breadcrumbs />
        </StyledNavigationColumn>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
        <div></div>
      </StyledHeader>
      <StyledMainContainer>{outlet}</StyledMainContainer>
      <StyledFooter id='main_footer'>
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
      {/* <StyledChatSwitcher></StyledChatSwitcher> */}
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default MainRouteLayout
