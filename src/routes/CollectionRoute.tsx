import React, { useState } from 'react'
import { Navigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'

// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
import {
  useCollectionByIdService,
  useUpdateCollectionByIdService,
} from 'services/useCollectionService'
// import { useProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { collectionItemList } from 'helper/navigationHelper'

const CollectionRoute = () => {
  const params = useParams()
  const collectionId = params.collectionId!
  const { data: collection, refetch } = useCollectionByIdService({ id: collectionId })

  const [updateCollectionById] = useUpdateCollectionByIdService()

  const updateHeader = (name: any) => {
    const updatedValues = {
      name: name,
    }
    updateCollectionById(collectionId, { ...updatedValues })
  }

  const updateLogo = async (logo: any) => {
    const updatedValues = {
      logo_image: logo,
    }
    await updateCollectionById(collectionId, { ...updatedValues })
    refetch()
  }

  const { name, logo_image } = collection

  // const { name, project_id } = collection

  // const { data: projectById } = useProjectByIdService({ id: project_id })
  // const { name: projectName } = projectById

  // const routeName = `${projectName} / ${name} `

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
        <StyledMainLayout showMenu={showMenu}>
          <Navbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarItems={collectionItemList}
            navbarTitle={name}
            updateHeader={updateHeader}
            logo={logo_image}
            updateLogo={updateLogo}
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default CollectionRoute
