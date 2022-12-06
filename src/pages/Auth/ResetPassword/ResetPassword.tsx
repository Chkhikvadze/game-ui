import React from 'react'
import TextField from 'oldComponents/molecules/TextField'
import useResetPassword from 'pages/Auth/ResetPassword/useResetPassword'
import { FormikProvider } from 'formik'
import styled from 'styled-components'
import Typography from 'oldComponents/atoms/Typography'
import Button from 'oldComponents/atoms/Button'
import Alert from 'oldComponents/atoms/Alert'

const ResetPassword = () => {
  const {formik, alertMessage} = useResetPassword()
  
  return (
    <StyledContainer>
	  {alertMessage.message && alertMessage.type &&
          <Alert color={alertMessage.type || 'danger'}>{alertMessage.message}</Alert>
	  }
	  <Typography variant="h4" color="#4c4c4c">
		Reset password
	  </Typography>
	  <br/>
	  <StyledFormContainer>
        <FormikProvider value={formik}>
		  <TextField
            name="password"
            placeholder="New password*"
            password
		  />
		  
		  <TextField
            name="confirm_password"
            placeholder="Confirm password*"
            password
		  />
		
        </FormikProvider>
        <ButtonContainer>
		  <Button color="primary" onClick={formik.handleSubmit}>Submit</Button>
        </ButtonContainer>
	  </StyledFormContainer>
    </StyledContainer>
  )
}

export default ResetPassword

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