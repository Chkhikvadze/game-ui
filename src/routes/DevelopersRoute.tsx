import React, { useContext, useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

import { useProjectByIdService, useUpdateProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { DEVELOPERS_ITEM_LIST, projectItemList } from 'helper/navigationHelper'

const DevelopersRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)
  const outlet = useOutlet()
  const params = useParams()
  const projectId = params.projectId
  const { data: projectById, refetch } = useProjectByIdService({ id: projectId })
  const { name, logo_image } = projectById

  const [theme] = useState(defaultTheme)

  const navigate = useNavigate()
  if (!user) return <Navigate to='/login' />

  //   const onCheckedChange = (isDefaultTheme: boolean) => {
  //     setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  //   }

  const onClickGoBack = () => {
    navigate('../')
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
            logo={logo_image}
            navbarItems={DEVELOPERS_ITEM_LIST}
            onClickGoBack={onClickGoBack}
            backText={'Developers'}
          />
          {/* <ProjectRouteNavbar showMenu={showMenu} projectName={name} /> */}
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default DevelopersRoute

// import React, { useContext, useState } from 'react'
// import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'
// import { AuthContext, ToastContext } from 'contexts'
// import { ThemeProvider } from 'styled-components'
// import { defaultTheme } from 'styles/theme'

// import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
// import { useProjectByIdService, useUpdateProjectByIdService } from 'services/useProjectService'

// import Navbar from 'components/Navbar'
// import { developersItemList } from 'helper/navigationHelper'

// const DevelopersRoute = () => {
//   const outlet = useOutlet()
//   const params = useParams()
//   const { user } = useContext(AuthContext)
//   const { setToast } = useContext(ToastContext)

//   const [showMenu, setShowMenu] = useState(false)
//   const [theme] = useState(defaultTheme)

//   const projectId = params.projectId

//   const { data: developer, refetch } = useProjectByIdService({ id: projectId })

//   const { project_id, name, logo_image } = developer

//   const navigate = useNavigate()

//   const [updateDeveloperById] = useUpdateProjectByIdService()

//   const updateHeader = async (name: string) => {
//     const updatedValues = {
//       name: name,
//     }
//     await updateDeveloperById(projectId, { ...updatedValues })

//     setToast({
//       message: `Developer Title updated!`,
//       type: 'positive',
//       open: true,
//     })
//   }

//   const updateLogo = async (logo: string) => {
//     const updatedValues = {
//       logo_image: logo,
//     }
//     await updateDeveloperById(projectId, { ...updatedValues })

//     setToast({
//       message: `developer Logo updated!`,
//       type: 'positive',
//       open: true,
//     })
//     refetch()
//   }

//   const onClickGoBack = () => {
//     navigate(`/developer/${project_id || projectId}/api-keys`)
//   }

//   if (!user) return <Navigate to='/login' />
//   return (
//     <ThemeProvider theme={theme}>
//       <StyledAppContainer>
//         <StyledMainLayout showMenu={showMenu}>
//           <Navbar
//             showMenu={showMenu}
//             setShowMenu={setShowMenu}
//             navbarItems={developersItemList}
//             navbarTitle={name}
//             updateHeader={updateHeader}
//             logo={logo_image}
//             updateLogo={updateLogo}
//             onClickGoBack={onClickGoBack}
//             backText={'Developer'}
//           />
//           <StyledMainSection>{outlet}</StyledMainSection>
//         </StyledMainLayout>
//       </StyledAppContainer>
//     </ThemeProvider>
//   )
// }

// export default DevelopersRoute
