import React, { useState } from "react"
import { Navigate, useOutlet } from "react-router-dom"
import Header from "components/Header"

import { AuthContext } from "contexts"
import { ThemeProvider } from "styled-components"
import { defaultTheme, lightTheme } from "styles/theme"

import {
  StyledAppContainer,
  StyledMainSection,
  StyledAdminLayoutEdit,
} from "./ProviderStyle"

const AdminRoute = () => {
  const [setShowMenu] = useState(false)
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  const [theme, setTheme] = useState(defaultTheme)

  if (!user) return <Navigate to="/login" />

  const onCheckedChange = (isDefaultTheme: boolean) => {
    setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer>
        <Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange} />
        <StyledAdminLayoutEdit showMenu={false}>
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledAdminLayoutEdit>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default AdminRoute


