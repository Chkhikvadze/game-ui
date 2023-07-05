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
} from './LayoutStyle'
import AvatarDropDown from 'components/AvatarDropDown'

import Spotlight from 'components/Spotlight/Spotlight'
import styled from 'styled-components'
import ChatSwitcher from 'components/ChatSwitcher'

const MainRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      {/* <StyledMainLayout className='main_layout'> */}
      <StyledHeader>
        <div></div>
        <Link to='/'>
          <img src={logo} alt='Logo' />
        </Link>
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
      {/* </StyledMainLayout> */}
      {/* <StyledChatSwitcher></StyledChatSwitcher> */}
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default MainRouteLayout

// const StyledChatSwitcher = styled.div`
//   display: inline-flex;
//   padding: 10px;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;

//   border-radius: 100px;
//   background: rgba(255, 255, 255, 0.1);
//   /* Style */
//   box-shadow: 0px 8px 6px 0px rgba(0, 0, 0, 0.05), 0px 1px 1px 0px rgba(255, 255, 255, 0.25) inset,
//     0px -1px 1px 0px rgba(255, 255, 255, 0.1) inset;
//   backdrop-filter: blur(50px);

//   position absolute;
//   top: 50%;
//   left: 32px;

// `
