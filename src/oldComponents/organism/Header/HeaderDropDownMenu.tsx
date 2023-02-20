import React, { useContext } from 'react'
import { AuthContext } from 'contexts'

import DropdownMenu from 'oldComponents/molecules/DropdownMenu'
import DropdownItem from 'oldComponents/molecules/DropdownItem'
import Typography from 'oldComponents/atoms/Typography'
import { IconArrowDown } from 'assets/old/images/navbar/index'
import { useModal } from 'hooks'
import { useLogoutService } from 'services'
import { logout as logOutCookies } from 'helpers/authHelper'

import { StyledGroupContainer, StyledIcon } from './HeaderStyle'

const HeaderDropDownMenu = () => {
  const { user } = useContext(AuthContext)
  const { openModal } = useModal()
  const [logout] = useLogoutService()

  const handleLogout = async () => {
    const response = await logout()
    try {
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
    <DropdownMenu
      labelClassName='header__drop__down'
      trigger={
        <StyledGroupContainer gap={'8px'}>
          <Typography variant='h5' color='#F8F9FA' weight={400}>
            {user?.first_name} {user?.last_name}
          </Typography>
          <StyledIcon src={IconArrowDown} width={8} alt='see available routes' />
        </StyledGroupContainer>
      }
    >
      {toggle => (
        <>
          <DropdownItem
            label='User settings'
            onClick={() => {
              openModal({
                name: 'global-settings-modal',
                data: {
                  openSettings: true,
                },
              })
              toggle(false)
            }}
          />
          <DropdownItem label='Sign out' onClick={() => handleLogout()} />
        </>
      )}
    </DropdownMenu>
  )
}

export default HeaderDropDownMenu
