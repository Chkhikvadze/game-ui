import React, { useContext, useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

import { useProjectByIdService, useUpdateProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { projectItemList } from 'helper/navigationHelper'

const ProjectRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)
  const outlet = useOutlet()
  const params = useParams()
  const projectId = params.projectId
  const { data: projectById, refetch } = useProjectByIdService({ id: projectId })
  const { name, logo_image } = projectById

  const [theme] = useState(defaultTheme)

  const [updateProjectById] = useUpdateProjectByIdService()

  const updateHeader = async (name: string) => {
    const updatedValues = {
      name: name,
    }
    await updateProjectById(projectId, { ...updatedValues })

    setToast({
      message: `Game Title updated!`,
      type: 'positive',
      open: true,
    })
  }

  const updateLogo = async (logo: string) => {
    const updatedValues = {
      logo_image: logo,
    }
    await updateProjectById(projectId, {
      ...updatedValues,
    })

    setToast({
      message: `Game Logo updated!`,
      type: 'positive',
      open: true,
    })
    refetch()
  }

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
            updateHeader={updateHeader}
            logo={logo_image}
            updateLogo={updateLogo}
            navbarItems={projectItemList}
            onClickGoBack={onClickGoBack}
            backText={'Games'}
          />
          {/* <ProjectRouteNavbar showMenu={showMenu} projectName={name} /> */}
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default ProjectRoute
