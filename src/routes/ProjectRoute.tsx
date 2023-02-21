import React, { useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

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

  const [theme] = useState(defaultTheme)

  const navigate = useNavigate()
  if (!user) return <Navigate to='/login' />

  // const onCheckedChange = (isDefaultTheme: boolean) => {
  //   setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  // }

  const onClickGoBack = () => {
    navigate('../game')
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
            onClickGoBack={onClickGoBack}
          />
          {/* <ProjectRouteNavbar showMenu={showMenu} projectName={name} /> */}
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default ProjectRoute
