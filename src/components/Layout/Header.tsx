import { Link } from 'react-router-dom'
import logo from 'assets/images/l3_logo.png'

import { StyledHeader, StyledLogoWrapper, StyledNavigationColumn } from './LayoutStyle'

import ArrowNavigation from 'pages/Navigation/ArrowNavigation'
import Breadcrumbs from 'components/BreadCrumbs/BreadCrumbs'

interface HeaderTypes {
  expandMode?: boolean
}

const Header = ({ expandMode = false }: HeaderTypes) => {
  return (
    <StyledHeader id='main_header'>
      <StyledNavigationColumn>
        <ArrowNavigation />
        <Breadcrumbs />
      </StyledNavigationColumn>
      {!expandMode && (
        <StyledLogoWrapper to='/'>
          <img src={logo} alt='Logo' />
        </StyledLogoWrapper>
      )}
      {!expandMode && <div></div>}
    </StyledHeader>
  )
}

export default Header
