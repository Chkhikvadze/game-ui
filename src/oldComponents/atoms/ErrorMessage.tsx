import React from 'react'
import styled from 'styled-components'

import Typography from 'oldComponents/atoms/Typography'

type ErrorType = {
  message: any
}

const ErrorMessage = ({message}: ErrorType) => (
  <StyledErrorMessageContainer className="error_message" id='errorMessage' role={'alert'} aria-live={'assertive'}>
    <Typography color='#eb5757' mt={5} variant='caption'>
	  {message}
    </Typography>
  </StyledErrorMessageContainer>)


const StyledErrorMessageContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 8px;
  height: max-content; /* width: fit-content; */
  font-size: 10px;
`

export default ErrorMessage