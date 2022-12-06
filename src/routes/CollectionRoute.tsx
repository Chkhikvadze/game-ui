import React, { useState } from 'react'
import { Navigate, useOutlet, useParams } from 'react-router-dom'
import Header from "components/Header"

import { AuthContext } from 'contexts'
import { ThemeProvider } from "styled-components"
import { defaultTheme, lightTheme } from "styles/theme"

// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
import CollectionRouteNavbar from "components/CollectionRouteNavbar"
import { useCollectionByIdService } from "services/useCollectionService"
import { useProjectByIdService } from "services/useProjectService"

const CollectionRoute = () => {
  const params = useParams()
  const collectionId = params.collectionId!
  const {data:collection} = useCollectionByIdService({id:collectionId})
  
  const {name, project_id} = collection
  
  const {data:projectById} = useProjectByIdService({id:project_id})
  const {name:projectName} = projectById
  
  const routeName = `${projectName} / ${name} `
  
  
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
		  <CollectionRouteNavbar showMenu={showMenu} routeName={routeName}/>
		  <StyledMainSection>
            {outlet}
		  </StyledMainSection>
        </StyledMainLayout>
	  </StyledAppContainer>
    </ThemeProvider>
  )
}

export default CollectionRoute

