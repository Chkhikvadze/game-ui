import { useContext, useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import { defaultTheme } from 'styles/theme'

// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'
import {
  useCollectionByIdService,
  useUpdateCollectionByIdService,
} from 'services/useCollectionService'
// import { useGameByIdService } from 'services/useGameService'
import Navbar from 'components/Navbar'
import { collectionItemList } from 'helpers/navigationHelper'

// todo this code needs to be refactored
const CollectionRoute = () => {
  const outlet = useOutlet()
  const params = useParams()
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)

  const [showMenu, setShowMenu] = useState(false)

  const collectionId = params.collectionId
  const gameId = params.gameId

  const { data: collection, refetch } = useCollectionByIdService({ id: collectionId })

  const { game_id, name, logo_image } = collection

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
    navigate(`/game/${game_id || gameId}/collections`)
  }

  if (!user) return <Navigate to='/login' />

  // const onCheckedChange = (isDefaultTheme: boolean) => {
  //   setTheme(isDefaultTheme ? lightTheme : defaultTheme)
  // }

  return (
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
          backText={'Collection'}
        />
        <StyledMainSection id='main_container'>{outlet}</StyledMainSection>
      </StyledMainLayout>
    </StyledAppContainer>
  )
}

export default CollectionRoute
