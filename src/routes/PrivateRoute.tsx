import React, { useState } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
import Navbar from 'components/Navbar'

import { menuItemList } from 'helper/navigationHelper'

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

const PrivateRoute = () => {
  const [showMenu, setShowMenu] = useState(false)

  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  const [theme] = useState(defaultTheme)

  if (!user) return <Navigate to="/login" />

  // const onCheckedChange = (isDefaultTheme: boolean) => {
  //   setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  // }

  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer>
        {/* <Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange}/> */}
        <StyledMainLayout showMenu={showMenu}>
          <Navbar showMenu={showMenu} setShowMenu={setShowMenu} navbarItems={menuItemList} />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default PrivateRoute
