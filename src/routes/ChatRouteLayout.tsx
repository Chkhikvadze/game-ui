import React, { useEffect } from 'react'
import { Link, Navigate, useOutlet, useParams } from 'react-router-dom'

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
import { useModal } from 'hooks'

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  const { openModal } = useModal()

  useEffect(() => {
    openModal({ name: 'ai-chat-modal', data: { text: 'formValue' } })
  }, [])

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      {/* <StyledMainLayout className='main_layout'> */}
      <StyledHeader>
        <StyledNavigationColumn>
          <ArrowNavigation />
          <Breadcrumbs />
        </StyledNavigationColumn>
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

export default ChatRouteLayout
