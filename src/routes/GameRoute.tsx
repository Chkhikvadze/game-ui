import { useContext, useState } from 'react'
import { Navigate, useNavigate, useOutlet, useParams } from 'react-router-dom'

import { AuthContext, ToastContext } from 'contexts'
import styled, { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'
// import Navbar from "components/Navbar";

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

import { useGameByIdService, useUpdateGameByIdService } from 'services/useGameService'
import Navbar from 'components/Navbar'
import { gameItemList } from 'helpers/navigationHelper'

const GameRoute = () => {
  const [showMenu, setShowMenu] = useState(false)
  const { user } = useContext(AuthContext)
  const { setToast } = useContext(ToastContext)
  const outlet = useOutlet()
  const params = useParams()
  const gameId = params.gameId
  const { data: gameById, refetch } = useGameByIdService({ id: gameId })
  const { name, logo_image } = gameById

  const [theme] = useState(defaultTheme)

  const [updateGameById] = useUpdateGameByIdService()

  const updateHeader = async (name: string) => {
    const updatedValues = {
      name: name,
    }
    await updateGameById(gameId, { ...updatedValues })

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
    await updateGameById(gameId, {
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
        <StyledMainLayout showMenu={showMenu}>
          <Navbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarTitle={name}
            updateHeader={updateHeader}
            logo={logo_image}
            updateLogo={updateLogo}
            navbarItems={gameItemList}
            onClickGoBack={onClickGoBack}
            backText={'Game'}
          />
          <StyledMainSection id='main_container'>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default GameRoute
