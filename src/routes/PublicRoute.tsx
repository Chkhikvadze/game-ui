import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'

import { StyledMainWrapper } from './ProviderStyle'

const PublicRoute = () => {
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()
  if (user) return <Navigate to='/' />

  return <StyledMainWrapper>{outlet}</StyledMainWrapper>
}

export default PublicRoute
