import React, { useContext } from 'react'
import { AuthContext } from 'contexts'

import BurgerMenu from 'oldComponents/atoms/BurgerMenu'
import SharedAccounts from 'oldComponents/atoms/SharedAccounts'

import HeaderDropDownMenu from './HeaderDropDownMenu'

import logoImg from 'assets/old/images/better-fleet-logo.png'

import {
  StyledGroupContainer,
  StyledHeader,
  StyledLink,
  StyledLogo,
  StyledRightSide,
  StyledNotification,
} from './HeaderStyle'

const Header = ({showHideMenu}: any) => {
  const {isAuthenticated, user} = useContext(AuthContext)
  // const { i18n } = useTranslation()
  
  return (
    <>
	  <StyledHeader>
        <StyledGroupContainer>
		  <BurgerMenu onItemClick={showHideMenu}/>
		  <StyledLink
            to={isAuthenticated ? `${user.role === 'admin' ? '/admin/users': '/dashboard'}`: '/'}
		  >
            {/*<Logo />*/}
            <StyledLogo src={logoImg} alt={'logo'}/>
		  </StyledLink>
		  
		  {/* <StyledLangRoot>
		   <StyledLangButton isLang={i18n.language === 'en'} color="primary" onClick={() => i18n.changeLanguage('en')}>EN</StyledLangButton>
		   <StyledLangButton isLang={i18n.language === 'uk'} color="primary" onClick={() => i18n.changeLanguage('uk')}>UK</StyledLangButton>
		   </StyledLangRoot> */}
        </StyledGroupContainer>
		
        <StyledRightSide>
		  <SharedAccounts/>
		  <StyledNotification>{/* <Notification /> */}</StyledNotification>
		  <HeaderDropDownMenu/>
        </StyledRightSide>
	  </StyledHeader>
	
    </>
  )
}

export default Header
