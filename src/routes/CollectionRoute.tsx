import React, { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
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

// todo this code needs to be refactored
const CollectionRoute = () => {
  const outlet = useOutlet()
  const params = useParams()
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)

  const [showMenu, setShowMenu] = useState(false)
  const [theme] = useState(defaultTheme)

  const collectionId = params.collectionId
  const projectId = params.projectId

  const { data: collection, refetch } = useCollectionByIdService({ id: collectionId })

  const { project_id, name, logo_image } = collection

  const navigate = useNavigate()

  const [updateCollectionById] = useUpdateCollectionByIdService()

  const updateHeader = async (name: string) => {
    const updatedValues = {
      name: name,
    }
    await updateCollectionById(collectionId, { ...updatedValues })

    setToast({
      message: `Collection Title updated!`,
      type: 'positive',
      open: true,
    })
  }

  const updateLogo = async (logo: string) => {
    const updatedValues = {
      logo_image: logo,
    }
    await updateCollectionById(collectionId, { ...updatedValues })

    setToast({
      message: `Collection Logo updated!`,
      type: 'positive',
      open: true,
    })
    refetch()
  }

  const onClickGoBack = () => {
    navigate(`/game/${project_id || projectId}/collections`)
  }

  if (!user) return <Navigate to='/login' />

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
            onClickGoBack={onClickGoBack}
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default CollectionRoute
