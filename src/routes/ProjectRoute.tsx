import React, { useState } from 'react'
import { Navigate, useOutlet, useParams } from 'react-router-dom'
import Header from 'components/Header'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme, lightTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
import ProjectRouteNavbar from 'components/ProjectRouteNavbar'
import { useProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { projectItemList } from 'helper/navigationHelper'

const ProjectRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()
  const params = useParams()
  const projectId = params.projectId!
  const { data: projectById } = useProjectByIdService({ id: projectId })
  const { name } = projectById

  const [theme, setTheme] = useState(defaultTheme)
  if (!user) return <Navigate to="/login" />

  const onCheckedChange = (isDefaultTheme: boolean) => {
    setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer>
        {/* <Header setShowMenu={setShowMenu} onCheckedChange={onCheckedChange}/> */}
        <StyledMainLayout showMenu={showMenu}>
          <Navbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarTitle={name}
            navbarItems={projectItemList}
          />
          {/* <ProjectRouteNavbar showMenu={showMenu} projectName={name} /> */}
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default ProjectRoute
