import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import Logo from 'assets/images/logo.png'

import {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledFooter,
} from './LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <StyledMainLayout className='main_layout'>
        <StyledHeader>
          <div></div>
          <div>
            <img src={Logo} alt='Logo' />
          </div>
          <div></div>
        </StyledHeader>
        <StyledMainContainer id='main_container'>{outlet}</StyledMainContainer>
        <StyledFooter>
          <AvatarDropDown />
          <div>Footer</div>
          <div></div>
        </StyledFooter>
      </StyledMainLayout>
    </StyledAppContainer>
  )
}

export default MainRouteLayout
