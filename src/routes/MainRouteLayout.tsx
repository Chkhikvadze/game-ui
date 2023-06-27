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
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark'
import styled from 'styled-components'

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
          <div>
            <img src={Logo} alt='Logo' />
          </div>
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

const StyledAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.2);
  }
`
