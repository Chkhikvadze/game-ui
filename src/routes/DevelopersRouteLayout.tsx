import { Link, useLocation, useOutlet } from 'react-router-dom'
import { includes } from 'lodash'

import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledGroupContainer,
  StyledHeader,
  StyledMainContainer,
  StyledNavigationColumn,
} from '../components/Layout/LayoutStyle'

import logo from 'assets/images/l3_logo.png'
import { AuthContext, LayoutContext } from 'contexts'
import { useContext, useEffect, useState } from 'react'

import AvatarDropDown from 'components/AvatarDropDown'
import Spotlight from 'components/Spotlight'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'
import ChatSwitcher from 'components/ChatSwitcher'

import DevelopersNavigation from 'pages/Navigation/DevelopersNavigation'
import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import { Footer, Header } from 'components/Layout'

const DevelopersRouteLayout = () => {
  const { user } = useContext(AuthContext)
  const { expand } = useContext(LayoutContext)

  const { first_name } = user
  const outlet = useOutlet()

  const { pathname } = useLocation()

  const [active, setActive] = useState<string[]>([])

  useEffect(() => {
    const pathArr = pathname ? pathname.split('/') : []
    setActive(pathArr)
  }, [pathname])

  const isCollection = includes(active, 'collection')

  const hideNavbar = includes(active, 'collection')

  const isExpandMode = expand && isCollection

  return (
    <StyledAppContainer>
      {/* <StyledMainLayout> */}
      <Header expandMode={isExpandMode} />

      <StyledMainContainer expand={isExpandMode} id='main_container_test'>
        {!hideNavbar && (
          <StyledGroupContainer mt='24'>
            <div id='inner_navigation'>
              <DevelopersNavigation />
            </div>
          </StyledGroupContainer>
        )}
        {outlet}
      </StyledMainContainer>
      <Footer />
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default DevelopersRouteLayout
