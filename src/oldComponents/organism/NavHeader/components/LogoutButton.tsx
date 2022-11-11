import React from 'react'
import Button from 'oldComponents/atoms/Button'
import { useLogoutService } from 'services'

const LogoutButton = () => {
  const [logout] = useLogoutService()
  
  const handleLogout = async () => {
	try {
	  const response = await logout()
	  if (response) {
		localStorage.clear()
		window.location.href = '/'
	  }
	} catch (err) {
	  window.location.href = '/'
	}
  }
  
  return <Button color="secondary" onClick={handleLogout}>Logout</Button>
}

export default LogoutButton
