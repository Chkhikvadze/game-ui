import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import logo from 'assets/images/logo_l3.png'

import {
  StyledAppContainer,
  StyledMainLayout,
  StyledHeader,
  StyledMainContainer,
  StyledFooter,
  StyledAvatarContainer,
} from './LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import styled from 'styled-components'

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
          <div>
            <img src={logo} alt='Logo' />
          </div>
          <div></div>
        </StyledHeader>
        <StyledMainContainer id='main_container_test'>{outlet}</StyledMainContainer>
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

export default MainRouteLayout
