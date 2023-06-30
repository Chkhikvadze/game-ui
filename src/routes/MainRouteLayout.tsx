import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

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
} from './LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'

import Spotlight from 'components/Spotlight/Spotlight'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <StyledMainLayout className='main_layout'>
        <StyledHeader>
          <div></div>
          <StyledLogoContainer>
            <img src={logo} alt='Logo' />
          </StyledLogoContainer>
          <div></div>
        </StyledHeader>
        <StyledMainContainer id='main_container_test'>{outlet}</StyledMainContainer>
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

export default MainRouteLayout
