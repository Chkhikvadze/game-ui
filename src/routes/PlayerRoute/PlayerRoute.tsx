import { useContext, useState } from 'react'
import { Navigate, useNavigate, useOutlet } from 'react-router-dom'

import { AuthContext } from 'contexts'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'

// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from '../ProviderStyle'

// import { useProjectByIdService } from 'services/useGameService'
import Navbar from 'components/Navbar'
import { PLAYER_ITEM_LIST } from 'helper/navigationHelper'
import usePlayerRoute from './usePlayerRoute'

const PlayerRoute = () => {
  const outlet = useOutlet()
  const { user } = useContext(AuthContext)

  const [showMenu, setShowMenu] = useState(false)
  const [theme] = useState(defaultTheme)

  const { updateHeader, player } = usePlayerRoute()

  const { game_id, name, avatar, unique_id } = player

  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate(`/game/${game_id}/players`)
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
