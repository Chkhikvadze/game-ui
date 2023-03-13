import React, { useState } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'
import Navbar from 'components/Navbar'

import { menuItemList } from 'helper/navigationHelper'

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

const PrivateRoute = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  if (!user) return <Navigate to='/login' />

  // const onCheckedChange = (isDefaultTheme: boolean) => {
  //   setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  // }

  return (
    <StyledAppContainer>
      {/* <Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange}/> */}
      <StyledMainLayout showMenu={showMenu}>
        <Navbar
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          navbarItems={menuItemList}
          showHeader={false}
          navbarTitle='Home'
        />
        <StyledMainSection>{outlet}</StyledMainSection>
      </StyledMainLayout>
    </StyledAppContainer>
  )
}

export default PrivateRoute
