import React, { useEffect } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import { useModal } from 'hooks'

import { AuthContext } from 'contexts'

import { Header } from 'components/Layout'
import AvatarDropDown from 'components/AvatarDropDown'
import Spotlight from 'components/Spotlight/Spotlight'
import ChatSwitcher from 'components/ChatSwitcher'

import {
  StyledAppContainer,
  StyledMainContainer,
  StyledFooter,
  StyledAvatarContainer,
} from '../components/Layout/LayoutStyle'

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { first_name } = user
  const outlet = useOutlet()

  const { openModal } = useModal()

  useEffect(() => {
    openModal({ name: 'ai-chat-modal', data: { text: 'v2' } })
  }, [])

  if (!user) return <Navigate to='/login' />

  return (
    <StyledAppContainer className='app_container'>
      <Header />
      <StyledMainContainer id='main_container_test'>{outlet}</StyledMainContainer>
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
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default ChatRouteLayout
