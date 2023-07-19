import React, { useEffect } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import { useModal } from 'hooks'

import { AuthContext } from 'contexts'

import { Footer, Header } from 'components/Layout'
import ChatSwitcher from 'components/ChatSwitcher'
import { StyledAppContainer, StyledMainContainer } from '../components/Layout/LayoutStyle'

const ChatRouteLayout = () => {
  const { user } = React.useContext(AuthContext)

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
      <Footer />
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default ChatRouteLayout
