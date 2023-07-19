import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import ChatSwitcher from 'components/ChatSwitcher'

import Spotlight from 'components/Spotlight'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)

  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <>
      <div>{outlet}</div>
      <Spotlight />
      <ChatSwitcher />
    </>
  )
}

export default RootLayout
