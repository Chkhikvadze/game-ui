import React from 'react'
import styled from 'styled-components'

import authUtils from 'utils/authUtils'
import Button from 'oldComponents/atoms/Button'

const StyledButton = styled(Button)`
  background-color: transparent;
  border: 1px solid white;
`

const LoginButton = () => (
  <StyledButton color="primary" onClick={authUtils.redirectToLogin}>
	Login
  </StyledButton>
)

export default LoginButton
