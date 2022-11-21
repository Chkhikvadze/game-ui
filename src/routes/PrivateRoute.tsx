import React, { useState } from 'react'
import { Navigate, useOutlet } from 'react-router-dom'
import Header from "components/Header"

import { AuthContext } from 'contexts'
import { ThemeProvider } from "styled-components";
import { defaultTheme, lightTheme } from "styles/theme";
import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

const PrivateRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const {user} = React.useContext(AuthContext)
  const outlet = useOutlet()
  
  const [theme, setTheme] = useState(defaultTheme)
  
  if ( !user) return <Navigate to="/login"/>
  
  
  const onCheckedChange = (isDefaultTheme: boolean) => {
	setTheme(isDefaultTheme ? lightTheme: defaultTheme)
  }
  
  return (
	
	<ThemeProvider theme={theme}>
	  <StyledAppContainer>
		<Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange}/>
		<StyledMainLayout showMenu={showMenu}>
		  <Navbar showMenu={showMenu}/>
		  <StyledMainSection>
			{outlet}
		  </StyledMainSection>
		</StyledMainLayout>
	  </StyledAppContainer>
	</ThemeProvider>
  )
}

export default PrivateRoute

