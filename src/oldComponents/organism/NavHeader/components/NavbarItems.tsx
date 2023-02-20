import React, { useContext } from 'react'
import styled from 'styled-components'
import { AuthContext } from 'contexts'
import MyDashboard from '../MyDashboard'
// import Services from '../Services'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

const StyledNavbarItemsContainer = styled.div<{ mobile?: boolean }>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-column-gap: 24px;
  align-items: center;

  ${props =>
    props.mobile &&
    `
    display: grid;
    grid-auto-flow: row;
    grid-row-gap: 8px;
    justify-content: center;
    justify-items: center;
    background-color: #00283c;
    padding-bottom: 24px;
  `}
`

const NavbarItems: React.FunctionComponent<{ mobile?: boolean }> = ({
  mobile,
}: {
  mobile?: boolean
}): any => {
  const { isAuthenticated, loading } = useContext(AuthContext)

  if (loading) {
    return
  }

  if (!isAuthenticated) {
    return <LoginButton />
  }

  return (
    <StyledNavbarItemsContainer mobile={mobile}>
      <MyDashboard mobile={mobile} />
      {/* <SettingsButton /> */}
      {/* <Services  /> */}
      <LogoutButton />
    </StyledNavbarItemsContainer>
  )
}

export default React.memo(NavbarItems)
