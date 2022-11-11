import React from 'react'
import TextField from 'oldComponents/molecules/TextField'
// import useResetPassword from './useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Typography from 'oldComponents/atoms/Typography'
import Button from 'oldComponents/atoms/Button'
import ButtonLink from 'oldComponents/atoms/ButtonLink'
import useTwoFA from './useTwoFA'
import Alert from 'oldComponents/atoms/Alert'

const TwoFAuthentication = () => {
  const {formik, handleResendCode, alertMessage} = useTwoFA()
  return (
	<StyledContainer>
	  {alertMessage.message && alertMessage.type &&
          <Alert color={alertMessage.type || 'danger'}>{alertMessage.message}</Alert>
	  }
	  <Typography variant="h4" color="#4c4c4c">
		Authentication code:
	  </Typography>
	  <br/>
	  <Typography variant='caption' color="#4c4c4c" style={{size:'12px'}}>
		An authentication code has been sent to your email. Please enter it below:
	  </Typography>
	  <br/>
	  <StyledFormContainer>
		<FormikProvider value={formik}>
		  <TextField
			name="code"
			placeholder="Authentication code"
		  />
		</FormikProvider>
		<ButtonContainer>
		  <Button color="primary" onClick={formik.handleSubmit}>Submit</Button>
		</ButtonContainer>
		
		<ButtonContainer>
		  <Typography variant='caption' color="#4c4c4c" style={{size:'12px'}}>
			Didn’t receive the code or code expired?
		  </Typography>
		  <ButtonLink onClick={handleResendCode} style={{marginLeft:'10px'}}>
			Resend code?
		  </ButtonLink>
		</ButtonContainer>
	  </StyledFormContainer>
	</StyledContainer>
  )
}

export default TwoFAuthentication

const StyledContainer = styled.div`
  padding-top: 40px;
`
const StyledFormContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-row-gap: 20px;
`
const ButtonContainer = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
`