import { useContext, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AuthContext, LayoutContext } from 'contexts'
import { includes } from 'lodash'

import GameNavigation from 'pages/Navigation/GameNavigation'

import { Header } from 'components/Layout'
import AvatarDropDown from 'components/AvatarDropDown'
import Spotlight from 'components/Spotlight'
import ChatSwitcher from 'components/ChatSwitcher'

import {
  StyledAppContainer,
  StyledAvatarContainer,
  StyledFooter,
  StyledGroupContainer,
  StyledMainContainer,
} from '../components/Layout/LayoutStyle'

const GameRouteLayout = () => {
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
  const isPlayers = includes(active, 'players')
  const isTransactions = includes(active, 'transactions')
  const hideNavbar = includes(active, 'collection')

  const isExpandMode =
    (expand && isCollection) || (expand && isPlayers) || (expand && isTransactions)

  return (
    <StyledAppContainer>
      <Header expandMode={isExpandMode} />
      <StyledMainContainer expand={isExpandMode}>
        <StyledGroupContainer
          mt='20'
          id={hideNavbar ? '' : 'inner_navigation'}
          hideNavbar={hideNavbar}
        >
          <GameNavigation />
        </StyledGroupContainer>
        {outlet}
      </StyledMainContainer>
      <StyledFooter id='main_footer'>
        <StyledAvatarContainer>
          <AvatarDropDown />
          <span>{first_name}</span>
        </StyledAvatarContainer>
        <div>
          <Spotlight />
        </div>
        <div></div>
      </StyledFooter>
      <ChatSwitcher />
    </StyledAppContainer>
  )
}

export default GameRouteLayout
