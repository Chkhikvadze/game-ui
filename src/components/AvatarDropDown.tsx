import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import Avatar from '@l3-lib/ui-core/dist/Avatar'

import styled, { keyframes } from 'styled-components'

import { logout as logOutCookies } from 'helpers/authHelper'
import { useNavigate } from 'react-router-dom'
import { useLogoutService } from 'services'
import { useTranslation } from 'react-i18next'

import defaultAvatar from '../assets/images/defaultAvatar.png'
import useChangePassword from 'pages/ChangePassword/useChangePassword'

const AvatarDropDown = () => {
  const { t } = useTranslation()

  const [logout] = useLogoutService()
  const navigate = useNavigate()
  const { openCreateChangePasswordModal } = useChangePassword()

  const handleLogout = async () => {
    try {
      await logout()
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    } catch (err) {
      logOutCookies()
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <StyledDropDownMenuRoot>
      <StyledDropDownMenuTrigger>
        <Avatar size={Avatar.sizes.MEDIUM} src={defaultAvatar} type={Avatar.types.IMG} rectangle />
      </StyledDropDownMenuTrigger>
      <StyledDropdownContent>
        <StyledDropDownMenuItem onClick={() => navigate('/account')}>
          {t('profile')}
        </StyledDropDownMenuItem>

        <StyledDropDownMenuItem onClick={openCreateChangePasswordModal}>
          {t('changePassword')}
        </StyledDropDownMenuItem>
        <StyledDropDownMenuItem onClick={handleLogout}>{t('logout')}</StyledDropDownMenuItem>
        <DropdownMenu.Arrow className='text-white' fill='currentColor' />
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
      },
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

// const StyledAvatar = styled(AvatarRadix.Root)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   vertical-align: middle;
//   overflow: hidden;
//   width: 40px;
//   height: 40px;
//   border-radius: 100%;
// `

// const StyledImageAvatar = styled(AvatarRadix.Image)`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: inherit;
// `

const StyledDropDownMenuTrigger = styled(DropdownMenu.Trigger)`
  all: unset;
`
