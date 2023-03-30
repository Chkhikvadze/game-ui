import { useState } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'styles/theme'

import { StyledAppContainer, StyledMainLayout, StyledMainSection } from './ProviderStyle'

import Navbar from 'components/Navbar'
import { CONTRACT_ITEM_LIST } from 'helper/navigationHelper'

const ContractRoute = () => {
  const outlet = useOutlet()
  const [theme] = useState(defaultTheme)

  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  const onClickGoBack = () => {
    navigate(`/game`)
  }
  return (
    <ThemeProvider theme={theme}>
      <StyledAppContainer>
        <StyledMainLayout showMenu={showMenu}>
          <Navbar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            navbarItems={CONTRACT_ITEM_LIST}
            navbarTitle={'Test Contract'}
            // updateHeader={updateHeader}
            // logo={logo_image}
            // updateLogo={updateLogo}
            onClickGoBack={onClickGoBack}
            backText={'Contract'}
          />
          <StyledMainSection>{outlet}</StyledMainSection>
        </StyledMainLayout>
      </StyledAppContainer>
    </ThemeProvider>
  )
}

export default ContractRoute
