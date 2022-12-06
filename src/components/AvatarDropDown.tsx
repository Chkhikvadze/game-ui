import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Avatar from "@radix-ui/react-avatar"

import styled, { keyframes } from "styled-components"

import { logout as logOutCookies } from 'helpers/authHelper'
import { useNavigate } from "react-router-dom"
import { useLogoutService } from "services"

const AvatarDropDown = () => {
  const [logout] = useLogoutService()
  let navigate = useNavigate()
  
  
  const handleLogout = async () => {
    try {
	  const response = await logout()
	  if (response) {
        logOutCookies()
        localStorage.clear()
        window.location.href = '/'
	  }
    } catch (err) {
	  window.location.href = '/'
    }
  }
  
  return (
    <StyledDropDownMenuRoot>
	  <StyledDropDownMenuTrigger>
        <StyledAvatar>
		  <StyledImageAvatar
            alt="Colm Tuite"
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
		  />
        </StyledAvatar>
	  </StyledDropDownMenuTrigger>
	  <StyledDropdownContent>
        <StyledDropDownMenuItem onClick={() => navigate('/account')}>Account</StyledDropDownMenuItem>
        <StyledDropDownMenuItem>Settings</StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={() => navigate('/change-password')}>change password</StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={handleLogout}>Logout</StyledDropDownMenuItem>
        <DropdownMenu.Arrow className="text-white" fill="currentColor"/>
	  </StyledDropdownContent>
    </StyledDropDownMenuRoot>
  )
}

export default AvatarDropDown

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`
const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`
const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`
const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px)
  }
  to {
    opacity: 1;
    transform: translateY(0)
  }
`


const StyledDropdownContent = styled(DropdownMenu.Content)`
  min-width: 180px;
  background-color: white;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 102030;
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    -moz-animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state="open"] {
      &[data-side="top"] {
        animation-name: ${slideDownAndFade}
      }

    ,
    '&[data-side="right"]': {
      animation-name: ${slideLeftAndFade}
    },
    '&[data-side="bottom"]': {
      animation-name: ${slideUpAndFade}
    },
    '&[data-side="left"]': {
      animation-name: ${slideRightAndFade}
    },
    }

  ,
  },
`

const StyledDropDownMenuRoot = styled(DropdownMenu.Root)``

const StyledDropDownMenuItem = styled(DropdownMenu.Item)`
  all: unset;
  font-size: 13px;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;

  :hover {
    background-color: darkgray;
  }
`

const StyledAvatar = styled(Avatar.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 100%;
`

const StyledImageAvatar = styled(Avatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`

const StyledDropDownMenuTrigger = styled(DropdownMenu.Trigger)`
  all: unset;
`