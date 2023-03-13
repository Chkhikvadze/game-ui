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
  useCreateCollectionService,
} from 'services/useCollectionService'
// import { useProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { collectionItemList } from 'helper/navigationHelper'

type CollectionRouteProps = {
  isCreate?: boolean
}

// todo this code needs to be refactored
const CollectionRoute = ({ isCreate }: CollectionRouteProps) => {
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

  const [createCollection] = useCreateCollectionService()
  const navigate = useNavigate()

  const createNewCollection = async (name: string) => {
    const collectionInput = {
      name: name,
      project_id: projectId,
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const res = await createCollection(collectionInput, () => {})

    if (res) {
      setToast({
        message: `Collection ${res.collection.name} has been successfully created`,
        type: 'positive',
        open: true,
      })
    }
    const collectionId = res.collection.id
    navigate(`/collection/${collectionId}/general`)
  }

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
            navbarItems={!isCreate && collectionItemList}
            navbarTitle={isCreate ? true : name}
            updateHeader={isCreate ? createNewCollection : updateHeader}
            logo={logo_image}
            updateLogo={updateLogo}
            isCreate={isCreate}
            onClickGoBack={onClickGoBack}
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default CollectionRoute
