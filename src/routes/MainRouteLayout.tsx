import React from 'react'
import { Link, Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import {
  StyledAppContainer,
  StyledHeader,
  StyledMainContainer,
  StyledFooter,
  StyledAvatarContainer,
  StyledNavigationColumn,
} from '../components/Layout/LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'

import Spotlight from 'components/Spotlight/Spotlight'
import ChatSwitcher from 'components/ChatSwitcher'
import { Header } from 'components/Layout'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
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
