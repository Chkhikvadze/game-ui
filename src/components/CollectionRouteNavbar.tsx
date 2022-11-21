import React, { useEffect, useState } from "react"
import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar"
import styled from "styled-components"
import "react-pro-sidebar/dist/css/styles.css"
import { useNavbarData } from "helper/navigationHelper"
import NavigationButton from "atoms/NavigationButton"
import { Link, useLocation } from "react-router-dom"


import LeftArrowIconSvg from "assets/svgComponents/LeftArrowIconSvg"

type NavbarProps = {
  showMenu: boolean
}

const ProjectRouteNavbar = ({showMenu}: NavbarProps) => {
  // const location = useLocation()
  // const {navbarData} = useNavbarData()
  //
  // const [activeRoute, setActiveRoute] = useState("main-menu")
  //
  //
  // useEffect(() => {
  // const locationRoute =
  //   location.pathname === "/" ? "main-menu": location.pathname
  // const clearRoute = locationRoute.replace("/", "")
  // const defaultObj = clearRoute in navbarData
  // setActiveRoute((preValue) => (defaultObj ? clearRoute: preValue))
  // }, [location])//eslint-disable-line
  
  return (
	<StyledNavBar>
	  <StyledProSidebar collapsed={showMenu}>
		{ !showMenu && (
		  <StyledSidebarHeader>
			<Link to={"./"}>
			  <LeftArrowIconSvg/>
			</Link>
			<StyledHeaderSpan>
			  Collection
			</StyledHeaderSpan>
		  </StyledSidebarHeader>
		)}
		<StyledMenu>
		  <MenuItem>
			<NavigationButton value={'General'} to={'general'}/>
		  </MenuItem>
		  <MenuItem>
			<NavigationButton value={'Nft'} to={'nfts'}/>
		  </MenuItem>
		  <MenuItem>
			<NavigationButton value={'Properties'} to={'properties'}/>
		  </MenuItem>
		  {/*{navbarData &&*/}
		  {/*navbarData[ activeRoute ]?.menuItemList?.map((item: any) => (*/}
		  {/*  <MenuItem key={item.name} icon={item.icon}>*/}
		  {/*	<NavigationButton*/}
		  {/*	  // icon={item.icon}*/}
		  {/*	  value={item.name}*/}
		  {/*	  to={item.routeLink}*/}
		  {/*	/>*/}
		  {/*  </MenuItem>*/}
		  {/*))}*/}
		  {/*{navbarData &&*/}
		  {/*navbarData[ activeRoute ]?.components?.map(*/}
		  {/*  (item: any, index: any) => (*/}
		  {/*	<MenuItem key={index}>{item.header}</MenuItem>*/}
		  {/*  )*/}
		  {/*)}*/}
		</StyledMenu>
	  </StyledProSidebar>
	</StyledNavBar>
  )
}

export default ProjectRouteNavbar

const StyledNavBar = styled.div``

const StyledProSidebar = styled(ProSidebar)`
  .pro-sidebar-inner {
    background-color: unset;
  }

  .pro-sidebar-header {
    border-bottom: none;
  }
`

const StyledSidebarHeader = styled(SidebarHeader)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 13px;
  align-items: center;
`

const StyledHeaderSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.006em;
  color: rgba(255, 255, 255, 0.9);
  text-transform: capitalize;
`

const StyledMenu = styled(Menu)`
  max-height: 70vh;
  overflow: scroll;
`