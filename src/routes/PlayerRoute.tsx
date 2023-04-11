import React, { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'

// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

// import { useProjectByIdService } from 'services/useProjectService'
import Navbar from 'components/Navbar'
import { PLAYER_ITEM_LIST } from 'helper/navigationHelper'
import { usePlayerByIdService, useUpdatePlayerByIdService } from 'services/usePlayerService'

// todo this code needs to be refactored
const PlayerRoute = () => {
  const outlet = useOutlet()
  const params = useParams()
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)

  const [showMenu, setShowMenu] = useState(false)
  const [theme] = useState(defaultTheme)

  const playerId = params.playerId
  //   const projectId = params.projectId

  const { data: player, refetch } = usePlayerByIdService({ id: playerId })

  const { project_id, name, avatar, unique_id } = player

  const navigate = useNavigate()

  const [updatePlayerById] = useUpdatePlayerByIdService()

  const updateHeader = async (name: string) => {
    const updatedValues = {
      name: name,
    }
    await updatePlayerById(playerId, { ...updatedValues })

    setToast({
      message: `Player name updated!`,
      type: 'positive',
      open: true,
    })
  }

  // const updateLogo = async (logo: string) => {
  //   const updatedValues = {
  //     avatar: logo,
  //   }
  //   await updatePlayerById(playerId, { ...updatedValues })

  //   setToast({
  //     message: `Player Avatar updated!`,
  //     type: 'positive',
  //     open: true,
  //   })
  //   refetch()
  // }

  const onClickGoBack = () => {
    navigate(`/game/${project_id}/players`)
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
            navbarItems={PLAYER_ITEM_LIST}
            navbarTitle={name || unique_id}
            updateHeader={updateHeader}
            logo={avatar}
            // updateLogo={updateLogo}
            onClickGoBack={onClickGoBack}
            backText={'Player'}
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default PlayerRoute
