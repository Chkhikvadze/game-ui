import React, { useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext } from 'contexts'
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

import useToast from 'hooks/useToast'
import Toast from '@l3-lib/ui-core/dist/Toast'

type CollectionRouteProps = {
  isCreate?: boolean
}

const CollectionRoute = ({ isCreate }: CollectionRouteProps) => {
  const params = useParams()
  const collectionId = params.collectionId
  const projectId = params.projectId

  const { toast, setToast } = useToast()

  const { data: collection, refetch } = useCollectionByIdService({ id: collectionId })

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

  const updateHeader = (name: string) => {
    const updatedValues = {
      name: name,
    }
    updateCollectionById(collectionId, { ...updatedValues })
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

  const { name, logo_image } = collection

  // const { name, project_id } = collection

  // const { data: projectById } = useProjectByIdService({ id: project_id })
  // const { name: projectName } = projectById

  // const routeName = `${projectName} / ${name} `

  const [showMenu, setShowMenu] = useState(false)
  const { user } = React.useContext(AuthContext)
  const outlet = useOutlet()

  const [theme] = useState(defaultTheme)

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
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>

      <Toast
        type={toast.type}
        autoHideDuration={5000}
        open={toast.open}
        onClose={() => setToast({ open: false })}
      >
        {toast.message}
      </Toast>
    </ThemeProvider>
  )
}

export default CollectionRoute
