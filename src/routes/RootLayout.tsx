import React from 'react'
import { AuthContext } from 'contexts'
import { Navigate, useOutlet } from 'react-router-dom'

import useCheckRoute from 'hooks/useCheckRoute'

import ChatSwitcher from 'components/ChatSwitcher'
import Spotlight from 'components/Spotlight'

const RootLayout = () => {
  const { user } = React.useContext(AuthContext)
  const { isCheckedRoute } = useCheckRoute('copilot')

  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  return (
    <>
      <>{outlet}</>
      {!isCheckedRoute && <Spotlight />}
      <ChatSwitcher isChatOpen={isCheckedRoute} />
    </>
  )
}

export default RootLayout
