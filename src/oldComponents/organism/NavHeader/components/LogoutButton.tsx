import Button from 'oldComponents/atoms/Button'
import React from 'react'
import { cleanCookie } from 'helpers/authHelper'
import { useLogoutService } from 'services'

const LogoutButton = () => {
  const [logout] = useLogoutService()

  const handleLogout = async () => {
    try {
      const response = await logout()
      if (response) {
        localStorage.clear()
        cleanCookie()
        window.location.href = '/'
      }
    } catch (err) {
      window.location.href = '/'
    }
  }

  return (
    <Button color='secondary' onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
